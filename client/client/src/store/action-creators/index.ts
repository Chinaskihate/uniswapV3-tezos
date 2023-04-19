import {Dispatch} from "redux";
import {UserAddressAction} from "../actions/UserAddressAction";
import {SwapTokenTypes, TezosActionTypes, UserAddressActionTypes} from "../action-types";
import {BeaconWallet} from "@taquito/beacon-wallet";
import {TezosAction} from "../actions/TezosAction";
import { SwapAction } from "../actions/SwapAction";

export const setUserAddress = (address: string) : (dispatch: Dispatch<UserAddressAction>) => void => {
    return (dispatch: Dispatch<UserAddressAction>) => {
        dispatch({
            type: UserAddressActionTypes.SET,
            payload: address
        })
    }
};

export const setFirstAddress = (address: string) => {
    return (dispatch: Dispatch<SwapAction>) => {
        dispatch({
            type: SwapTokenTypes.SET_FIRST_ADDRESS,
            payload: address
        })
    }
}

export const setSecondAddress = (address: string) => {
    return (dispatch: Dispatch<SwapAction>) => {
        dispatch({
            type: SwapTokenTypes.SET_SECOND_ADDRESS,
            payload: address
        })
    }
}

export const clearUserAddress = () => {
    return (dispatch: Dispatch<UserAddressAction>) => {
        dispatch({
            type: UserAddressActionTypes.CLEAR
        })
    }
};

export const setWallet = (wallet: BeaconWallet) => {
    return (dispatch: Dispatch<TezosAction>) => {
        dispatch({
            type: TezosActionTypes.SET_WALLET,
            payload: wallet
        });
    }
};

export const setPublicToken = (publicKey: string) => {
    return (dispatch: Dispatch<TezosAction>) => {
        dispatch({
            type: TezosActionTypes.SET_PUBLIC_TOKEN,
            payload: publicKey
        });
    }
};

export const clearPublicToken = () => {
    return (dispatch: Dispatch<TezosAction>) => {
        dispatch({
            type: TezosActionTypes.CLEAR_PUBLIC_TOKEN,
        });
    }
};

export const setBeaconConnection = (beaconConnection: boolean) => {
    return (dispatch: Dispatch<TezosAction>) => {
        dispatch({
            type: TezosActionTypes.SET_BEACON_CONNECTION,
            payload: beaconConnection
        });
    }
};