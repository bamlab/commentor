import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { EntityNotFoundFilter } from './exception/entity-not-found.filter';
import { QueryFailedFilter } from './exception/query-failed.filter';
import dotenv from './dotenv';
dotenv.config({ allowEmptyValues: ['ALLOWED_HOST'] });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.ALLOWED_HOST) {
    app.enableCors({ credentials: true, origin: process.env.ALLOWED_HOST });
  }

  app.use(cookieParser());

  app.useGlobalFilters(new EntityNotFoundFilter());
  app.useGlobalFilters(new QueryFailedFilter());

  await app.listen(process.env.PORT);
}
bootstrap();
