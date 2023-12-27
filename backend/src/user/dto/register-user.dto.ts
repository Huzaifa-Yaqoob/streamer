import { Optional } from '@nestjs/common';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(24)
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @MaxLength(32)
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
