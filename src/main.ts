import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add global prefix https://docs.nestjs.com/faq/global-prefix
  // ignore glabal prefix https://docs.nestjs.com/openapi/other-features#global-prefix
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({
    origin: '*',
  });
  const configService = app.get(ConfigService);
  const jwtSecret = configService.get<string>('JWT_SECRET');
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment');
  }

  console.log('JWT_SECRET is properly loaded', jwtSecret);

  await app.listen(30270);
}
bootstrap();
