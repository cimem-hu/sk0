import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { TokenService } from "./auth/token.service";
import configuration from "./config/configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptionFactory } from "./ormconfig";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        dataSourceOptionFactory(
          configService.get("DB_NAME"),
          configService.get("NODE_ENV")
        )
    }),
    UsersModule,
    AuthModule
  ],

  controllers: [AppController],
  providers: [TokenService]
})
export class AppModule {}
