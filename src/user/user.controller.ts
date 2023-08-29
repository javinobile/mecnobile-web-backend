// src/user/user.controller.ts

import { Controller, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger'; // Add these lines
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
@ApiTags('user') // Add this decorator
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  async signUp(@Body() createUserDto: CreateUserDto) {
    //return await this.userService.signUp(createUserDto);
  }

}

