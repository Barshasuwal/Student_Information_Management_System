// semester.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Semester } from './entity/semester.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SemesterService } from './semester.service';

@ApiTags('Semesters')
@Controller('semesters')
export class SemesterController {
  //constructor(@InjectRepository(Semester) private semesterRepo: Repository<Semester>) {}
  constructor(private readonly semesterService: SemesterService){}
  

  @Get()
  @ApiOperation({ summary: 'List all semesters' })
  findAll() {
    return this.semesterService.findAll();
  }
  @Get(':number')
  @ApiOperation({ summary: 'Get single semester by number' })
  findOne(@Param('number') number: number){
    return this.semesterService.findByNumber(Number(number));
  }
}
