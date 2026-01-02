import { IsString, IsNumber, Min, Max, ValidateNested, IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SubjectMarkDto{
    @ApiProperty()
    @IsString()
    subject: string;
    

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(100)
    marks: number;
}
export class CreateResultDto{

    @ApiProperty()
    @IsString()
    Rollno: string;

    @ApiProperty()
    @IsNumber()
    semester: number;
    
    @ApiProperty({ type: [SubjectMarkDto] })
    @IsArray()
    @ArrayMinSize(5)
    @ArrayMaxSize(5)
    @ValidateNested({ each: true })
    @Type(() => SubjectMarkDto)
    subjects: SubjectMarkDto[];

    
}
