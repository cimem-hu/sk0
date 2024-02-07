import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [DatabaseModule, UsersModule, ConfigModule.forRoot({load: [configuration]})],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
