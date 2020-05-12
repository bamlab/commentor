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
  accessToken: string,
): Promise<string> => {
  try {
    Logger.log(`About to check gitlab access to repo ${repositoryId}`);
    const gitlabUserAccessToRepoAnswer = await request({
      uri: `https://gitlab.com/api/v4/projects/${repositoryId}?min_access_level=10`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'Request-Promise',
      },
      json: true,
    });

    Logger.error(gitlabUserAccessToRepoAnswer, `RESPONSE !`);

    if (
      gitlabUserAccessToRepoAnswer &&
      gitlabUserAccessToRepoAnswer.permissions &&
      gitlabUserAccessToRepoAnswer.permissions.project_access &&
      gitlabUserAccessToRepoAnswer.permissions.project_access.access_level &&
      gitlabUserAccessToRepoAnswer.permissions.project_access.access_level >= 10
    ) {
      Logger.log(
        `Received permission ${gitlabUserAccessToRepoAnswer.permissions} on repo ${repositoryId}`,
      );
      return repositoryId;
    }
  } catch (error) {
    Logger.error(error, `Error received while checking permission to repo ${repositoryId}`);
    return;
  }
};

export const formatComment = (
  commentEvent: any,
): {
  body: string;
  filePath: string;
  url: string;
  commentor: string;
  requester: string;
  pullRequestUrl: string;
  repositoryId: number;
} => {
  if (
    commentEvent.object_attributes &&
    commentEvent.object_attributes.noteable_type &&
    (commentEvent.object_attributes.noteable_type === 'Commit' ||
      commentEvent.object_attributes.noteable_type === 'MergeRequest')
  ) {
    let authorUserName: string = null;
    let commentedObjectUrl: string = null;
    if (commentEvent.object_attributes.noteable_type === 'Commit') {
      authorUserName = commentEvent.commit.author.name;
      commentedObjectUrl = commentEvent.commit.url;
    } else if (commentEvent.object_attributes.noteable_type === 'MergeRequest') {
      authorUserName = commentEvent.merge_request.last_commit.author.name;
      commentedObjectUrl = commentEvent.merge_request.last_commit.url;
    }
    return {
      body: commentEvent.object_attributes.note,
      url: commentEvent.object_attributes.url,
      repositoryId: commentEvent.object_attributes.project_id,
      commentor: commentEvent.user.username,
      pullRequestUrl: commentedObjectUrl,
      requester: authorUserName,
      filePath:
        commentEvent.object_attributes.st_diff && commentEvent.object_attributes.st_diff.newPath
          ? commentEvent.object_attributes.st_diff.newPath
          : 'NA',
    };
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
