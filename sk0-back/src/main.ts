import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const logger = new Logger("NestJs Bootstrap");
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder().setTitle("SK0").addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/swagger", app, document);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>("PORT");
  await app.listen(port, () =>
    logger.log(`Application is running on port ${port}`)
  );
}
bootstrap();
