import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsStrongPasswordOptions,
  MinLength
} from "class-validator";

const passwordRules: IsStrongPasswordOptions = {
  minLength: 6,
  minUppercase: 1,
  minLowercase: 1,
  minNumbers: 1,
  minSymbols: 0
};

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword(passwordRules)
  password: string;

  @IsString()
  @MinLength(3)
  name: string;
}
