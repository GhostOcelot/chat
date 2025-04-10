import { Body, Controller, Post } from '@nestjs/common';
import { AuthBody, AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: AuthBody) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: AuthBody) {
    return this.authService.login(body);
  }
}
