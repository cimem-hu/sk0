import { Module, forwardRef } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { userProviders } from "./user.provider";
import { UsersService } from "./services/users.service";
import { UsersController } from "./controllers/users.controller";
import { AuthService } from "./services/auth.service";
import { PasswordService } from "./services/password.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  providers: [...userProviders, UsersService, AuthService, PasswordService],
  exports: [UsersService]
})
export class UsersModule {}
