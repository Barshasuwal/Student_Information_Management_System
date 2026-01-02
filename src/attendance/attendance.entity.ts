import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student)
  student: Student;

  @Column()
  date: Date;

  @Column()
  status: string;
}
