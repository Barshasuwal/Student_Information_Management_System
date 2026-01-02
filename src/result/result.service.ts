import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entity/result.entity';
import { Student } from 'src/students/entities/student.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { Semester } from 'src/semester/entity/semester.entity';

@Injectable()
export class ResultService {
    constructor( @InjectRepository(Result) private resultRepo: Repository<Result>,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(Semester) private readonly semesterRepo: Repository<Semester>,
) {}
async addResult(data: CreateResultDto){
    const student = await this.studentRepo.findOne({where: {Rollno: data.Rollno},});
    if(!student) throw new NotFoundException ('Student not found');

    const semester = await this.semesterRepo.findOne({ where: {number: data.semester}});
    if(!semester) throw new NotFoundException ('semester not found');

    
    const existingResults = await this.resultRepo.find({ where: {student: {id: student.id}, semester: {id: semester.id}},});
    if(existingResults.length > 0) throw new BadRequestException('This students information is already stored');
    
        const gradePoints = {'A': 4, 'B': 3, 'C': 2, 'F': 0};
        let totalMarks = 0;
        let totalGradePoints = 0;
        let allPassed = true;
    
        const resultToSave = data.subjects.map(sub => {
            totalMarks += sub.marks;
        const grade = sub.marks >= 80 ? 'A': sub.marks >= 60 ? 'B': sub.marks >= 40 ? 'C' : 'F';
        totalGradePoints += gradePoints[grade];
        const status = sub.marks >= 40 ? 'pass' : 'fail';
        if (status === 'fail') allPassed = false;

        return this.resultRepo.create({
        subject: sub.subject,
        marks: sub.marks,
        grade,
        status,
        student,
        semester,
    
});
});
   await this.resultRepo.save(resultToSave);

    const percentage = totalMarks / data.subjects.length;
    const GPA = totalGradePoints / data.subjects.length;
    return{
        message: 'Result Added Sucessfully',
        Rollno: student.Rollno,
        StudentName: student.firstName,
        Semester: semester.number,
        totalMarks: totalMarks,
        percentage: percentage.toFixed(2),
        GPA: GPA.toFixed(2),
        Status: allPassed ? 'pass' : 'fail',
        results: resultToSave.map( r => ({
            subject: r.subject,
            marks: r.marks,
            grade: r.grade,
            status: r.status,
        })),

    };
} 
    


async getResultByStudent(Rollno: string, semesterNumber?: number){
    const student = await this.studentRepo.findOne({where: {Rollno }});
    if(!student) throw new NotFoundException ('Student not foound');

    const where: any = { student: {id: student.id }}
    let semester;
    if(semesterNumber !== undefined){
        semester = await this.semesterRepo.findOne({ where: { number: semesterNumber } });
        if (!semester) throw new NotFoundException('Semester not found');
        where.semester = { id: semester.id};
    }
    
    const results = await this.resultRepo.find({
        where, relations: ['student','semester'],
    });
    
    if (results.length === 0) throw new NotFoundException('Result not found');

    const gradePoints = {'A': 4, 'B': 3, 'C': 2, 'F': 0};
    let totalMarks = 0;
    let totalGradePoints = 0;
    let allPassed = true;

    
    const resultData= results.map(r  => {
        totalMarks += r.marks;
        totalGradePoints += gradePoints[r.grade];
        if(r.status === 'fail') allPassed = false;

        return{
            subject: r.subject,
            marks: r.marks,
            grade: r.grade,
            status: r.status,
        };
    });

    const percentage = totalMarks / results.length;
    const GPA = totalGradePoints / results.length;
        
  

    return{
        Rollno,
        StudentName: results[0].student.firstName,
        Semester: semester ? semester.number : results[0].semester.number,
        TotalMarks: totalMarks,
        Percentage: percentage.toFixed(2),
        GPA: GPA.toFixed(2),
        Status: allPassed ? 'Pass' : 'Fail',
        results: resultData,
    };
}

async updateResult( data: CreateResultDto){
    const student = await this.studentRepo.findOne({ where: { Rollno: data.Rollno},});
    if (!student) throw new NotFoundException('Student Not Found');

    const semester = await this.semesterRepo.findOne({ where: { number: data.semester},});
    if (!semester) throw new NotFoundException('Semester not found');

    if(!data.subjects || data.subjects.length !== 5){
        throw new BadRequestException ('Five subjects are required');
    }

    const existingResults = await this.resultRepo.find({ where: { student: {id: student.id}, semester:{ id: semester.id},},});
    if(existingResults.length === 0){
        throw new NotFoundException('Result not found to update');
    }

    await this.resultRepo.delete({
        student: {id: student.id},
        semester: {id: semester.id},
    });

    const gradePoints ={ 'A': 4, 'B': 3, 'C': 2, 'F':0};
    let totalMarks = 0;
    let totalGradePoints = 0;
    let allPassed = true;

    const newResults = data.subjects.map(sub => {
        totalMarks += sub.marks;

        const grade =
        sub.marks >= 80 ? 'A':
        sub.marks >= 60 ? 'B':
        sub.marks >= 40 ? 'C': 'F';

        totalGradePoints += gradePoints[grade];

        const status = sub.marks >= 40 ? 'pass' : 'fail';
        if(status === 'fail') allPassed = false;

        return this.resultRepo.create({
            subject: sub.subject,
            marks: sub.marks,
            grade,
            status,
            student,
            semester,
        });

    });
    await this.resultRepo.save(newResults);

    const percentage = totalMarks / 5;
    const GPA = totalGradePoints / 5;

    return{
        message: 'Result update Sucessfully',
        Rollno: student.Rollno,
        StudentName: student.firstName,
        Semester: semester.number,
        TotalMarks: totalMarks,
        Percentage: percentage.toFixed(2),
        GPA: GPA.toFixed(2),
        Status: allPassed ? 'Pass' : 'Fail',
        results: newResults.map(r => ({
            subject: r.subject,
            marks: r.marks,
            grade: r.grade,
            status: r.status,
        })),
    };
};

}
