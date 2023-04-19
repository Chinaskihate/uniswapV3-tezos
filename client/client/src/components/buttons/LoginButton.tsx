import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {actionCreators, RootState} from "../../store";
import {bindActionCreators} from "redux";
import {BeaconWallet} from '@taquito/beacon-wallet';
import {BeaconEvent, defaultEventCallbacks, NetworkType} from "@airgap/beacon-dapp";

const LoginButton = () => {
    const toolkit = useSelector((state: RootState) => state.tezos).TezosToolkit;
    const wallet = useSelector((state: RootState) => state.tezos).wallet;
    const storeUserAddress = useSelector((state: RootState) => state.userAddress);
    const dispatch = useDispatch();
    const {
        setUserAddress,
        clearUserAddress,
        setWallet,
        setPublicToken,
        clearPublicToken,
        setBeaconConnection
    } = bindActionCreators(actionCreators, dispatch);

    const setUserAddressWrapper = (userAddress: string): void => {
        setUserAddress(userAddress);
    }

    const clearUserAddressWrapper = (): void => {
        clearUserAddress();
    }

    const disconnectWallet = async (): Promise<void> => {
        if (wallet) {
            await wallet.clearActiveAccount();
        }
        clearUserAddressWrapper();
        setBeaconConnection(false);
        clearPublicToken();
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

    const setPublicTokenWrapper = (publicKey: string) => {
        setPublicToken(publicKey);
    }

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
                        handler: data => setPublicTokenWrapper(data.publicKey)
                    }
                }
            });
            toolkit.setWalletProvider(newWallet);
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
                <button className="button" onClick={disconnectWallet}>Disconnect</button>
            </div>
        );
    } else {
        return (
            <div className="buttons">
                <button className="button" onClick={connectWallet}>Connect</button>
            </div>
        );
    }
};

export default LoginButton;