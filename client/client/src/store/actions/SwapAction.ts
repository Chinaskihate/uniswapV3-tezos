import {BeaconWallet} from "@taquito/beacon-wallet";
import {SwapTokenTypes} from "../action-types";

interface SetFirstAddress {
    type: SwapTokenTypes.SET_FIRST_ADDRESS,
    payload?: string
}

interface SetSecondAddress {
    type: SwapTokenTypes.SET_SECOND_ADDRESS,
    payload?: string
}


export type SwapAction = SetFirstAddress | SetSecondAddress;