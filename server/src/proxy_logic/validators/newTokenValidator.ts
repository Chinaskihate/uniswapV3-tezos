import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from "@nestjs/common";
import {ExtendedToken} from "../../entities/extendedToken";
import {Repository} from "typeorm";
import {TezosTokenDB} from "../../db/entities/tezosTokenDB";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class NewTokenValidator implements PipeTransform {
  @InjectRepository(TezosTokenDB)
  private readonly _tokenRepository: Repository<TezosTokenDB>

  async transform(token: ExtendedToken, metadata: ArgumentMetadata) {
    let ifExists: TezosTokenDB
    try {
      ifExists = await this._tokenRepository
        .findOneBy({address: token.address})
    } catch (e) {
      console.log(e.message)
      throw new HttpException('incorrect input Token',
        HttpStatus.BAD_REQUEST
      )
    }

    if (ifExists != undefined) {
      throw new HttpException(
        'token with this address already exists',
        400)
    }

    return token
  }
}