import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: 'enter your email'})
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'enter your password'})
  @IsNotEmpty()
  password: string;
}
