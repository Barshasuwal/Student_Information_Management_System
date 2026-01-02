import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entity/result.entity';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { Student } from 'src/students/entities/student.entity';
import { Semester } from 'src/semester/entity/semester.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, Student, Semester])],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
