import {IAuthService} from "./IAuthService";
import {HttpException} from "@nestjs/common";
import {Repository} from "typeorm";
import {TezosAdminDB} from "../../db/entities/tezosAdminDB";
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
export class AuthService implements IAuthService {
  @InjectRepository(TezosAdminDB)
  private readonly _tezosAdminRepository: Repository<TezosAdminDB>

  validate(request: any): Promise<boolean> {
    const [log, pass]: string[] =
      Buffer.from((request.headers.authorization || '')
        .split(' ')[1] || '', 'base64')
        .toString()
        .split(':');

    return this._tezosAdminRepository
      .findOneBy({login: log})
      .then(admin => {
        if (admin == undefined) {
          throw new HttpException('incorrect login', 403)
        }
        return admin
      })
      .then(admin => {
        if (bcrypt.hashSync(pass, admin.salt) != admin.hashedPassword) {
          throw new HttpException('incorrect password', 403)
        }
        return true
      })
  }
}