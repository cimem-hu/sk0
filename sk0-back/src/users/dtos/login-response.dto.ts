import { IsEmail, IsNumber, IsString } from "class-validator";

export class LoginResultDto {
  @IsNumber()
  id: number;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
  @IsString()
  token: string;
}
