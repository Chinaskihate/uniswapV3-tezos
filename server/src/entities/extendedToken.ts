import { TokenWithExtendedStatistics } from "./tokenWithExtendedStatistics";
import { PriceStamp } from "./priceStamp";

export class ExtendedToken extends TokenWithExtendedStatistics {
  private _priceStampsAllTime: PriceStamp[] = []

  get priceStampsAllTime(): PriceStamp[] {
    return this._priceStampsAllTime
  }

  clearPriceStampsAllTime() {
    this._priceStampsAllTime = []
  }
}