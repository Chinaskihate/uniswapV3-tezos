import {UserAddressAction} from "../actions/UserAddressAction";
import {UserAddressActionTypes} from "../action-types";

const initialState: string | null = null;

export const userAddressReducer = (state: string | null = initialState, action: UserAddressAction) => {
    switch (action.type) {
        case UserAddressActionTypes.SET:
            return action.payload;
        case UserAddressActionTypes.CLEAR:
            return null;
        default:
            return state;
    }
}