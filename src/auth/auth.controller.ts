import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginDTO } from './dto/login.dto';
import { ApiTags,ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: 'Register a new user',
    description: 'This endpoint allows a new user to register by providing their email, password, and other required details.'
  })
  create(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'User login',
    description: 'This endpoint allows a user to login by providing their email and password. Upon successful authentication, a JWT token will be returned for subsequent requests.'
  })
  login(@Body() loginData : LoginDTO) {
    return this.authService.login(loginData);
  }

}
