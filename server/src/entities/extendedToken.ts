import { TokenWithExtendedStatistics } from "./tokenWithExtendedStatistics";
import { PriceStamp } from "./priceStamp";

export class ExtendedToken extends TokenWithExtendedStatistics {
  private readonly _priceStampsAllTime: PriceStamp[] = []

  get priceStampsAllTime(): PriceStamp[] {
    return this._priceStampsAllTime
  }
}