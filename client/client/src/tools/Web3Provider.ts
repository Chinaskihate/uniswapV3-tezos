
import {BeaconWallet} from "@taquito/beacon-wallet";
import {BeaconEvent, defaultEventCallbacks, NetworkType} from "@airgap/beacon-dapp";
import {Dispatch} from "redux";
import {UserAddressAction} from "../store/actions/UserAddressAction";
import {TezosAction} from "../store/actions/TezosAction";
import {TezosToolkit} from "@taquito/taquito";

export class Web3Provider {
    private setUserAddress: (address: string) => (dispatch: Dispatch<UserAddressAction>) => void;
    private clearUserAddress: () => (dispatch: Dispatch<UserAddressAction>) => void;
    private setWallet: (wallet: BeaconWallet) => (dispatch: Dispatch<TezosAction>) => void;
    private setPublicToken: (token: string) => (dispatch: Dispatch<TezosAction>) => void;
    private clearPublicToken: () => (dispatch: Dispatch<TezosAction>) => void;
    private setBeaconConnection: (connection: boolean) => (dispatch: Dispatch<TezosAction>) => void;
    private wallet: BeaconWallet | null;
    private toolkit: TezosToolkit;
    private userAddress: string | null;

    constructor(
        setUserAddress: (address: string) => (dispatch: Dispatch<UserAddressAction>) => void,
        clearUserAddress: () => (dispatch: Dispatch<UserAddressAction>) => void,
        setWallet: (wallet: BeaconWallet) => (dispatch: Dispatch<TezosAction>) => void,
        setPublicToken: (address: string) => (dispatch: Dispatch<TezosAction>) => void,
        clearPublicToken: () => (dispatch: Dispatch<TezosAction>) => void,
        setBeaconConnection: (connection: boolean) => (dispatch: Dispatch<TezosAction>) => void,
        toolkit: TezosToolkit,
        wallet: BeaconWallet | null,
        userAddress: string | null
    ) {
        this.setUserAddress = setUserAddress;
        this.clearUserAddress = clearUserAddress;
        this.setWallet = setWallet;
        this.setPublicToken = setPublicToken;
        this.clearPublicToken = clearPublicToken;
        this.setBeaconConnection = setBeaconConnection;
        this.toolkit = toolkit;
        this.wallet = wallet;
        this.userAddress = userAddress;
    }

    public async onLoad() {
        if (!this.wallet) {
            this.wallet = new BeaconWallet({
                name: "User wallet",
                preferredNetwork: NetworkType.GHOSTNET,
                disableDefaultEvents: true,
                eventHandlers: {
                    [BeaconEvent.PAIR_INIT]: {
                        handler: defaultEventCallbacks.PAIR_INIT
                    },
                    [BeaconEvent.PAIR_SUCCESS]: {
                        handler: data => this.setPublicTokenWrapper(data.publicKey)
                    }
                }
            });
        }
        this.toolkit.setWalletProvider(this.wallet);
        this.setWallet(this.wallet);
        const activeAccount = await this.wallet?.client.getActiveAccount();
        if (activeAccount) {
            const userAddress = await this.wallet?.getPKH();
            await this.setUserAddress(userAddress!);
            this.setBeaconConnection(true);
        }
    }

    public async connectWallet() {
        try {
            await this.wallet?.requestPermissions({
                network: {
                    type: NetworkType.GHOSTNET,
                    rpcUrl: "https://ghostnet.ecadinfra.com"
                }
            });
            const userAddress = await this.wallet?.getPKH();
            console.log('CONNECTED WALLET:')
            console.log(userAddress);
            this.setPublicTokenWrapper(userAddress!);
            this.setBeaconConnection(true);
        } catch (e) {
            console.log(e);
        }
    }

    public async disconnectWallet(): Promise<void> {
        if (this.wallet) {
            await this.wallet.clearActiveAccount();
        }
        this.clearUserAddress();
        this.setBeaconConnection(false);
        this.clearPublicToken();
    }

    private setPublicTokenWrapper(publicKey: string) {
        this.setPublicToken(publicKey);
    }
}