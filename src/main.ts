import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add global prefix https://docs.nestjs.com/faq/global-prefix
  // ignore glabal prefix https://docs.nestjs.com/openapi/other-features#global-prefix
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(30270);
}
bootstrap();
