import React, {useEffect} from 'react';
import {Button} from "react-bootstrap";
import './buttons.css';
import {useDispatch, useSelector} from "react-redux";
import {actionCreators, RootState} from "../../store";
import {bindActionCreators} from "redux";
import {BeaconEvent, defaultEventCallbacks, NetworkType} from "@airgap/beacon-dapp";
import {BeaconWallet} from "@taquito/beacon-wallet";

const ConnectButton = () => {
    const toolkit = useSelector((state: RootState) => state.tezos).TezosToolkit;
    const wallet = useSelector((state: RootState) => state.tezos).wallet;
    const dispatch = useDispatch();
    const {setUserAddress, setWallet, setPublicToken, setBeaconConnection} = bindActionCreators(actionCreators, dispatch);

    const setUserAddressWrapper = (userAddress: string): void => {
        setUserAddress(userAddress);
    }

    const setPublicTokenWrapper = (publicKey: string) => {
        setPublicToken(publicKey);
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
                        handler: data => setPublicTokenWrapper(data.publicKey)
                    }
                }
            });
            toolkit.setWalletProvider(newWallet);
            setWallet(newWallet);
            const activeAccount = await newWallet?.client.getActiveAccount();
            if (activeAccount) {
                const userAddress = await newWallet?.getPKH();
                await setup(userAddress!);
                setBeaconConnection(true);
            }
        })();
    }, []);

    return (
        <div>
            <Button className="col-12 rounded-default" onClick={connectWallet}>Connect</Button>
        </div>
    );
};

export default ConnectButton;