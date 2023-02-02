import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InternalServerErrorFilter } from "../proxy_logic/error_filters/internalServerErrorFilter";
import { HttpErrorFilter } from "../proxy_logic/error_filters/httpErrorFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new InternalServerErrorFilter(), new HttpErrorFilter());
  await app.listen(3000);
}

bootstrap()
