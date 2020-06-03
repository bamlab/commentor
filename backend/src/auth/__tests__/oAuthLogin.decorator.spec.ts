import { OAuthLogin } from '../decorators/oAuthLogin.decorator';
import { getParamDecoratorFactory } from './getParamDecoratorFactory';

jest.mock('../authenticationProviders/gitlab', () => {
  return {
    getLogin: jest.fn().mockImplementation((cookies: any) => {
      return { ...cookies, answer: 'gitlab' };
    }),
  };
});

jest.mock('../authenticationProviders/github', () => {
  return {
    getLogin: jest.fn().mockImplementation((cookies: any) => {
      return { ...cookies, answer: 'github' };
    }),
  };
});

describe('oAuth Login decorator', () => {
  const oAuthLoginFunction = getParamDecoratorFactory(OAuthLogin);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('call github login if has github access token', async () => {
    const req = {
      cookies: { github_access_token: 'github_access_token', other_cookie: 'github cookie' },
    };
    const result = await oAuthLoginFunction(null, req);
    expect(result).toStrictEqual({
      github_access_token: 'github_access_token',
      other_cookie: 'github cookie',
      answer: 'github',
    });
  });

  it('call gitlab login if has gitlab access token', async () => {
    const req = {
      cookies: { gitlab_access_token: 'gitlab_access_token', other_cookie: 'gitlab cookie' },
    };
    const result = await oAuthLoginFunction(null, req);
    expect(result).toStrictEqual({
      gitlab_access_token: 'gitlab_access_token',
      other_cookie: 'gitlab cookie',
      answer: 'gitlab',
    });
  });

  it('call github login in priority if has both tokens', async () => {
    const req = {
      cookies: {
        github_access_token: 'github_access_token',
        gitlab_access_token: 'gitlab_access_token',
      },
    };
    const result = await oAuthLoginFunction(null, req);
    expect(result).toStrictEqual({
      github_access_token: 'github_access_token',
      gitlab_access_token: 'gitlab_access_token',
      answer: 'github',
    });
  });

  it('return undefined if no token is given', async () => {
    const req = {
      cookies: {
        other_cookie: 'cookie',
      },
    };
    const result = await oAuthLoginFunction(null, req);
    expect(result).toBe(undefined);
  });
});
