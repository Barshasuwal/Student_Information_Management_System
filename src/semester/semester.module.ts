import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';
import { Semester } from './entity/semester.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Semester])], // ✅ Important
  providers: [SemesterService],
  controllers: [SemesterController],
})
export class SemesterModule {}
