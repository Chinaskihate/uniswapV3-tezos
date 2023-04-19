import {PriceStamp} from "../../entities/priceStamp";
import {ExtendedToken} from "../../entities/extendedToken";
import {TokenWithBaseStatistics} from "../../entities/tokenWithBaseStatistics";
import {UnitOfTime} from "../../utils/time_converter/unitOfTime";
import {DeleteResult} from "typeorm";
import {TokenWithExtendedStatistics} from "../../entities/tokenWithExtendedStatistics";

export interface ITokenService {
  getTokenByAddress(address: string): Promise<ExtendedToken>
  getAllTokens(): Promise<TokenWithBaseStatistics[]>
  getAllTokensByNamePattern(name: string): Promise<TokenWithBaseStatistics[]>;
  getAllPriceStampsInRange(address: string, unitOfTime: UnitOfTime): Promise<PriceStamp[]>
  getTokenByAddressWithoutStamps(address: string) : Promise<TokenWithExtendedStatistics>
  saveToken(extendedToken: ExtendedToken): Promise<ExtendedToken>
  deleteToken(address: string): Promise<DeleteResult>
}