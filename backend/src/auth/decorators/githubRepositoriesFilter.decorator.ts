import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import * as request from 'request-promise';

const checkUserHasAccessToRepo = async (
  repositoryId: string,
  userGithubLogin: string,
  accessToken: string,
): Promise<string> => {
  try {
    console.log('ABOUT TO QUERY PERMISSION FOR REPO', repositoryId);
    console.log('ABOUT TO QUERY PERMISSION WITH LOGIN', userGithubLogin);
    console.log('ABOUT TO QUERY PERMISSION WITH ACCESS TOKEN', accessToken);
    const githubUserAccessToRepoAnswer = await request({
      uri: `https://api.github.com/repositories/${repositoryId}/collaborators/${userGithubLogin}/permission`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'Request-Promise',
      },
    });

    console.log(`RECEIVED ANSWER for repo ${repositoryId}`, githubUserAccessToRepoAnswer);

    if (githubUserAccessToRepoAnswer && githubUserAccessToRepoAnswer.permission) {
      console.log(
        `FOUND PERMISSION for repo ${repositoryId}`,
        githubUserAccessToRepoAnswer.permission,
      );
      return repositoryId;
    }
  } catch (error) {
    console.log(`ERROR for repo ${repositoryId}`, error);
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
