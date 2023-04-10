import {IContractService} from "./IContractService";
import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {SchedulerRegistry} from "@nestjs/schedule";
import {ITokenService} from "../token_service/ITokenService";
import {TokenService} from "../token_service/tokenService";
import fetch from "node-fetch"
import {PriceStamp} from "../../entities/priceStamp";
import {ExtendedToken} from "../../entities/extendedToken";
import {UnitOfTime} from "../../utils/time_converter/unitOfTime";
import {TokenWithExtendedStatistics} from "../../entities/tokenWithExtendedStatistics";
import {ExtendedStatistics} from "../../entities/extendedStatistics";
import {TezosToolkit} from "@taquito/taquito";

@Injectable()
export class ContractService implements IContractService, OnModuleInit {
  private readonly MONITOR_CONTRACT_ADDRESS: string
  private readonly PRICE_UPDATE_TIMEOUT: number
  private readonly toolkit: TezosToolkit
  private monitor_map_id
  private updates_for_day = 0

  constructor(@Inject(SchedulerRegistry)
              private readonly _schedulerRegistry: SchedulerRegistry,
              @Inject(TokenService)
              private readonly _tokenService: ITokenService) {
    this.MONITOR_CONTRACT_ADDRESS = process.env.MONITOR_CONTRACT_ADDRESS
    this.PRICE_UPDATE_TIMEOUT = +process.env.PRICE_UPDATE_TIMEOUT
    this.toolkit = new TezosToolkit(process.env.RPC_ADDRESS)
  }


  onModuleInit() {
    this._schedulerRegistry.addInterval('fetchContractDataInterval',
      setInterval(() => this.updateTokenData(), this.PRICE_UPDATE_TIMEOUT));
  }


  async updateTokenData(): Promise<void> {
    const monitor_map_id = 283084

    try {
      const contract = await this.toolkit.contract.at(this.MONITOR_CONTRACT_ADDRESS)
      const storage: any = await contract.storage()
      this.monitor_map_id = storage.tokens.id.toNumber()
    } catch (error) {
      console.log(error)
      console.log("[CONTRACT SERVICE ERROR] : Contract error: unable to identify BigMap address. " +
        "Tokens info update continued with the previous BigMap id...")
    }

    console.log(`[CONTRACT SERVICE] : ${new Date()} : Tokens info update started...`)

    const tokensInfo: any[] = await this.getTokenInfoByHashes(
      monitor_map_id,
      await this.getTokenHashes(monitor_map_id)
    )

    console.log('[CONTRACT SERVICE] : Tokens info fetched from BCD. Info update continued...')
    const updated_tokens = await this.updateTokensByTokensInfo(tokensInfo)


    if (updated_tokens.length == 0) {
      console.log('[CONTRACT SERVICE ERROR] : No new info. Tokens info update aborted.')
      return
    }

    console.log('[CONTRACT SERVICE] : Tokens info updated locally. Writing changes to DB started...')
    await this.writeUpdatedTokens(updated_tokens)
  }


  private async calculateChangeForDay(token: TokenWithExtendedStatistics,
                                      newStamp: PriceStamp): Promise<number> {
    const stampsForDay: PriceStamp[] = await this._tokenService
      .getAllPriceStampsInRange(token.address, UnitOfTime.DAY)
      .then(stamps => stamps.sort((firstStamp, secondStamp) =>
          firstStamp.timeStamp.getTime() - secondStamp.timeStamp.getTime()
        )
      )

    if (stampsForDay.length == 0) {
      return newStamp.price
    }

    return newStamp.price - stampsForDay[0].price
  }


  private async getTokenHashes(monitor_map_id): Promise<string[]> {
    try {
      const response = await fetch(`https://api.better-call.dev/v1/bigmap/ghostnet/${monitor_map_id}/keys`);
      const resp_json = await response.json();
      return resp_json.map(token => token.data.key_hash);
    } catch (error) {
      console.log('[CONTRACT SERVICE ERROR] : BCD keys API error. Tokens info update aborted.')
      return [];
    }
  }


  private async getTokenInfoByHashes(monitor_map_id,
                                            tokenHashes: string[]): Promise<any[]> {
    return Promise.all(tokenHashes.map(async hash => {
      try {
        const response = await fetch(
          `https://api.better-call.dev/v1/bigmap/ghostnet/${monitor_map_id}/keys/${hash}/state`
        );
        return response.json();
      } catch (err) {
        console.log(`[CONTRACT SERVICE ERROR] : BCD token details ERROR for ${hash}.`);
        return []
      }
    }));
  }


  private async updateTokensByTokensInfo(tokensInfo: any[]): Promise<ExtendedToken[]> {
    const updated_tokens: ExtendedToken[] = [];

    let parsing_error_count: number = 0
    try {
      for (const token_info of tokensInfo) {
        try {
          const tokenWithoutStamps: TokenWithExtendedStatistics = await this._tokenService
            .getTokenByAddressWithoutStamps(token_info.key_string);

          const lastStamp: PriceStamp = new PriceStamp(
            token_info.value.children.filter(x => x.name == 'price')[0].value,
            new Date()
          )

          let volumeForDay = tokenWithoutStamps.statistics.volumeForDay
          let total_volume = token_info.value.children.filter(x => x.name == 'total_volume')[0].value

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
              token_info.value.children.filter(x => x.name == 'price')[0].value,
              await this.calculateChangeForDay(tokenWithoutStamps, lastStamp),
              token_info.value.children.filter(x => x.name == 'total_value_locked')[0].value,
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


  private async writeUpdatedTokens(updated_tokens: ExtendedToken[]): Promise<void> {
    const total_count: number = updated_tokens.length
    let db_errors_count: number = 0
    for (const updated_token of updated_tokens) {
      try {
        await this._tokenService.saveToken(updated_token);
      } catch (err) {
        db_errors_count += 1
      }
    }

    console.log(`[CONTRACT SERVICE] : ${total_count - db_errors_count} from ${total_count} Tokens updated.`)
  }
}
