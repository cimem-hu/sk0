import { Module} from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';

@Module({
  controllers: [UsersController],
  imports: [
    DatabaseModule,
  ],
  providers: [...userProviders, UsersService, AuthService, PasswordService],
})
export class UsersModule {}
