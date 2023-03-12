import {combineReducers} from "redux";
import {userAddressReducer} from "./UserAddressReducer";

export const rootReducer = combineReducers({
    userAddress: userAddressReducer
})

export type RootState = ReturnType<typeof rootReducer>;