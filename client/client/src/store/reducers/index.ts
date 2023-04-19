import {combineReducers} from "redux";
import {userAddressReducer} from "./UserAddressReducer";
import {tezosReducer} from "./TezosReducer";
import { swapTokenReducer } from "./SwapTokenReducer";

export const rootReducer = combineReducers({
    userAddress: userAddressReducer,
    tezos: tezosReducer,
    swapToken: swapTokenReducer
})

export type RootState = ReturnType<typeof rootReducer>;