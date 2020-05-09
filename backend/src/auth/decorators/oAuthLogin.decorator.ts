import { createParamDecorator } from '@nestjs/common';
import { getLogin as getGithubLogin } from '../authenticationProviders/github';

export const OAuthLogin = createParamDecorator(async (_, req) => {
  return getGithubLogin(req.cookies);
});
