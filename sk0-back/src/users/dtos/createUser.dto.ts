import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
    message:
      'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;
}
