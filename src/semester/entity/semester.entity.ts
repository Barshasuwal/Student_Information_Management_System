// semester.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Student } from 'src/students/entities/student.entity';

@Entity('semesters')
export class Semester {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number: number; 

  @OneToMany(()=> Student, student=> student.semester)
  students: Student[];
}
