import { Injectable } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class AuthService {
  async createJwt(code: string): Promise<string> {
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
    console.log('GITHUB OAUTH RESPONSE', githubOauthResponse);
    if (githubOauthResponse.access_token) {
      return githubOauthResponse.access_token;
    }
  }
}
