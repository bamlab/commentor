import * as request from 'request-promise';
import { Logger } from '@nestjs/common';

export const generateAccessToken = async (code: string): Promise<string> => {
  const gitlabOauthResponse = await request({
    uri: 'https://gitlab.com/oauth/token',
    method: 'POST',
    body: {
      client_id: process.env.GITLAB_APP_CLIENT_ID,
      client_secret: process.env.GITLAB_APP_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.OAUTH_REDIRECT_URL,
    },
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  });
  if (gitlabOauthResponse.access_token) {
    return gitlabOauthResponse.access_token;
  }
};

export const getLogin = async (cookies: { gitlab_access_token?: string }): Promise<string> => {
  if (cookies.gitlab_access_token) {
    const query = `
            query {
              currentUser {
                    username
                }
            }
        `;
    const gitlabAnswer: GitlabLoginAnswer = await request({
      uri: 'https://gitlab.com/api/graphql',
      headers: {
        Authorization: `bearer ${cookies.gitlab_access_token}`,
        'User-Agent': 'Request-Promise',
      },
      method: 'POST',
      json: true,
      body: {
        query,
      },
    });
    return gitlabAnswer.data.currentUser.username;
  }
};

// const queryPaginatedGitlabRepositories = async (
//   userAccessToken: string,
//   previousPageRepositories: GitlabRepository[] = [],
//   previousPageCursor?: string,
// ): Promise<GitlabRepository[]> => {
//   const query = `
//         query {
//           viewer {
//             repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER] ${
//               previousPageCursor ? `, after:"${previousPageCursor}"` : ''
//             }) {
//               totalCount
//               pageInfo {
//                 endCursor
//                 hasNextPage
//               }
//               nodes {
//                 databaseId,
//                 name
//               }
//             }
//           }
//         }
//       `;

//   const gitlabAnswer: GitlabRepositoriesAnswer = await request({
//     uri: 'https://api.gitlab.com/graphql',
//     headers: {
//       Authorization: `bearer ${userAccessToken}`,
//       'User-Agent': 'Request-Promise',
//     },
//     method: 'POST',
//     json: true,
//     body: {
//       query,
//     },
//   });

//   const repositoriesList = previousPageRepositories.concat(
//     gitlabAnswer.data.viewer.repositories.nodes,
//   );
//   const pageInfo = gitlabAnswer.data.viewer.repositories.pageInfo;
//   if (pageInfo.hasNextPage) {
//     return queryPaginatedGitlabRepositories(userAccessToken, repositoriesList, pageInfo.endCursor);
//   }
//   return repositoriesList ? repositoriesList : [];
// };

export const getRepositories = async (
  accessToken: string,
): Promise<Array<{ name: string; id: number }>> => {
  const gitlabRepositoriesAnswer = await request({
    uri: `https://gitlab.com/api/v4/projects?min_access_level=10`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'Request-Promise',
    },
    json: true,
  });

  return gitlabRepositoriesAnswer.map((repository: { name: string; id: number }) => ({
    name: repository.name,
    id: repository.id,
  }));
};

export const checkUserHasAccessToRepo = async (
  repositoryId: string,
  userGitlabLogin: string,
  accessToken: string,
): Promise<string> => {
  try {
    Logger.log(`About to check github user ${userGitlabLogin} access to repo ${repositoryId}`);
    const gitlabUserAccessToRepoAnswer = await request({
      uri: `https://api.github.com/repositories/${repositoryId}/collaborators/${userGitlabLogin}/permission`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'Request-Promise',
      },
      json: true,
    });

    if (gitlabUserAccessToRepoAnswer && gitlabUserAccessToRepoAnswer.permission) {
      Logger.log(
        `Received permission ${
          gitlabUserAccessToRepoAnswer.permission
        } for user ${userGitlabLogin} on repo ${repositoryId}`,
      );
      return repositoryId;
    }
  } catch (error) {
    Logger.error(
      error,
      `Error received while checking permission for user ${userGitlabLogin} to repo ${repositoryId}`,
    );
    return;
  }
};

interface GitlabRepository {
  truc: string;
}

interface GitlabRepositoriesAnswer {
  machin: string;
}

interface GitlabLoginAnswer {
  data: {
    currentUser: {
      username: string;
    };
  };
}
