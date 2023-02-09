import { TokenWithExtendedStatistics } from "./tokenWithExtendedStatistics";
import { PriceStamp } from "./priceStamp";

export class ExtendedToken extends TokenWithExtendedStatistics {
  private readonly _priceStampsAllTime: PriceStamp[] = []

  public addPriceStamp(priceStamp: PriceStamp): void {
    this._priceStampsAllTime.push(priceStamp)
  }

  get priceStampsAllTime(): PriceStamp[] {
    return this._priceStampsAllTime
  }
}