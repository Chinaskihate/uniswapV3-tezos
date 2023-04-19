import { TezosToolkit } from "@taquito/taquito"



export class SwapService {
    private toolkit: TezosToolkit
    private contract
    constructor() {
        this.toolkit = new TezosToolkit(process.env.REACT_APP_RPC_ADDRESS!)
        this.contract = this.toolkit.contract.at(process.env.REACT_APP_CONTRACT_ADDRESS!)
    }

    async swap(first_token_address: string, second_token_address: string, 
        first_token_count: number, second_token_count: number): Promise<void> {
        console.log("[SWAP SERVICES] : Swapping "+ first_token_count + " " + 
            first_token_address + " with " + 
            second_token_address + " " + second_token_count)
        try {
            const res = (await this.contract).methods.swap({recieve: {first_token_address, first_token_count}, sell:{second_token_address, second_token_count}})
            console.log(res)
        } catch (e) {
            console.error(e)
            console.log("[POOL SERVICE] : Swapping error. Aborting...")
        }
    }
}