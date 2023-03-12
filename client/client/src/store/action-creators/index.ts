import {Dispatch} from "redux";
import {UserAddressAction} from "../actions/UserAddressAction";
import {UserAddressActionTypes} from "../action-types";

export const setUserAddress = (address: string) => {
    return (dispatch: Dispatch<UserAddressAction>) => {
        dispatch({
            type: UserAddressActionTypes.SET,
            payload: address
        })
    }
};

export const clearUserAddress = () => {
    return (dispatch: Dispatch<UserAddressAction>) => {
        dispatch({
            type: UserAddressActionTypes.CLEAR
        })
    }
};