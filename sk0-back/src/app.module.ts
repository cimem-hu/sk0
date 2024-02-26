import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { TokenService } from "./auth/token.service";
import configuration from "./config/configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DbConfigOptions, dataSourceOptionFactory } from "./ormconfig";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        dataSourceOptionFactory(configService.get<DbConfigOptions>("DB_CONFIG"))
    }),
    UsersModule,
    AuthModule
  ],

  controllers: [AppController],
  providers: [TokenService]
})
export class AppModule {}
