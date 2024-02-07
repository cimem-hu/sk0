import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

async function bootstrap() {
  const env = process.env.NODE_ENV || 'development';
  const envConfig = dotenv.parse(fs.readFileSync(`.env.${env}`));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  await app.listen(port, '127.0.0.1');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
