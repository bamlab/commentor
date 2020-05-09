import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { getRepositories as getGithubRepoositories } from '../authenticationProviders/github';

export const GithubRepositories = createParamDecorator(async (_, req) => {
  if (req.cookies.github_access_token) {
    return getGithubRepoositories(req.cookies.github_access_token);
  } else {
    throw new UnauthorizedException();
  }
});
