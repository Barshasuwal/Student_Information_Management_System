import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
 @ApiProperty()
 @IsNotEmpty()
 Rollno: string;


  @ApiProperty()
  @IsNotEmpty() 
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty() 
  @IsEmail() 
  email: string;

  @ApiProperty() 
  @IsNotEmpty() 
  phone: string;

  @ApiProperty() 
  @IsNotEmpty() 
  address: string;


  @ApiProperty() 
  @IsNotEmpty() 
  semesterId: number;
}









/*import { IsString, IsNotEmpty, IsEmail,MinLength,MaxLength } from 'class-validator'


export class CreateStudent {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MinLength(10)
    phone: string;

    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    faculty: string;
}*/
