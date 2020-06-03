import { ProviderRepositories } from '../decorators/providerRepositories.decorator';
import { getParamDecoratorFactory } from './getParamDecoratorFactory';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('../authenticationProviders/github', () => {
  return {
    getRepositories: jest
      .fn()
      .mockImplementation(accessToken =>
        accessToken == 'github_access_token'
          ? Promise.resolve([{ name: 'Github', id: 1 }])
          : Promise.resolve([]),
      ),
  };
});

jest.mock('../authenticationProviders/gitlab', () => {
  return {
    getRepositories: jest
      .fn()
      .mockImplementation(accessToken =>
        accessToken == 'gitlab_access_token'
          ? Promise.resolve([{ name: 'Gitlab', id: 2 }])
          : Promise.resolve([]),
      ),
  };
});

describe('provider repositories decorator', () => {
  const providerRepositoriesFunction = getParamDecoratorFactory(ProviderRepositories);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('throw an error if no access token is given', () => {
    const req = {
      cookies: { cookie: 'cookie' },
    };
    const result = providerRepositoriesFunction(null, req);
    expect(result).rejects.toThrow(UnauthorizedException);
  });

  it('return github repos if github token given', async () => {
    const req = {
      cookies: { cookie: 'cookie', github_access_token: 'github_access_token' },
    };
    const result = await providerRepositoriesFunction(null, req);

    expect(result).toEqual([{ name: 'Github', id: 1 }]);
  });

  it('return gitlab repos if gitlab token given', async () => {
    const req = {
      cookies: { cookie: 'cookie', gitlab_access_token: 'gitlab_access_token' },
    };
    const result = await providerRepositoriesFunction(null, req);

    expect(result).toEqual([{ name: 'Gitlab', id: 2 }]);
  });

  it('can return concatenated repos from all providers if tokens are given', async () => {
    const req = {
      cookies: {
        cookie: 'cookie',
        github_access_token: 'github_access_token',
        gitlab_access_token: 'gitlab_access_token',
      },
    };
    const result = await providerRepositoriesFunction(null, req);

    expect(result).toEqual([{ name: 'Github', id: 1 }, { name: 'Gitlab', id: 2 }]);
  });

  it('return empty array if they are no repos', async () => {
    const req = {
      cookies: {
        cookie: 'cookie',
        github_access_token: 'other_github_token',
        gitlab_access_token: 'other_gitlab_token',
      },
    };
    const result = await providerRepositoriesFunction(null, req);

    expect(result).toEqual([]);
  });
});
