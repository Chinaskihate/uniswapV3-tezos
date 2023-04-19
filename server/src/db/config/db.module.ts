import {Module} from '@nestjs/common';
import {PriceStampDB} from "../entities/priceStampDB";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TokenController} from "../../controllers/tokenController";
import {TokenService} from "../../services/token_service/tokenService";
import {TezosTokenDB} from "../entities/tezosTokenDB";
import {EntitiesConverter} from "../../utils/entities_converter/entitiesConverter";
import {JSON_TokenFormatter} from "../../utils/token_formatter/JSON_TokenFormatter";
import {TezosAdminDB} from "../entities/tezosAdminDB";
import {AuthService} from "../../proxy_logic/auth/authService";

@Module({
  imports: [TypeOrmModule.forFeature([
    PriceStampDB,
    TezosTokenDB,
    TezosAdminDB
  ])],
  exports: [TypeOrmModule],
  providers: [TokenService, EntitiesConverter, JSON_TokenFormatter, AuthService],
  controllers: [TokenController],
})

export class DB_Module {}