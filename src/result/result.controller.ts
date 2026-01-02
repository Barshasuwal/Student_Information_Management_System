import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResultService } from './result.service';

import { Semester } from 'src/semester/entity/semester.entity';

@ApiTags('Result')
@Controller('result')
export class ResultController {
    constructor( private readonly resultService: ResultService,
      

    ){}

    @Post()
    @ApiOperation({ summary: 'Add result'})
    
        addResult(@Body() dto: CreateResultDto) {
            return this.resultService.addResult(dto);
        }
    

    @Get(':Rollno/:semester')
    @ApiOperation({ summary: 'Get Result'})
        getResult(@Param('Rollno') Rollno: string, 
        @Param('semester') semester: string,
    ){
        const semesterNumber = Number(semester);
            return this.resultService.getResultByStudent(Rollno, semesterNumber);
        }

        @Get(':Rollno')
        @ApiOperation({ summary: 'Get all results for a student' })
        getAllResults(@Param('Rollno') Rollno: string) {
          return this.resultService.getResultByStudent(Rollno);
        }

        @Put()
        @ApiOperation({ summary: 'Update result'})
        updateResult(@Body() dto: CreateResultDto){
            return this.resultService.updateResult(dto);
        }

    
}





