import { Module } from "@nestjs/common";
import { TokenController } from "../controllers/tokenController";
import { TokenService } from "../services/tokenService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceStampDB } from "../db/entities/priceStampDB";
import { TezosTokenDB } from "../db/entities/tezosTokenDB";
import { DB_Module } from "../db/config/db.module";
import { EntitiesConverter } from "../utils/entities_converter/entitiesConverter";
import { JsonTokenFormatter } from "../utils/token_formatter/jsonTokenFormatter";
import { ConfigModule} from "@nestjs/config";

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
      entities: [PriceStampDB, TezosTokenDB],
      synchronize: true,
    }),
    DB_Module,
  ],
  controllers: [TokenController],
  providers: [TokenService, EntitiesConverter, JsonTokenFormatter],
})
export class AppModule {}
