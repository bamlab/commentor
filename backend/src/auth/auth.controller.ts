import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { OAuthLogin } from './decorators/oAuthLogin.decorator';

const AUTHENTICATION_PROVIDER_STORAGE_KEYS = {
  GITLAB: 'gitlab_access_token',
  GITLAB_PREMISE_DOMAIN: 'gitlab_premise_domain',
  GITLAB_PREMISE_TOKEN: 'gitlab_premise_access_token',
  GITHUB: 'github_access_token',
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('accessToken/create')
  async createJwt(@Body() body: { code: string; provider: string }, @Res() res: Response) {
    const accessToken = await this.authService.generateAccessToken(body.code, body.provider);
    if (accessToken) {
      if (body.provider) {
        if (body.provider === 'github') {
          res.cookie(AUTHENTICATION_PROVIDER_STORAGE_KEYS.GITHUB, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          });
        } else if (body.provider === 'gitlab') {
          res.cookie(AUTHENTICATION_PROVIDER_STORAGE_KEYS.GITLAB, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          });
        } else if (body.provider.includes('gitlab-premise')) {
          res.cookie(AUTHENTICATION_PROVIDER_STORAGE_KEYS.GITLAB_PREMISE_TOKEN, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          });
          const insideParenthesesRegexp = /\(([^)]+)\)/;
          const insideParenthesesMatches = insideParenthesesRegexp.exec(body.provider);

          if (insideParenthesesMatches.length > 0) {
            res.cookie(
              AUTHENTICATION_PROVIDER_STORAGE_KEYS.GITLAB_PREMISE_DOMAIN,
              insideParenthesesMatches[1],
              {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
              },
            );
          }
        }
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
    res.clearCookie(AUTHENTICATION_PROVIDER_STORAGE_KEYS.GITLAB_PREMISE_DOMAIN);
    res.clearCookie(AUTHENTICATION_PROVIDER_STORAGE_KEYS.GITLAB_PREMISE_TOKEN);
    res.sendStatus(200);
  }
}
