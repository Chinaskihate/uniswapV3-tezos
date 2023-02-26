import { PriceStamp } from "../entities/tokens/priceStamp";
import { ExtendedToken } from "../entities/tokens/extendedToken";
import { TokenWithBaseStatistics } from "../entities/tokens/tokenWithBaseStatistics";

export interface ITokenService {
  getTokenById(id: number) : ExtendedToken
  getAllTokens(): TokenWithBaseStatistics[]
  getAllTokensByNamePattern(name: string): TokenWithBaseStatistics[];
  getAllPriceStamps(id: number): PriceStamp[]
  getAllPriceStampsInHour(id: number): PriceStamp[]
  getAllPriceStampsInDay(id: number): PriceStamp[]
  getAllPriceStampsInWeek(id: number): PriceStamp[]
  getAllPriceStampsInYear(id: number): PriceStamp[]
}