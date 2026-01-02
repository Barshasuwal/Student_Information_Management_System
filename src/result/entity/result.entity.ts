import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Semester } from 'src/semester/entity/semester.entity';
@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

 

 //@Column()
 // semester: number;

  @Column()
  subject: string;

  @Column()
  marks: number;

  @Column()
  grade: string;

  @Column()
  status: string;

  @ManyToOne(() => Student, students => students.results)
  student: Student;

  @ManyToOne(() => Semester, semester => semester.students)
  semester: Semester;
}
