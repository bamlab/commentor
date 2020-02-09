import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
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
          repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER] ${
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

  console.log('Github answer', githubAnswer);

  const repositoriesList = previousPageRepositories.concat(
    githubAnswer.data.viewer.repositories.nodes,
  );
  const pageInfo = githubAnswer.data.viewer.repositories.pageInfo;
  if (pageInfo.hasNextPage) {
    return queryPaginatedGithubRepositories(userAccessToken, repositoriesList, pageInfo.endCursor);
  }
  return repositoriesList ? repositoriesList : [];
};

export const GithubRepositories = createParamDecorator(async (_, req) => {
  if (req.cookies.access_token) {
    console.log('ACCESS_TOKEN', req.cookies.access_token);
    return queryPaginatedGithubRepositories(req.cookies.access_token);
  } else {
    throw new UnauthorizedException();
  }
});
