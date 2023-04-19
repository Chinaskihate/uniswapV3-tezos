import {BeaconWallet} from "@taquito/beacon-wallet";
import {TezosActionTypes} from "../action-types";

interface SetWalletAction {
    type: TezosActionTypes.SET_WALLET,
    payload?: BeaconWallet
}

interface SetPublicTokenAction {
    type: TezosActionTypes.SET_PUBLIC_TOKEN,
    payload?: string
}

interface ClearPublicTokenAction {
    type: TezosActionTypes.CLEAR_PUBLIC_TOKEN
}

interface SetBeaconConnection {
    type: TezosActionTypes.SET_BEACON_CONNECTION,
    payload?: boolean
}

export type TezosAction = SetWalletAction | SetPublicTokenAction | ClearPublicTokenAction | SetBeaconConnection;