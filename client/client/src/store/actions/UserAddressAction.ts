import {UserAddressActionTypes} from "../action-types";

interface SetUserAddressAction {
    type: UserAddressActionTypes.SET,
    payload?: string
}

interface ClearUserAddressAction {
    type: UserAddressActionTypes.CLEAR
}

export type UserAddressAction = SetUserAddressAction | ClearUserAddressAction;