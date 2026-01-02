import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Semester } from './entity/semester.entity';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester)
    private semesterRepository: Repository<Semester>,
  ) {}


  async onModuleInit(){
    for (let i =1; i<=8; i++){
      const exists= await this.semesterRepository.findOne({where: {number: i},});
      
      if (!exists){
        const semester = this.semesterRepository.create({ number: i});
        await this.semesterRepository.save(semester);
      }
    }
    console.log('Semesters 1 - 8 ready');
  }

  async findAll(){
    return this.semesterRepository.find({order: { number: 'ASC'},});
  }
  
  async findByNumber(number: number){
    return this.semesterRepository.findOne({where: {number}});
    
  }
}

 
