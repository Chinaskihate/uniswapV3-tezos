import { PriceStamp } from "../entities/priceStamp";
import { ExtendedToken } from "../entities/extendedToken";
import { TokenWithBaseStatistics } from "../entities/tokenWithBaseStatistics";
import { UnitOfTime } from "../utils/time_converter/unitOfTime";

export interface ITokenService {
  getTokenById(id: number): Promise<ExtendedToken>
  getAllTokens(): Promise<TokenWithBaseStatistics[]>
  getAllTokensByNamePattern(name: string): Promise<TokenWithBaseStatistics[]>;
  getAllPriceStampsInRange(id: number, unitOfTime: UnitOfTime): Promise<PriceStamp[]>
}