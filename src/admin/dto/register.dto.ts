import { IsEmail, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto { 
    @ApiProperty({ description: 'enter your name'})
  @IsNotEmpty()
  username: string;


@ApiProperty({ description: 'enter your email'})
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'enter your password'})
  @IsNotEmpty()
  password: string;

 
}
