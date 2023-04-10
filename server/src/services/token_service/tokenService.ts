import { HttpException, Inject, Injectable } from "@nestjs/common";
import { ITokenService } from "./ITokenService";
import { PriceStamp } from "../../entities/priceStamp";
import { UnitOfTime } from "../../utils/time_converter/unitOfTime";
import { TokenWithBaseStatistics } from "../../entities/tokenWithBaseStatistics";
import { ExtendedToken } from "../../entities/extendedToken";
import { InjectRepository } from "@nestjs/typeorm";
import { TezosTokenDB } from "../../db/entities/tezosTokenDB";
import {DeleteResult, ILike, MoreThan, Repository} from "typeorm";
import { PriceStampDB } from "../../db/entities/priceStampDB";
import { EntitiesConverter } from "../../utils/entities_converter/entitiesConverter";
import { IEntitiesConverter } from "../../utils/entities_converter/IEntitiesConverter";
import {TokenWithExtendedStatistics} from "../../entities/tokenWithExtendedStatistics";

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

  getTokenByAddress(address: string) : Promise<ExtendedToken> {
    return this._tokenRepository
      .findOneBy({ address })
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

  getTokenByAddressWithoutStamps(address: string) : Promise<TokenWithExtendedStatistics> {
    return this._tokenRepository
      .findOneBy({ address })
      .then(token => {
        if (token == undefined) {
          throw new HttpException('token not found', 404)
        }
        return this._tokenConverter
          .convertToTokenWithExtendedStatistics(token)
      })
  }

  getAllPriceStampsInRange(address: string, unitOfTime: UnitOfTime):
    Promise<PriceStamp[]> {
    return this._priceStampRepository
      .findBy({
        time_stamp: MoreThan(new Date(
            unitOfTime != UnitOfTime.ALL
              ? Date.now() - unitOfTime
              : -1
          )
        ),
        token: {address: address}
      })
      .then(stamps => stamps.map(
          stamp => this._tokenConverter
            .convertToPriceStamp(stamp)
        )
      )
  }

  async saveToken(extendedToken: ExtendedToken):
      Promise<ExtendedToken> {
      const savedToken: TezosTokenDB = await
          this._tokenRepository
          .save(this._tokenConverter
              .convertToTezosDBToken(extendedToken)
          )

      await Promise.all(
          extendedToken.priceStampsAllTime.map(priceStamp =>
              this._priceStampRepository.save(
                  this._tokenConverter.convertToPriceStampDB(
                      priceStamp, savedToken
                  )
              )
          )
      )

      return this.getTokenByAddress(savedToken.address)
  }

  deleteToken(address: string): Promise<DeleteResult> {
    return this._tokenRepository
      .delete({address: address})
      .then(deleteResult => {
        if (deleteResult.affected == 0) {
          throw new HttpException(
            'Token with this address does not exists', 404
          )
        }
        return deleteResult
      })
  }
}