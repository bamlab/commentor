import { createParamDecorator } from '@nestjs/common';
import { GithubLoginAnswer } from '../interfaces/GithubAnswer';
import * as request from 'request-promise';

export const GithubLogin = createParamDecorator(async (_, req) => {
  console.log('Access Token in Github login decorator', req.cookies.access_token);
  if (req.cookies.access_token) {
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
        Authorization: `bearer ${req.cookies.access_token}`,
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
});
