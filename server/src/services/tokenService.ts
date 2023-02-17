import { HttpException, Inject, Injectable } from "@nestjs/common";
import { ITokenService } from "./ITokenService";
import { PriceStamp } from "../entities/priceStamp";
import { UnitOfTime } from "../utils/time_converter/unitOfTime";
import { TokenWithBaseStatistics } from "../entities/tokenWithBaseStatistics";
import { ExtendedToken } from "../entities/extendedToken";
import { InjectRepository } from "@nestjs/typeorm";
import { TezosTokenDB } from "../db/entities/tezosTokenDB";
import { ILike, MoreThan, Repository } from "typeorm";
import { PriceStampDB } from "../db/entities/priceStampDB";
import { EntitiesConverter } from "../utils/entities_converter/entitiesConverter";
import { IEntitiesConverter } from "../utils/entities_converter/IEntitiesConverter";

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    @Inject(EntitiesConverter)
    private readonly _tokenConverter: IEntitiesConverter,
    @InjectRepository(TezosTokenDB)
    private readonly _tokenRepository: Repository<TezosTokenDB>,
    @InjectRepository(PriceStampDB)
    private readonly _priceStampRepository: Repository<PriceStampDB>
  ) { }

  getAllTokens(): Promise<TokenWithBaseStatistics[]> {
    return this._tokenRepository
      .find()
      .then(tokens => tokens.map(
          token => this._tokenConverter
            .convertToTokenWithBaseStatistics(token)
        )
      )
  }

  getAllTokensByNamePattern(name_pattern: string):
    Promise<TokenWithBaseStatistics[]> {
    return this._tokenRepository
      .findBy({fullName: ILike(`%${name_pattern}%`)})
      .then(result => result.map(
          token => this._tokenConverter
            .convertToTokenWithBaseStatistics(token)
        )
      )
  }

  getTokenById(id: number) : Promise<ExtendedToken> {
    return this._tokenRepository
      .findOneBy({ id })
      .then(token => {
        if (token == undefined) {
          throw new HttpException('token not found', 404)
        }
        return token
      })
      .then(token => token.priceStamps
        .then(stamps => this._tokenConverter
          .convertToExtendedToken(token, stamps)
        )
      )
  }

  getAllPriceStampsInRange(id: number, unitOfTime: UnitOfTime):
    Promise<PriceStamp[]> {
    return this._priceStampRepository
      .findBy({
        time_stamp: MoreThan(new Date(
            unitOfTime != UnitOfTime.ALL
              ? Date.now() - unitOfTime
              : -1
          )
        ),
        token: {id: id}
      })
      .then(stamps => stamps.map(
          stamp => this._tokenConverter
            .convertToPriceStamp(stamp)
        )
      )
  }
}
