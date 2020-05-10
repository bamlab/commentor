import { createParamDecorator } from '@nestjs/common';
import { getLogin as getGithubLogin } from '../authenticationProviders/github';
import { getLogin as getGitlabLogin } from '../authenticationProviders/gitlab';

export const OAuthLogin = createParamDecorator(async (_, req) => {
  if (req.cookies.github_access_token) {
    return getGithubLogin(req.cookies);
  }
  if (req.cookies.gitlab_access_token) {
    return getGitlabLogin(req.cookies);
  }
});
