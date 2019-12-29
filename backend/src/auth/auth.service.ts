import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as request from 'request-promise';

const ACCESS_TOKEN_COOKIE_KEY = 'access_token';
const IS_AUTHENTIFIED_COOKIE_KEY = 'is_authentified';

@Injectable()
export class AuthService {
  logout(res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
    res.clearCookie(IS_AUTHENTIFIED_COOKIE_KEY);
    return res.sendStatus(200);
  }

  async createJwt(code: string, res: Response) {
    const githubOauthResponse = await request({
      uri: 'https://github.com/login/oauth/access_token',
      method: 'GET',
      qs: {
        code,
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
}
