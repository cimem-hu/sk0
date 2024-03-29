import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "src/users/services/auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TokenService } from "./token.service";
import { UsersModule } from "src/users/users.module";
import { PasswordService } from "src/users/services/password.service";

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_OPTIONS_EXPIRE")
        }
      })
    }),
    forwardRef(() => UsersModule)
  ],
  providers: [AuthService, JwtStrategy, TokenService, PasswordService],
  exports: [AuthService, TokenService, JwtModule]
})
export class AuthModule {}
