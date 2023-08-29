import { Body, ConflictException, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { LoginResponseSwagger } from 'src/user/swagger/user.swagger';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged in successfully', type: LoginResponseSwagger }) // Add this decorator
  signIn(@Body() createUserDto: CreateUserDto) {
    return this.authService.signIn(createUserDto.email, createUserDto.password);
  }

  @Post('signup')
  @HttpCode(201)
  @ApiResponse({
    status: HttpStatus.CREATED, description: 'User registered successfully'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already Exists',
  })
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error // This exception triggers a 409 Conflict response
      }
      throw error; // Rethrow other errors
    }

  }
}
