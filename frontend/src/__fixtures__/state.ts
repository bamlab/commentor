import { RootState } from 'redux/types';

export const state: RootState = {
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
    availableRequesters: ['amauryw'],
    availableCommentors: ['amauryw'],
    isLoading: true,
    pieChartData: [],
    barChartData: [],
    commentError: null,
  },
  authentication: {
    isLoading: false,
    loginError: null,
    isAuthenticated: false,
  },
  tag: {
    tags: [
      {
        id: 2,
        code: 'refacto',
        color: '#fff',
        description: 'this is refacto done with mistake',
        creationDate: new Date(),
        isDefault: true,
        githubLogin: 'amauryw',
      },
    ],
    isLoading: true,
    tagError: null,
    selectedTagId: null,
  },
  filters: {
    requesterIds: ['amauryw'],
    repositoryIds: [],
    commentorIds: ['amauryw'],
    tagCodes: [],
    startingDate: null,
    endingDate: null,
  },
  repository: {
    repositories: [],
    isLoading: false,
    repositoryError: null,
  },
};
