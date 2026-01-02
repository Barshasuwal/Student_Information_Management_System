import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Semester } from 'src/semester/entity/semester.entity';
import { Result } from 'src/result/entity/result.entity';
@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  Rollno: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @ManyToOne(() => Semester, semester=> semester.students)
  semester: Semester;

  @OneToMany(()=> Result, result => result.student)
  results: Result[];
}
