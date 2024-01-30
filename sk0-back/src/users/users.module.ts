import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
})
export class UsersModule {}
