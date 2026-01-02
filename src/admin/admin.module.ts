import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entity/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])], 
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
