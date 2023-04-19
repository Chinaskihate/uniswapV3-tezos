import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {InternalServerErrorFilter} from "../proxy_logic/error_filters/internalServerErrorFilter";
import {HttpErrorFilter} from "../proxy_logic/error_filters/httpErrorFilter";
import {config} from "dotenv"
import {QueryErrorFilter} from "../proxy_logic/error_filters/queryErrorFilter";

async function bootstrap() {  
  config({path: 'dev.env'})
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(
    app.get(InternalServerErrorFilter),
    app.get(HttpErrorFilter),
    app.get(QueryErrorFilter)
  );
  await app.listen(3001);
}

bootstrap().then(() => console.log('SERVER STARTED...'))
