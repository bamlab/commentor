import { StateTypeVersion0, StateTypeVersion1 } from './store.migration';

export const version1InitialState: StateTypeVersion1 = {
  comment: {
    comments: [],
    availableRequesters: [],
    availableCommentors: [],
    isLoading: false,
    commentError: null,
  },
  authentication: {
    isLoading: false,
    loginError: null,
    isAuthenticated: false,
  },
  tag: {
    tags: [],
    isLoading: false,
    tagError: null,
    selectedTagId: null,
  },
  filters: {
    requesterIds: [],
    repositoryIds: [],
    commentorIds: [],
  },
  repository: {
    repositories: [],
    isLoading: false,
    repositoryError: null,
  },
};

export const version0InitialState: StateTypeVersion0 = {
  comment: {
    comments: [],
    isLoading: false,
    commentError: null,
  },
  authentication: {
    isLoading: false,
    loginError: null,
    isAuthenticated: false,
  },
  tag: {
    tags: [],
    isLoading: false,
    tagError: null,
    selectedTagId: null,
  },
  filters: {
    repositoryIds: [],
  },
  repository: {
    repositories: [],
    isLoading: false,
    repositoryError: null,
  },
};
