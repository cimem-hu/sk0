import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export type TokenPayload = {
  email: string;
  id: string | number;
  name: string;
};

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(tokenPayload: TokenPayload): string {
    return this.jwtService.sign(tokenPayload);
  }
}
