import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { getRepositories as getGithubRepoositories } from '../authenticationProviders/github';
import { getRepositories as getGitlabRepoositories } from '../authenticationProviders/gitlab';

export const ProviderRepositories = createParamDecorator(async (_, req) => {
  let providersRepositories: any[] = [];
  if (req.cookies.github_access_token) {
    const githubRepoositories = await getGithubRepoositories(req.cookies.github_access_token);
    providersRepositories = providersRepositories.concat(githubRepoositories);
  }
  if (req.cookies.gitlab_access_token) {
    const gitlabRepoositories = await getGitlabRepoositories(req.cookies.gitlab_access_token);
    providersRepositories = providersRepositories.concat(gitlabRepoositories);
  }
  if (!req.cookies.github_access_token && !req.cookies.gitlab_access_token) {
    throw new UnauthorizedException();
  }
});
