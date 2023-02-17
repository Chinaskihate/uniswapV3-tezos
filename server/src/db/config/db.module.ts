import { Module } from '@nestjs/common';
import { PriceStampDB } from "../entities/priceStampDB";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenController } from "../../controllers/tokenController";
import { TokenService } from "../../services/tokenService";
import { TezosTokenDB } from "../entities/tezosTokenDB";
import { EntitiesConverter } from "../../utils/entities_converter/entitiesConverter";
import { JsonTokenFormatter } from "../../utils/token_formatter/jsonTokenFormatter";

@Module({
  imports: [TypeOrmModule.forFeature([PriceStampDB, TezosTokenDB])],
  exports: [TypeOrmModule],
  providers: [TokenService, EntitiesConverter, JsonTokenFormatter],
  controllers: [TokenController],
})

export class DB_Module {}