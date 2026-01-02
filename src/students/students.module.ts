import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './students.service';
import { StudentController } from './students.controller';
import { Student } from './entities/student.entity';
import { Semester } from 'src/semester/entity/semester.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Semester])], 
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
