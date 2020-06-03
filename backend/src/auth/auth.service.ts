import { Injectable } from '@nestjs/common';
import { generateAccessToken as generateGithubAccessToken } from './authenticationProviders/github';
import { generateAccessToken as generateGitlabAccessToken } from './authenticationProviders/gitlab';

@Injectable()
export class AuthService {
  async generateAccessToken(code: string, provider: 'gitlab' | 'github'): Promise<string> {
    switch (provider) {
      case 'gitlab':
        return generateGitlabAccessToken(code);
      case 'github':
        return generateGithubAccessToken(code);
      default:
        throw new Error('UNKNOW_PROVIDER');
    }
  }
}
