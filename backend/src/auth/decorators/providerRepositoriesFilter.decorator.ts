import { createParamDecorator, UnauthorizedException, Logger } from '@nestjs/common';

import {
  getLogin as getGithubLogin,
  checkUserHasAccessToRepo as checkUserHasAccessToGithubRepo,
} from '../authenticationProviders/github';
import { checkUserHasAccessToRepo as checkUserHasAccessToGitlabRepo } from '../authenticationProviders/gitlab';

export const ProviderRepositoriesFilter = createParamDecorator(async (_, req) => {
  if (req.body.repositoryIds) {
    if (req.body.repositoryIds.length === 0) {
      return [];
    }
    if (!req.cookies.github_access_token && !req.cookies.gitlab_access_token) {
      throw new UnauthorizedException();
    }
    let filteredRepositoriesIds: number[] = [];
    if (req.cookies.github_access_token) {
      const login = await getGithubLogin(req.cookies);

      const checkedRepositoryIds: number[] = await Promise.all(
        req.body.repositoryIds.map((repositoryId: string) =>
          checkUserHasAccessToGithubRepo(repositoryId, login, req.cookies.github_access_token),
        ),
      );
      filteredRepositoriesIds = filteredRepositoriesIds.concat(
        checkedRepositoryIds.filter(repositoryId => !!repositoryId),
      );
    }
    if (req.cookies.gitlab_access_token) {
      const checkedRepositoryIds: number[] = await Promise.all(
        req.body.repositoryIds.map((repositoryId: string) =>
          checkUserHasAccessToGitlabRepo(repositoryId, req.cookies.gitlab_access_token),
        ),
      );
      Logger.error(checkedRepositoryIds, `Checked repository ids`);
      filteredRepositoriesIds = filteredRepositoriesIds.concat(
        checkedRepositoryIds.filter(repositoryId => !!repositoryId),
      );
    }
    return filteredRepositoriesIds;
  }
});
