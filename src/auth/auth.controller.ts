import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: any) {
    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(await this.authService.validateUser(loginDto.email, loginDto.password));
  }

  @Post('refresh/:userId')
  async refreshToken(
    @Param('userId') userId: string,
    @Body() body: { refreshToken: string },
  ) {
    return this.authService.refreshToken(userId, body.refreshToken);
  }

  @Post('logout/:userId')
  async logout(@Param('userId') userId: string) {
    return this.authService.logout(userId);
  }
}
