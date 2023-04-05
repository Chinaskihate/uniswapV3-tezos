import {PriceStamp} from "../../entities/priceStamp";
import {ExtendedToken} from "../../entities/extendedToken";
import {TokenWithBaseStatistics} from "../../entities/tokenWithBaseStatistics";
import {UnitOfTime} from "../../utils/time_converter/unitOfTime";
import {DeleteResult} from "typeorm";

export interface ITokenService {
  getTokenByAddress(address: string): Promise<ExtendedToken>
  getAllTokens(): Promise<TokenWithBaseStatistics[]>
  getAllTokensByNamePattern(name: string): Promise<TokenWithBaseStatistics[]>;
  getAllPriceStampsInRange(address: string, unitOfTime: UnitOfTime): Promise<PriceStamp[]>
  saveToken(extendedToken: ExtendedToken): Promise<ExtendedToken>
  deleteToken(address: string): Promise<DeleteResult>
}