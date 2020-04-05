import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as request from 'request-promise';

const checkUserHasAccessToRepo = async (
  repositoryId: string,
  userGithubLogin: string,
  accessToken: string,
): Promise<string> => {
  try {
    Logger.log(`About to check github user ${userGithubLogin} access to repo ${repositoryId}`);
    const githubUserAccessToRepoAnswer = await request({
      uri: `https://api.github.com/repositories/${repositoryId}/collaborators/${userGithubLogin}/permission`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'Request-Promise',
      },
      json: true,
    });

    if (githubUserAccessToRepoAnswer && githubUserAccessToRepoAnswer.permission) {
      Logger.log(
        `Received permission ${
          githubUserAccessToRepoAnswer.permission
        } for user ${userGithubLogin} on repo ${repositoryId}`,
      );
      return repositoryId;
    }
  } catch (error) {
    Logger.error(
      error,
      `Error received while checking permission for user ${userGithubLogin} to repo ${repositoryId}`,
    );
    return;
  }
};

export const GithubRepositoriesFilter = createParamDecorator(async (_, req) => {
  if (req.body.repositoryIds) {
    if (req.body.repositoryIds.length === 0) {
      return [];
    }
    if (req.cookies.access_token) {
      const query = `
          query {
              viewer {
                  login
              }
          }
      `;
      const githubAnswer: any = await request({
        uri: 'https://api.github.com/graphql',
        headers: {
          Authorization: `bearer ${req.cookies.access_token}`,
          'User-Agent': 'Request-Promise',
        },
        method: 'POST',
        json: true,
        body: {
          query,
        },
      });

      const checkedRepositoryIds = await Promise.all(
        req.body.repositoryIds.map((repositoryId: string) =>
          checkUserHasAccessToRepo(
            repositoryId,
            githubAnswer.data.viewer.login,
            req.cookies.access_token,
          ),
        ),
      );
      return checkedRepositoryIds.filter(repositoryId => !!repositoryId);
    } else {
      throw new UnauthorizedException();
    }
  }
});
