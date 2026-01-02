import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { Semester } from 'src/semester/entity/semester.entity';
import { CreateStudentDto } from './dto/create-student/create-student';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(Semester)
    private semesterRepo: Repository<Semester>,
  ) {}

  async createStudent(dto: CreateStudentDto) {
    const existing = await this.studentRepo.findOne({ where: { Rollno: dto.Rollno } });
    if (existing) throw new BadRequestException('Student ID already exists');

    const semester = await this.semesterRepo.findOneBy({ id: dto.semesterId });
    if (!semester) throw new BadRequestException('Semester not found');

    const student = this.studentRepo.create({ ...dto, semester });
    return this.studentRepo.save(student);
  }

  getAllStudents() {
    return this.studentRepo.find({ order: { firstName: 'ASC' }, relations: ['semester'] });
  }

  getStudentsBySemester(semesterNumber: number) {
    return this.studentRepo.find({
      where: { semester: { number: semesterNumber } },
      order: { firstName: 'ASC' },
      relations: ['semester'],
    });
  }

  async upgradeSemester(currentSemesterNumber: number, nextSemesterNumber: number) {
    if (nextSemesterNumber <= currentSemesterNumber) {
      throw new BadRequestException('Next semester must be greater than current semester');}
    
    const currentSemester = await this.semesterRepo.findOne({where: {number: currentSemesterNumber},});

    if(!currentSemester) throw new NotFoundException('current semester not found');
   
    //const currentSemester = currentSemester.semester.number;
    if( currentSemesterNumber >= 8){
      throw new BadRequestException(' student is already in final semester');
    }

    const nextSemester = await this.semesterRepo.findOne({where: { number: nextSemesterNumber},});
    if(!nextSemester){
      throw new NotFoundException('Next semester not found')
    }   
    const students = await this.studentRepo.find({where: { semester:{number: currentSemesterNumber}}, relations: ['semester'],});
    if(!students.length) throw new NotFoundException('No students found in this semester');

    for( const student of students){
      student.semester = nextSemester;
      await this.studentRepo.save(student);

    }

    return {message: `All students upgraded from semester ${currentSemesterNumber} to ${nextSemesterNumber}`};
    
  }
}
