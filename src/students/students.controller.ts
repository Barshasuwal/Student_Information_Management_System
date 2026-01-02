import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Query } from '@nestjs/common';
import { StudentService } from './students.service';
import { CreateStudentDto } from './dto/create-student/create-student';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Semester } from 'src/semester/entity/semester.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpgradeSemesterDto } from 'src/semester/dto/upgrade-semester.dto';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(
    private studentService: StudentService,
    @InjectRepository(Semester) private semesterRepo: Repository<Semester>,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  async create(@Body() dto: CreateStudentDto) {
    const semester = await this.semesterRepo.findOneBy({ id: dto.semesterId });
    if (!semester) throw new Error('Semester not found');
    return this.studentService.createStudent(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students sorted alphabetically' })
  getAll() {
    return this.studentService.getAllStudents();
  }

  @Get('semester/:number')
  @ApiOperation({ summary: 'Get students by semester' })
  getBySemester(@Param('number') number: number) {
    return this.studentService.getStudentsBySemester(number);
  }

  @Patch('upgrade-semester')
  @ApiOperation({ summary: 'Upgrade students to next semester' })
    upgradeSemester(@Body() dto: UpgradeSemesterDto){
      return this.studentService.upgradeSemester(dto.currentSemesterNumber, dto.nextSemesterNumber);
    }
     
  
}











/*import { Controller,Post,Body,Get,Param,Patch,Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudent } from './dto/create-student/create-student';
import { UpdateStudent } from './dto/update-student/update-student';

@Controller('students')
export class StudentsController {
    constructor (private readonly studentsService: StudentsService){}

    @Post()
    create(@Body() data: CreateStudent){
        return this.studentsService.create(data);
    }

    @Get()
    findAll(){
            return this.studentsService.findAll();
        }
    
    @Get(':id')
    findOne(@Param('id') id: number){
        return this.studentsService.findOne(id);
    }
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateStudent: UpdateStudent) {
    return this.studentsService.update(id, updateStudent);
}
    @Delete(':id')
    remove(@Param('id') id: number){
        return this.studentsService.remove(id);
    }
 }*/
