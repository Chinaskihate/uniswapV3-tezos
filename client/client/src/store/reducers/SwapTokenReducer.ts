import {SwapTokenTypes, TezosActionTypes} from "../action-types";
import {TezosToolkit} from "@taquito/taquito";
import {BeaconWallet} from "@taquito/beacon-wallet";
import {SwapAction} from "../actions/SwapAction";

interface SwapParams {
    first_address: string,
    second_address: string
}

const initialState: SwapParams = {
    first_address: "",
    second_address: ""
};

export const swapTokenReducer = (state: SwapParams = initialState, action: SwapAction) => {
    switch (action.type) {
        case SwapTokenTypes.SET_FIRST_ADDRESS:
            return {
                ...state,
                first_address: action.payload
            } as SwapParams;
        case SwapTokenTypes.SET_SECOND_ADDRESS:
            return {
                ...state,
                second_address: action.payload
            } as SwapParams;
        default:
            return state;
    }
}