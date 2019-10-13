import { RootState } from 'redux/types';

export const state: RootState = {
  login: {
    token: 'someToken',
    loginError: 'some login error message',
  },
  comment: {
    comments: [
      {
        id: 2,
        body: 'ed',
        filePath: 'weff',
        url: 'wffew',
        commentor: 'Amaury',
        requester: 'wfwef',
        pullRequestUrl: 'ewffew',
        repositoryId: 31312,
        creationDate: new Date(),
      },
    ],
    isLoading: true,
    commentError: null,
  },
  tag: {
    tags: [
      {
        id: 2,
        code: 'refacto',
        description: 'this is refacto done with mistake',
        creationDate: new Date(),
      },
    ],
    isLoading: true,
    tagError: null,
    selectedTagId: null,
  },
};
