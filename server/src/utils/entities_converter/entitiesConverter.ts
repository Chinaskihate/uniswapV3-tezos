import { IEntitiesConverter } from "./IEntitiesConverter";
import { TezosTokenDB } from "../../db/entities/tezosTokenDB";
import { BaseToken } from "../../entities/baseToken";
import { ExtendedToken } from "../../entities/extendedToken";
import { TokenWithBaseStatistics } from "../../entities/tokenWithBaseStatistics";
import { TokenWithExtendedStatistics } from "../../entities/tokenWithExtendedStatistics";
import { ExtendedStatistics } from "../../entities/extendedStatistics";
import { PriceStamp } from "../../entities/priceStamp";
import { BaseStatistics } from "../../entities/baseStatistics";
import { PriceStampDB } from "../../db/entities/priceStampDB";

export class EntitiesConverter implements IEntitiesConverter {
  convertToBaseToken(tezosTokenDB: TezosTokenDB): BaseToken {
    return new BaseToken(
      tezosTokenDB.address,
      tezosTokenDB.fullName,
      tezosTokenDB.shortName
    )
  }

  convertToExtendedToken(tezosTokenDB: TezosTokenDB, priceStamps: PriceStampDB[]): ExtendedToken {
    const extendedToken: ExtendedToken = new ExtendedToken(
      tezosTokenDB.fullName, tezosTokenDB.shortName,
      tezosTokenDB.address, new ExtendedStatistics(
        tezosTokenDB.price, tezosTokenDB.change, tezosTokenDB.totalValueLocked,
        tezosTokenDB.totalVolume, tezosTokenDB.volumeForDay, tezosTokenDB.icon
      )
    )
    priceStamps.map(stamp => extendedToken.priceStampsAllTime.push(
      new PriceStamp(stamp.price, stamp.time_stamp)
    ))
    return extendedToken;
  }

  convertToTokenWithBaseStatistics(tezosTokenDB: TezosTokenDB): TokenWithBaseStatistics {
    return new TokenWithBaseStatistics(
      tezosTokenDB.fullName, tezosTokenDB.shortName,
      tezosTokenDB.address, new BaseStatistics(
        tezosTokenDB.price, tezosTokenDB.change
      )
    )
  }

  convertToTokenWithExtendedStatistics(tezosTokenDB: TezosTokenDB): TokenWithExtendedStatistics {
    return new TokenWithExtendedStatistics(
      tezosTokenDB.fullName, tezosTokenDB.shortName,
      tezosTokenDB.address, new ExtendedStatistics(
        tezosTokenDB.price, tezosTokenDB.change, tezosTokenDB.totalValueLocked,
        tezosTokenDB.totalVolume, tezosTokenDB.volumeForDay, tezosTokenDB.icon
      )
    )
  }

  convertToPriceStamp(priceStampDB: PriceStampDB): PriceStamp {
    return new PriceStamp(priceStampDB.price, priceStampDB.time_stamp)
  }

  convertToTezosDBToken(token: ExtendedToken): TezosTokenDB {
    return new TezosTokenDB(
        token.fullName, token.shortName, token.address,
        token.statistics.price, token.statistics.change,
        token.statistics.totalValueLocked, token.statistics.totalVolume,
        token.statistics.volumeForDay, token.statistics.icon
    )
  }

  convertToPriceStampDB(priceStamp: PriceStamp,
                        tezosToken: TezosTokenDB): PriceStampDB {
    return new PriceStampDB(priceStamp.price,
        priceStamp.timeStamp, tezosToken
    )
  }
}