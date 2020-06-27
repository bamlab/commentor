/* eslint-disable max-lines */

import {
  StateTypeVersion0,
  StateTypeVersion1,
  StateTypeVersion2,
  StateTypeVersion3,
  StateTypeVersion4,
  StateTypeVersion5,
  StateTypeVersion6,
} from './store.migration';

export const version6InitialState: StateTypeVersion6 = {
  comment: {
    comments: [],
    availableRequesters: [],
    availableCommentors: [],
    isLoading: false,
    commentError: null,
    barChartData: [],
    pieChartData: [],
  },
  authentication: {
    isLoading: false,
    loginError: null,
    isAuthenticated: false,
    user: null,
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
    tagCodes: [],
    groupBy: 'day',
  },
  repository: {
    repositories: [],
    isLoading: false,
    repositoryError: null,
  },
};
export const version5InitialState: StateTypeVersion5 = {
  comment: {
    comments: [],
    availableRequesters: [],
    availableCommentors: [],
    isLoading: false,
    commentError: null,
    barChartData: [],
    pieChartData: [],
  },
  authentication: {
    isLoading: false,
    loginError: null,
    isAuthenticated: false,
    user: null,
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
    tagCodes: [],
  },
  repository: {
    repositories: [],
    isLoading: false,
    repositoryError: null,
  },
};

export const version4InitialState: StateTypeVersion4 = {
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
    tagCodes: [],
  },
  repository: {
    repositories: [],
    isLoading: false,
    repositoryError: null,
  },
};

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
