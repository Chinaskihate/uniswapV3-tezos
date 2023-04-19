import {Module} from "@nestjs/common";
import {TokenController} from "../controllers/tokenController";
import {TokenService} from "../services/token_service/tokenService";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PriceStampDB} from "../db/entities/priceStampDB";
import {TezosTokenDB} from "../db/entities/tezosTokenDB";
import {DB_Module} from "../db/config/db.module";
import {EntitiesConverter} from "../utils/entities_converter/entitiesConverter";
import {JSON_TokenFormatter} from "../utils/token_formatter/JSON_TokenFormatter";
import {ConfigModule} from "@nestjs/config";
import {ErrorResponseSender} from "../proxy_logic/error_filters/response_sender/ErrorResponseSender";
import {QueryErrorFilter} from "../proxy_logic/error_filters/queryErrorFilter";
import {HttpErrorFilter} from "../proxy_logic/error_filters/httpErrorFilter";
import {InternalServerErrorFilter} from "../proxy_logic/error_filters/internalServerErrorFilter";
import {BaseErrorFilter} from "../proxy_logic/error_filters/baseErrorFilter";
import {TezosAdminDB} from "../db/entities/tezosAdminDB";
import {AuthService} from "../proxy_logic/auth/authService";
import {ScheduleModule, SchedulerRegistry} from '@nestjs/schedule';
import {ContractService} from "../services/contract_service/ContractService";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'dev.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        PriceStampDB,
        TezosTokenDB,
        TezosAdminDB
      ],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    DB_Module,
  ],
  controllers: [TokenController],
  providers: [
    BaseErrorFilter,
    QueryErrorFilter,
    HttpErrorFilter,
    InternalServerErrorFilter,
    ErrorResponseSender,
    TokenService,
    EntitiesConverter,
    JSON_TokenFormatter,
    AuthService,
    ContractService,
    SchedulerRegistry
  ],
})
export class AppModule {}
