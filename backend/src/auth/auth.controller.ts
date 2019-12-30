import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

const ACCESS_TOKEN_COOKIE_KEY = 'access_token';
const IS_AUTHENTIFIED_COOKIE_KEY = 'is_authentified';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('accessToken/create')
  async createJwt(@Body() body: { code: string }, @Res() res: Response) {
    const accessToken = await this.authService.createJwt(body.code);
    if (accessToken) {
      res.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      res.cookie(IS_AUTHENTIFIED_COOKIE_KEY, true, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      });
    }
    res.send();
  }

  @Post('accessToken/logout')
  async logout(@Res() res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
    res.clearCookie(IS_AUTHENTIFIED_COOKIE_KEY);
    res.sendStatus(200);
  }
}
