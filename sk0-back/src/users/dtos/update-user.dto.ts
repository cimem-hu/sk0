import { IsEmail, IsNumber, IsString } from "class-validator";

export class UpdateUserDto {
  @IsNumber()
  id: number;
  @IsEmail()
  email: string;
  @IsString()
  name: string;
  @IsString()
  token: string;
}
