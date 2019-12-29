import { createParamDecorator } from '@nestjs/common';
import * as request from 'request-promise';
import { GithubRepositoriesAnswer, GithubRepository } from '../interfaces/GithubRepositoriesAnswer';

const queryPaginatedGithubRepositories = async (
  userAccessToken: string,
  previousPageRepositories: GithubRepository[] = [],
  previousPageCursor?: string,
): Promise<GithubRepository[]> => {
  const query = `
    query {
      viewer {
        repositories(first: 100, ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER] ${
          previousPageCursor ? `, after:"${previousPageCursor}"` : ''
        }) {
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            databaseId,
            name
          }
        }
      }
    }
  `;

  const githubAnswer: GithubRepositoriesAnswer = await request({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `bearer ${userAccessToken}`,
      'User-Agent': 'Request-Promise',
    },
    method: 'POST',
    json: true,
    body: {
      query,
    },
  });

  const repositoriesList = previousPageRepositories.concat(
    githubAnswer.data.viewer.repositories.nodes,
  );
  const pageInfo = githubAnswer.data.viewer.repositories.pageInfo;
  if (pageInfo.hasNextPage) {
    return queryPaginatedGithubRepositories(userAccessToken, repositoriesList, pageInfo.endCursor);
  }
  return repositoriesList;
};

export const GithubRepositories = createParamDecorator(async (_, req) => {
  if (req.cookies.access_token) {
    return queryPaginatedGithubRepositories(req.cookies.access_token);
  }
});