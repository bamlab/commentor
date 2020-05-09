import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { OAuthLogin } from './decorators/oAuthLogin.decorator';

const AUTHENTICATION_PROVIDER_STORAGE_KEYS = {
  GITLAB: 'gitlab_access_token',
  GITHUB: 'github_access_token',
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('accessToken/create')
  async createJwt(
    @Body() body: { code: string; provider: 'github' | 'gitlab' },
    @Res() res: Response,
  ) {
    const accessToken = await this.authService.generateAccessToken(body.code, body.provider);
    if (accessToken) {
      switch (body.provider) {
        case 'gitlab':
          res.cookie(AUTHENTICATION_PROVIDER_STORAGE_KEYS.GITLAB, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          });
        case 'github':
          res.cookie(AUTHENTICATION_PROVIDER_STORAGE_KEYS.GITHUB, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          });
        default:
          res.send();
      }
    }

    res.send();
  }

  @Get('user')
  async getMe(@OAuthLogin() oAuthLogin: string) {
    return {
      oAuthLogin,
    };
  }

  @Post('accessToken/logout')
  async logout(@Res() res: Response) {
    res.clearCookie(AUTHENTICATION_PROVIDER_STORAGE_KEYS.GITHUB);
    res.clearCookie(AUTHENTICATION_PROVIDER_STORAGE_KEYS.GITLAB);
    res.sendStatus(200);
  }
}
