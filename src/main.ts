import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // https://docs.nestjs.com/faq/global-prefix
  app.setGlobalPrefix('api/v1');
  await app.listen(30270);
}
bootstrap();
