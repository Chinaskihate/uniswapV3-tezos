import { TezosTokenDB } from "../../db/entities/tezosTokenDB";
import { BaseToken } from "../../entities/baseToken";
import { TokenWithBaseStatistics } from "../../entities/tokenWithBaseStatistics";
import { TokenWithExtendedStatistics } from "../../entities/tokenWithExtendedStatistics";
import { ExtendedToken } from "../../entities/extendedToken";
import { PriceStampDB } from "../../db/entities/priceStampDB";
import { PriceStamp } from "../../entities/priceStamp";

export interface IEntitiesConverter {
  convertToBaseToken(tezosTokenDB: TezosTokenDB): BaseToken
  convertToTokenWithBaseStatistics(tezosTokenDB: TezosTokenDB): TokenWithBaseStatistics
  convertToTokenWithExtendedStatistics(tezosTokenDB: TezosTokenDB): TokenWithExtendedStatistics
  convertToExtendedToken(tezosTokenDB: TezosTokenDB, priceStamps: PriceStampDB[]): ExtendedToken
  convertToPriceStamp(priceStampDB: PriceStampDB): PriceStamp
}