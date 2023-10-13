import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  Register(@Body() user: RegisterUserDto) {
    return this.authService.registerUser(user);
  }
  @Post('login')
  Login(@Body() user: LoginUserDto) {
    return this.authService.loginUser(user);
  }
}
