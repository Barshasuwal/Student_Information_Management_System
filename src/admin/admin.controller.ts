import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register admin with username & password' })
  register(@Body() dto: RegisterDto) {
    return this.adminService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login admin using username & password' })
  login(@Body() dto: LoginDto) {
    return this.adminService.login(dto);
  }
}
