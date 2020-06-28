import { Injectable } from '@nestjs/common';
import { generateAccessToken as generateGithubAccessToken } from './authenticationProviders/github';
import { generateAccessToken as generateGitlabAccessToken } from './authenticationProviders/gitlab';

@Injectable()
export class AuthService {
  async generateAccessToken(code: string, provider: string): Promise<string> {
    if (provider === 'github') {
      return generateGithubAccessToken(code);
    } else if (provider === 'gitlab') {
      return generateGitlabAccessToken(code);
    } else if (provider.includes('gitlab-premise')) {
      const insideParenthesesRegexp = /\(([^)]+)\)/;
      const insideParenthesesMatches = insideParenthesesRegexp.exec(provider);
      if (insideParenthesesMatches.length > 0) {
        return generateGitlabAccessToken(code, insideParenthesesMatches[1]);
      }
    } else {
      throw new Error('UNKNOW_PROVIDER');
    }
  }
}
