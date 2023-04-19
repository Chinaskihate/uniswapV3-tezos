import {TokenWithExtendedStatistics} from "../entities/tokenWithExtendedStatistics";
import {TokenWithBaseStatistics} from "../entities/tokenWithBaseStatistics";
import {Inject, Injectable} from "@nestjs/common";
import { PriceStamp } from "../entities/priceStamp";
import {TezosToolkit} from "@taquito/taquito";
import Position from "../components/lists/pool/IPool";
import Tick from "./ITick";
import { TokenProvider } from "./tokenProvider";


const serverPort = process.env.REACT_APP_SERVER_PORT!
const serverAddress = process.env.REACT_APP_SERVER_ADDRESS!

export class PoolProvider {
    private readonly toolkit: TezosToolkit
    private readonly CONTRACT_ADDRESS: string
    private positions_map_id: number
    private tick_map_id: number
    private const_fee_bps : number = 10
    private const_x80: number = Math.pow(2, 14)
    private token_provider = new TokenProvider()

    constructor() {
        this.toolkit = new TezosToolkit(process.env.REACT_APP_RPC_ADDRESS as string)
        this.CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS as string
        this.positions_map_id = -1
        this.tick_map_id = -1
    }
    async getPositions(): Promise<Position[]> {
        const positions_map_id = 289795
    
        try {
          const contract = await this.toolkit.contract.at(this.CONTRACT_ADDRESS)
          const storage: any = await contract.storage()
          this.positions_map_id = storage.positions.id.toNumber()
          this.const_fee_bps = storage.constants[0]
        } catch (error) {
          console.log(error)
          console.log("[POOL PROVIDER ERROR] : Unable to identify positions BigMap address. " +
            "Positions fetching...")
        }
    
        const positionInfo: any[] = await this.getInfoByHashes(
          positions_map_id,
          await this.getHashes(positions_map_id)
        )
    
        console.log('[POOL PROVIDER] : Positions info fetched from BCD.')
  
        const positions: Position[] = await this.getPositionsFromPositionInfo(positionInfo)
        
        return positions
      }
    
      private async getHashes(positions_map_id: number): Promise<string[]> {
        try {
          const response = await fetch(`https://api.better-call.dev/v1/bigmap/ghostnet/${positions_map_id}/keys`);
          const resp_json = await response.json();
          return resp_json.map((position: { data: { key_hash: any; }; }) => position.data.key_hash);
        } catch (error) {
          console.log('[POOL PROVIDER] : BCD keys API error. Tokens info update aborted.')
          return [];
        }
      }


      private async getInfoByHashes(positions_map_id: number,
                                            positionHashes: string[]): Promise<any[]> {
    return Promise.all(positionHashes.map(async hash => {
      try {
        const response = await fetch(
          `https://api.better-call.dev/v1/bigmap/ghostnet/${positions_map_id}/keys/${hash}/state`
        );
        return response.json();
      } catch (err) {
        console.log(`[POOL PROVIDER] : BCD token details ERROR for ${hash}.`);
        return []
      }
    }));
  }

  

  private async getPositionsFromPositionInfo(positionInfo: any[]): Promise<Position[]> {
    const fetched_positions: Position[] = [];
    let parsing_error_count: number = 0
    try {
      for (const position_info of positionInfo) {
        const address_1 = position_info.key.children[0].children[0].value
        const address_2 = position_info.key.children[0].children[1].value
        const id = position_info.key.children[1].value
        const lower_tick_index = position_info.value.children[2].value
        const upper_tick_index = position_info.value.children[4].value
        const ticks: Tick[] = await this.getTicksByAddresses(address_1, address_2, lower_tick_index, upper_tick_index)
        let tick_price_avg = 0
        for (const tick of ticks) {
          tick_price_avg += tick.sqrt_price
        }
        tick_price_avg /= ticks.length
        if (tick_price_avg == 0) {
          console.error("[POOL PROVIDER] : Tick prices fetching error")
        } else {
        const first_value = position_info.value.children[1].value / tick_price_avg
        const second_value = position_info.value.children[1].value * tick_price_avg
        const min_price = this.getPriceFromTickId(lower_tick_index)
        const max_price = this.getPriceFromTickId(upper_tick_index)
        
        //TODO UNCOMMENT TO FETCH INSTEAD OF MOCK
        //const firstToken = (await this.token_provider.findByAddress(address_1)).fullName
        //const secondToken = (await this.token_provider.findByAddress(address_2)).fullName
        //const firstTokenShort = (await this.token_provider.findByAddress(address_1)).shortName
        //const secondTokenShoer = (await this.token_provider.findByAddress(address_2)).shortName

        const first_token = "Token 1"
        const second_token = "Token 2"
        const first_token_short = "tk1"
        const second_token_short = "tk2"
        const first_fee_earned = position_info.value.children[0].children[0].value
        const second_fee_earned = position_info.value.children[0].children[1].value
        console.log(position_info.value.children[0].children[0].value)
        const new_position: Position = {
          id: id,
          firstToken: first_token,
          secondToken: second_token,
          firstTokenShort: first_token_short,
          secondTokenShort: second_token_short,
          firstTokenAddress: address_1,
          secondTokenAddress: address_2,
          firstTokenVal: first_value,
          secondTokenVal: second_value,
          minValue: min_price,
          maxValue: max_price,
          firstFeeEarned: first_fee_earned,
          secondFeeEarned: second_fee_earned
          }
        fetched_positions.push(new_position)
        }
      }
    } catch (error) {
      console.log(error)
      console.log("[POOL PROVIDER ERROR] : Fetching positions error aborting... ")
    }
    return fetched_positions
  }

  private getPriceFromTickId(tick_id: number): number {
    return Math.pow(1.0001, tick_id)
  }
  private async getTicksByAddresses(address_1: string, address_2: string, min: number, max:number): Promise<Tick[]> {
    const tick_map_id = 289796
    
    try {
      const contract = await this.toolkit.contract.at(this.CONTRACT_ADDRESS)
      const storage: any = await contract.storage()
      this.tick_map_id = storage.ticks.id.toNumber()
    } catch (error) {
      console.log(error)
      console.log("[POOL PROVIDER ERROR] : Unable to identify ticks BigMap address. " +
        "ticks fetching...")
    }

    const tickInfo: any[] = await this.getInfoByHashes(
      tick_map_id,
      await this.getHashes(tick_map_id)
    )

    console.log('[POOL PROVIDER] : Ticks fetched from BCD.')

    const ticks: Tick[] = await this.getTicksFromTickInfo(tickInfo)
    return ticks.filter(tick => tick.firstToken == address_1
        && tick.secondToken == address_2
        && tick.id <= max
        && tick.id >= min)
  }

  
  private async getTicksFromTickInfo(tickInfo: any[]): Promise<Tick[]> {
    const fethced_ticks: Tick[] = [];
    try {
      for (const tick_info of tickInfo) {
        const address_1 = tick_info.key.children[0].children[0].value
        const address_2 = tick_info.key.children[0].children[1].value
        const id = tick_info.key.children[1].value
        const liquidity_net = tick_info.value.children[1].value
        const next = tick_info.value.children[2].value
        const previous = tick_info.value.children[3].value
        const sqrt_price = Math.pow(tick_info.value.children[4].value, 2) / this.const_x80
        const new_tick: Tick = {
          id: id,
          firstToken: address_1,
          secondToken: address_2,
          liquidity_net: liquidity_net,
          next: next,
          previous: previous,
          sqrt_price: sqrt_price
        }
        fethced_ticks.push(new_tick)
      }
    } catch (error){
      console.error(error)
      console.log('[POOL SERVICE ERROR] : Ticks parsing error. Aborting fetching ticks.')
      return [] as Tick[]
    }
    return fethced_ticks
  }

      

/*
  private async updateTokensByTokensInfo(poolInfo: any[]): Promise<Pool[]> {
    
    const updated_tokens: Pool[] = [];

    let parsing_error_count: number = 0
    try {
      for (const pool_info of poolInfo) {
        try {
          const tokenWithoutStamps: TokenWithExtendedStatistics = await this._tokenService
            .getTokenByAddressWithoutStamps(pool_info.key_string);

          const lastStamp: PriceStamp = new PriceStamp(
            pool_info.value.children.filter(x => x.name == 'price')[0].value,
            new Date()
          )

          let volumeForDay = tokenWithoutStamps.statistics.volumeForDay
          let total_volume = pool_info.value.children.filter(x => x.name == 'total_volume')[0].value

          if (this.updates_for_day * this.PRICE_UPDATE_TIMEOUT >= UnitOfTime.DAY) {
            volumeForDay = total_volume - volumeForDay
            this.updates_for_day = 0
            console.log("[CONTRACT SERVICE] : Volume For Day updated locally")
          }

          const extendedToken: ExtendedToken = new ExtendedToken(
            tokenWithoutStamps.fullName,
            tokenWithoutStamps.shortName,
            tokenWithoutStamps.address,
            new ExtendedStatistics(
              pool_info.value.children.filter(x => x.name == 'price')[0].value,
              await this.calculateChangeForDay(tokenWithoutStamps, lastStamp),
              pool_info.value.children.filter(x => x.name == 'total_value_locked')[0].value,
              total_volume,
              volumeForDay,
              tokenWithoutStamps.statistics.icon
            )
          )

          extendedToken.priceStampsAllTime.push(lastStamp);

          extendedToken.statistics.changeForDay = await
            this.calculateChangeForDay(tokenWithoutStamps, lastStamp)

          updated_tokens.push(extendedToken);
        } catch (err) {
          parsing_error_count += 1
        }
      }
      return updated_tokens
    } catch (err) {
      console.log('[CONTRACT SERVICE ERROR] : Tokens parsing error. Tokens info update aborted.')
      return [] as ExtendedToken[]
    }
    
  }
  */
}