import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger("NestJs Bootstrap");
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port, () => logger.log(`Application is running on port ${port}`));
}
bootstrap();
