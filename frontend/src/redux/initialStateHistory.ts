import {
  StateTypeVersion0,
  StateTypeVersion1,
  StateTypeVersion2,
  StateTypeVersion3,
} from './store.migration';

export const version3InitialState: StateTypeVersion3 = {
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
    startingDate: null,
    endingDate: null,
    tagIds: [],
  },
  repository: {
    repositories: [],
    isLoading: false,
    repositoryError: null,
  },
};

export const version2InitialState: StateTypeVersion2 = {
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
    tagIds: [],
  },
  repository: {
    repositories: [],
    isLoading: false,
    repositoryError: null,
  },
};

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
