import { getParamDecoratorFactory } from './getParamDecoratorFactory';
import { UnauthorizedException } from '@nestjs/common';
import { ProviderRepositoriesFilter } from '../decorators/providerRepositoriesFilter.decorator';

jest.mock('../authenticationProviders/github', () => {
  return {
    checkUserHasAccessToRepo: jest
      .fn()
      .mockImplementation((repositoryId, ...args) =>
        repositoryId % 2 === 1 && repositoryId < 7
          ? Promise.resolve(repositoryId)
          : Promise.resolve(undefined),
      ),

    getLogin: jest.fn().mockImplementation(),
  };
});

jest.mock('../authenticationProviders/gitlab', () => {
  return {
    checkUserHasAccessToRepo: jest
      .fn()
      .mockImplementation((repositoryId, ...args) =>
        repositoryId % 2 === 0 && repositoryId < 7
          ? Promise.resolve(repositoryId)
          : Promise.resolve(undefined),
      ),
  };
});

describe('provider repositories filter decorator', () => {
  const providerRepositoriesfilterFunction = getParamDecoratorFactory(ProviderRepositoriesFilter);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty array if body does not contains repositoryIds', async () => {
    const req = {
      body: {},
      cookies: { cookie: 'cookie' },
    };
    const result = await providerRepositoriesfilterFunction(null, req);
    expect(result).toEqual([]);
  });

  it('returns empty array if repositoryIds is empty', async () => {
    const req: { body: { repositoryIds: any[] }; cookies: { cookie: string } } = {
      body: { repositoryIds: [] },
      cookies: { cookie: 'cookie' },
    };
    const result = await providerRepositoriesfilterFunction(null, req);
    expect(result).toEqual([]);
  });

  it('throw an error if no access token is given', () => {
    const req = {
      body: { repositoryIds: [1, 2, 3, 4, 5, 6, 7, 8] },
      cookies: { cookie: 'cookie' },
    };
    const result = providerRepositoriesfilterFunction(null, req);
    expect(result).rejects.toThrow(UnauthorizedException);
  });

  it('return github repos if github token given', async () => {
    const req = {
      body: { repositoryIds: [1, 2, 3, 4, 5, 6, 7, 8] },
      cookies: { cookie: 'cookie', github_access_token: 'github_access_token' },
    };
    const result = await providerRepositoriesfilterFunction(null, req);

    expect(result).toEqual([1, 3, 5]);
  });

  it('return gitlab repos if gitlab token given', async () => {
    const req = {
      body: { repositoryIds: [1, 2, 3, 4, 5, 6, 7, 8] },
      cookies: { cookie: 'cookie', gitlab_access_token: 'gitlab_access_token' },
    };
    const result = await providerRepositoriesfilterFunction(null, req);

    expect(result).toEqual([2, 4, 6]);
  });

  it('return concactenated repos if both tokens are given', async () => {
    const req = {
      body: { repositoryIds: [1, 2, 3, 4, 5, 6, 7, 8] },
      cookies: {
        cookie: 'cookie',
        github_access_token: 'github_access_token',
        gitlab_access_token: 'gitlab_access_token',
      },
    };
    const result = await providerRepositoriesfilterFunction(null, req);

    expect(result).toEqual([1, 3, 5, 2, 4, 6]);
  });

  it('return empty array if use do not have access to any repo', async () => {
    const req = {
      body: { repositoryIds: [7, 8] },
      cookies: {
        cookie: 'cookie',
        github_access_token: 'github_access_token',
        gitlab_access_token: 'gitlab_access_token',
      },
    };
    const result = await providerRepositoriesfilterFunction(null, req);

    expect(result).toEqual([]);
  });
});
