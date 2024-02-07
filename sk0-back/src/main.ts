import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() { 
  /*
  const env = process.env.NODE_ENV || 'development';
  const envConfig = dotenv.parse(fs.readFileSync(`.env.${env}`));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  } */
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();
