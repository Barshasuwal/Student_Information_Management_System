import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entity/admin.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private adminRepo: Repository<Admin>) {}

  async register(data: RegisterDto) {
    const existing = await this.adminRepo.findOne({ where: {email: data.email } });
    if (existing) throw new BadRequestException('email already exists');

    const hash = await bcrypt.hash(data.password, 10);
    const admin = this.adminRepo.create({username: data.username, email: data.email, password: hash });
    return this.adminRepo.save(admin);
  }

  async login(data: LoginDto) {
    const admin = await this.adminRepo.findOne({ where: {email: data.email } });
    if (!admin) throw new BadRequestException('Invalid username or password');

    const match = await bcrypt.compare(data.password, admin.password);
    if (!match) throw new BadRequestException('password is incorrect');

    return { message: 'Login successful' }; 
  }
}

