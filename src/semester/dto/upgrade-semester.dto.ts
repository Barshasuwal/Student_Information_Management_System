import { IsNumber, Min, Max } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
 
export class UpgradeSemesterDto {
 @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(8)
  currentSemesterNumber: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(8)
  nextSemesterNumber: number;
}
