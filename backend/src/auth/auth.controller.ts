import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('accessToken/create')
  async createJwt(@Body() body: { code: string }, @Res() res: Response): Promise<Response> {
    return this.authService.createJwt(body.code, res);
  }

  @Post('accessToken/logout')
  async logout(@Res() res: Response): Promise<Response> {
    return this.authService.logout(res);
  }
}
