import { Inject, Injectable } from "@nestjs/common";
import { ITokenService } from "./ITokenService";
import { PriceStamp } from "../entities/tokens/priceStamp";
import { MockTokenProvider } from "../repo/mockTokenProvider";
import { TimeConverter } from "../utils/timeConverter";
import { UnitOfTime } from "../utils/unitOfTime";
import { TokenWithBaseStatistics } from "../entities/tokens/tokenWithBaseStatistics";
import { ITokenProvider } from "../repo/ITokenProvider";
import { ExtendedToken } from "../entities/tokens/extendedToken";

@Injectable()
export class TokenService implements ITokenService {
  constructor(@Inject(MockTokenProvider) private readonly _provider: ITokenProvider) { }

  getAllTokens(): TokenWithBaseStatistics[] {
    return this._provider.tokensWithBaseStatistics
  }

  getAllTokensByNamePattern(name: string): TokenWithBaseStatistics[] {
    return this._provider.tokensWithBaseStatistics.filter(token => token.fullName.includes(name))
  }

  getTokenById(id: number) : ExtendedToken {
    return this._provider.extendedTokensList.find(token => token.id == id)
  }

  getAllPriceStampsInHour(id: number): PriceStamp[] {
    return this.filterStamps(this._provider.extendedTokensList, id, UnitOfTime.HOUR)
  }

  getAllPriceStampsInDay(id: number): PriceStamp[] {
    return this.filterStamps(this._provider.extendedTokensList, id, UnitOfTime.DAY)
  }

  getAllPriceStampsInWeek(id: number): PriceStamp[] {
    return this.filterStamps(this._provider.extendedTokensList, id, UnitOfTime.WEEK)
  }

  getAllPriceStampsInYear(id: number): PriceStamp[] {
    return this.filterStamps(this._provider.extendedTokensList, id, UnitOfTime.YEAR)
  }

  getAllPriceStamps(id: number): PriceStamp[] {
    return this._provider
      .extendedTokensList
      .find(token => token.id == id)
      .priceStampsAllTime
  }

  // get all token timeStamps from the unitOfTime
  private filterStamps(tokens: ExtendedToken[],
                       id: number,
                       unitOfTime: UnitOfTime) : PriceStamp[] {
    return tokens
      .find(token => token.id == id)
      .priceStampsAllTime
      .filter(priceStamp =>
        TimeConverter.convert(
          Date.now() - priceStamp.timeStamp, unitOfTime
        ) < 1
      )
  }
}
