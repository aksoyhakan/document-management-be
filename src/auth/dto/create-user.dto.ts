import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPasswordCheck } from './user.validation';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPasswordCheck({
    message: 'Password length must be longer than 5 and lesser than 12 chars',
  })
  password: string;
}
