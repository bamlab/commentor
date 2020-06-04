import * as request from 'request-promise';
import { Logger } from '@nestjs/common';
import { Repository } from '../interfaces/auth.dto';
import { GithubCommentEvent, GithubSender, Comment } from 'src/comment/interfaces/comment.dto';

export const generateAccessToken = async (code: string): Promise<string> => {
  const githubOauthResponse: GithubOauthTokenAnswer = await request({
    uri: 'https://github.com/login/oauth/access_token',
    method: 'GET',
    qs: {
      code,
      client_id: process.env.GITHUB_APP_CLIENT_ID,
      client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
    },
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  });
  if (githubOauthResponse.access_token) {
    return githubOauthResponse.access_token;
  }
};

export const getLogin = async (cookies: { github_access_token?: string }): Promise<string> => {
  if (cookies.github_access_token) {
    const query = `
            query {
                viewer {
                    login
                }
            }
        `;
    const githubAnswer: GithubLoginAnswer = await request({
      uri: 'https://api.github.com/graphql',
      headers: {
        Authorization: `bearer ${cookies.github_access_token}`,
        'User-Agent': 'Request-Promise',
      },
      method: 'POST',
      json: true,
      body: {
        query,
      },
    });
    return githubAnswer.data.viewer.login;
  }
};

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

  const repositoriesList = previousPageRepositories.concat(
    githubAnswer.data.viewer.repositories.nodes,
  );
  const pageInfo = githubAnswer.data.viewer.repositories.pageInfo;
  if (pageInfo.hasNextPage) {
    return queryPaginatedGithubRepositories(userAccessToken, repositoriesList, pageInfo.endCursor);
  }
  return repositoriesList ? repositoriesList : [];
};

export const getRepositories = async (accessToken: string): Promise<Repository[]> => {
  const githubRepositories = await queryPaginatedGithubRepositories(accessToken);
  return githubRepositories.map((repository: GithubRepository) => ({
    name: repository.name,
    id: repository.databaseId,
  }));
};

export const checkUserHasAccessToRepo = async (
  repositoryId: number,
  userGithubLogin: string,
  accessToken: string,
): Promise<number | undefined> => {
  try {
    Logger.log(`About to check github user ${userGithubLogin} access to repo ${repositoryId}`);
    const githubUserAccessToRepoAnswer: GithubUserAccessToRepoAnswer = await request({
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

export const formatComment = (commentEvent: GithubCommentEvent): Comment => {
  return {
    body: commentEvent.comment.body,
    filePath: commentEvent.comment.path ? commentEvent.comment.path : 'NA',
    url: commentEvent.comment.html_url,
    commentor: commentEvent.comment.user.login,
    requester: commentEvent.pull_request.user.login,
    pullRequestUrl: commentEvent.pull_request.html_url,
    repositoryId: commentEvent.repository.id,
  };
};

interface GithubOauthTokenAnswer {
  access_token: string;
  token_type: string;
  scope: string;
}

interface GithubRepositoriesAnswer {
  data: {
    viewer: {
      repositories: {
        totalCount: number;
        pageInfo: PageInfo;
        nodes: GithubRepository[];
      };
    };
  };
}

interface GithubRepository {
  name: string;
  databaseId: number;
}

interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

interface GithubLoginAnswer {
  data: {
    viewer: {
      login: string;
    };
  };
}

interface GithubUserAccessToRepoAnswer {
  permission: string;
  user: GithubSender;
}
