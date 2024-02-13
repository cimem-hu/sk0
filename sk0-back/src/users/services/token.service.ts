import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { User } from '../user.entity';

@Injectable()
export class TokenService {
    constructor(private readonly nestJwtService: NestJwtService) {}

    generateToken(user: User): string {
        const payload = { email: user.email, sub: user.id };
        return this.nestJwtService.sign(payload);
    }
}
