import {combineReducers} from "redux";
import {userAddressReducer} from "./UserAddressReducer";
import {tezosReducer} from "./TezosReducer";

export const rootReducer = combineReducers({
    userAddress: userAddressReducer,
    tezos: tezosReducer
})

export type RootState = ReturnType<typeof rootReducer>;