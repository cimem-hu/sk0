import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './auth/token.module';
import { TokenService } from './users/services/token.service';
import configuration from './config/configuration';

@Module({
  imports: [DatabaseModule, UsersModule, ConfigModule.forRoot({load: [configuration]}), TokenModule],
  controllers: [AppController],
  providers: [TokenService],
})
export class AppModule {}
