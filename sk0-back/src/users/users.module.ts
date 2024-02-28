import { Module, forwardRef } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { UsersController } from "./controllers/users.controller";
import { AuthService } from "./services/auth.service";
import { PasswordService } from "./services/password.service";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
  controllers: [UsersController],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService, PasswordService],
  exports: [UsersService]
})
export class UsersModule {}
