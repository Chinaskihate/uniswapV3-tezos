import {TezosActionTypes} from "../action-types";
import {TezosToolkit} from "@taquito/taquito";
import {BeaconWallet} from "@taquito/beacon-wallet";
import {TezosAction} from "../actions/TezosAction";

interface TezosParams {
    TezosToolkit: TezosToolkit,
    wallet: BeaconWallet | null,
    publicToken: string | null,
    beaconConnection: boolean
}

const initialState: TezosParams = {
    TezosToolkit: new TezosToolkit("https://ghostnet.ecadinfra.com"),
    wallet: null,
    publicToken: null,
    beaconConnection: false
};

export const tezosReducer = (state: TezosParams = initialState, action: TezosAction) => {
    switch (action.type) {
        case TezosActionTypes.SET_WALLET:
            return {
                ...state,
                wallet: action.payload
            } as TezosParams;
        case TezosActionTypes.SET_PUBLIC_TOKEN:
            return {
                ...state,
                publicToken: action.payload
            } as TezosParams;
        case TezosActionTypes.CLEAR_PUBLIC_TOKEN:
            return {
                ...state,
                publicToken: null
            } as TezosParams;
        case TezosActionTypes.SET_BEACON_CONNECTION:
            return {
                ...state,
                publicToken: null
            } as TezosParams;
        default:
            return state;
    }
}