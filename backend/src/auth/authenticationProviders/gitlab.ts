import * as request from 'request-promise';

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
