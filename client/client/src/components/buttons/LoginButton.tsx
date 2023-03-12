import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {actionCreators, RootState} from "../../store";
import {bindActionCreators} from "redux";
import {BeaconWallet} from '@taquito/beacon-wallet';
import {BeaconEvent, defaultEventCallbacks, NetworkType} from "@airgap/beacon-dapp";
import {TezosToolkit} from "@taquito/taquito";

const LoginButton = () => {
    const [Tezos, setTezos] = useState<TezosToolkit>(
        new TezosToolkit("https://ghostnet.ecadinfra.com")
    );
    const [publicToken, setPublicToken] = useState<string | null>(null);

    const dispatch = useDispatch();
    const storeUserAddress = useSelector((state: RootState) => state.userAddress);
    const {setUserAddress, clearUserAddress} = bindActionCreators(actionCreators, dispatch);
    const [wallet, setWallet] = useState<BeaconWallet | null>(null);
    const [beaconConnection, setBeaconConnection] = useState<boolean>(false);

    const setUserAddressWrapper = (userAddress: string): void => {
        alert(userAddress);
        setUserAddress(userAddress);
    }

    const clearUserAddressWrapper = (): void => {
        alert(storeUserAddress)
        clearUserAddress();
    }

    const disconnectWallet = async (): Promise<void> => {
        if (wallet) {
            await wallet.clearActiveAccount();
        }
        clearUserAddressWrapper();
        setBeaconConnection(false);
        setPublicToken(null);
    }

    const connectWallet = async (): Promise<void> => {
        try {
            await wallet?.requestPermissions({
                network: {
                    type: NetworkType.GHOSTNET,
                    rpcUrl: "https://ghostnet.ecadinfra.com"
                }
            });
            const userAddress = await wallet?.getPKH();
            console.log(userAddress);
            await setup(userAddress!);
            setBeaconConnection(true);
        } catch (e) {
            console.log(e);
        }
    };

    const setup = async (userAddress: string): Promise<void> => {
        setUserAddressWrapper(userAddress);
    };

    useEffect(() => {
        (async () => {
            const newWallet = new BeaconWallet({
                name: "User wallet",
                preferredNetwork: NetworkType.GHOSTNET,
                disableDefaultEvents: true,
                eventHandlers: {
                    [BeaconEvent.PAIR_INIT]: {
                        handler: defaultEventCallbacks.PAIR_INIT
                    },
                    [BeaconEvent.PAIR_SUCCESS]: {
                        handler: data => setPublicToken(data.publicKey)
                    }
                }
            });
            console.log(newWallet);
            Tezos.setWalletProvider(newWallet);
            setWallet(newWallet);
            const activeAccount = await newWallet?.client.getActiveAccount();
            if (activeAccount) {
                const userAddress = await newWallet?.getPKH();
                console.log(userAddress);
                await setup(userAddress!);
                setBeaconConnection(true);
            }
        })();
    }, []);


    if (storeUserAddress) {
        return (
            <div className="buttons">
                <button className="button" onClick={disconnectWallet}>Logout</button>
            </div>
        );
    } else {
        return (
            <div className="buttons">
                <button className="button" onClick={connectWallet}>Login</button>
            </div>
        );
    }
};

export default LoginButton;