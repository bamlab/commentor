import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { getRepositories as getGithubRepositories } from '../authenticationProviders/github';
import { getRepositories as getGitlabRepositories } from '../authenticationProviders/gitlab';

export const ProviderRepositories = createParamDecorator(async (_, req) => {
  if (!req.cookies.github_access_token && !req.cookies.gitlab_access_token) {
    throw new UnauthorizedException();
  }
  let providersRepositories: any[] = [];
  if (req.cookies.github_access_token) {
    const githubRepositories = await getGithubRepositories(req.cookies.github_access_token);
    providersRepositories = providersRepositories.concat(githubRepositories);
  }
  if (req.cookies.gitlab_access_token) {
    const gitlabRepositories = await getGitlabRepositories(req.cookies.gitlab_access_token);
    providersRepositories = providersRepositories.concat(gitlabRepositories);
  }
  return providersRepositories;
});