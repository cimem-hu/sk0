import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { UsersService } from './services/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
})
export class UsersModule {}
