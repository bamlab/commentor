import * as request from 'request-promise';

import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

const ACCESS_TOKEN_COOKIE_KEY = 'access_token';
const IS_AUTHENTIFIED_COOKIE_KEY = 'is_authentified';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('accessToken/create')
  async createJwt(@Body() body: { code: string }, @Res() res: Response): Promise<Response> {
    const githubOauthResponse = await request({
      uri: 'https://github.com/login/oauth/access_token',
      method: 'GET',
      qs: {
        code: body.code,
        client_id: process.env.GITHUB_APP_CLIENT_ID,
        client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
      },
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    });
    if (githubOauthResponse.access_token) {
      res.cookie(ACCESS_TOKEN_COOKIE_KEY, githubOauthResponse.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      res.cookie(IS_AUTHENTIFIED_COOKIE_KEY, true, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      });
    }

    return res.send();
  }

  @Post('accessToken/logout')
  async logout(@Res() res: Response): Promise<Response> {
    res.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
    res.clearCookie(IS_AUTHENTIFIED_COOKIE_KEY);
    return res.sendStatus(200);
  }
}
