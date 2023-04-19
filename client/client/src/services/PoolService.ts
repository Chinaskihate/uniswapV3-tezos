import { TezosToolkit } from "@taquito/taquito"



export class PoolService {
    private toolkit: TezosToolkit
    private contract
    constructor() {
        this.toolkit = new TezosToolkit(process.env.REACT_APP_RPC_ADDRESS!)
        this.contract = this.toolkit.contract.at(process.env.REACT_APP_CONTRACT_ADDRESS!)
    }

    async deposit(first_token_address: string, second_token_address: string, 
        first_token_count: number, second_token_count: number, min_price: number, max_price: number): Promise<void> {
        console.log("[POOL SERVICES] : Depositing "+ first_token_count + " " + 
        first_token_address + " and " + 
        second_token_address + " " + second_token_count)
        try {
            const res = (await this.contract).methods.addLiquidity({first_token: {first_token_address, first_token_count}, 
                second_token:{second_token_address, second_token_count}, price_ratio: {min_price, max_price}})
            console.log(res)
        } catch (e) {
            console.error(e)
            console.log("[POOL SERVICE] : Depositing error. Aborting...")
        }
    }

    async collectFees(first_token_address: string, second_token_address: string, 
        position_id: number): Promise<void> {
        console.log("[POOL SERVICES] : Collecting fees from "+ first_token_address + " and " + 
        second_token_address)
        try {
            const res = (await this.contract).methods.collectFees({pool_tokens: {first_token_address, second_token_address}, 
                position_id})
            console.log(res)
        } catch (e) {
            console.error(e)
            console.log("[POOL SERVICE] : Collecting fees error. Aborting...")
        }
    }

    async withdrawDeposit(first_token_address: string, second_token_address: string, 
        position_id: number): Promise<void> {
        console.log("[POOL SERVICES] : Withdraw fees from "+ first_token_address + " and " + 
        second_token_address)
        try {
            const res = (await this.contract).methods.removeLiquidity({pool_tokens: {first_token_address, second_token_address}, 
                position_id})
            console.log(res)
        } catch (e) {
            console.error(e)
            console.log("[POOL SERVICE] : Collecting fees error. Aborting...")
        }
    }
}