import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/students.module';
import { SemesterModule } from './semester/semester.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceModule } from './attendance/attendance.module';
import { ResultModule } from './result/result.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'maglev.proxy.rlwy.net',
      port: 14766,
      username: 'postgres',
      password: 'dhlLjRVJJOLUbFwAQlQnzueveQWFrmUc',
      database: 'railway',
      autoLoadEntities: true,
      synchronize: true,


    }),
    
    
    StudentModule, SemesterModule, AdminModule, AttendanceModule, ResultModule],
 // controllers: [AppController],
 // providers: [AppService],
})
export class AppModule {}
