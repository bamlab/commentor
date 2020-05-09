import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import {
  getLogin as getGithubLogin,
  checkUserHasAccessToRepo as checkUserHasAccessToGithubRepo,
} from '../authenticationProviders/github';

export const GithubRepositoriesFilter = createParamDecorator(async (_, req) => {
  if (req.body.repositoryIds) {
    if (req.body.repositoryIds.length === 0) {
      return [];
    }
    if (req.cookies.github_access_token) {
      const login = await getGithubLogin(req.cookies);

      const checkedRepositoryIds = await Promise.all(
        req.body.repositoryIds.map((repositoryId: string) =>
          checkUserHasAccessToGithubRepo(repositoryId, login, req.cookies.github_access_token),
        ),
      );
      return checkedRepositoryIds.filter(repositoryId => !!repositoryId);
    } else {
      throw new UnauthorizedException();
    }
  }
});
