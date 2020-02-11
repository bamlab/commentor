import { RootState } from './types';

export const storeMigrations = {
  0: (state: StateTypeVersion0): StateTypeVersion1 => ({
    ...state,
    comment: {
      ...state.comment,
      availableRequesters: [],
      availableCommentors: [],
    },
    filters: {
      ...state.filters,
      requesterIds: [],
      commentorIds: [],
    },
  }),
};

export type StateTypeVersion1 = {
  comment: {
    comments: {
      id: number;
      body: string;
      filePath: string;
      url: string;
      commentor: string;
      requester: string;
      pullRequestUrl: string;
      repositoryId: number;
      creationDate: Date;
    }[];
    availableRequesters: string[];
    availableCommentors: string[];
    commentError: string | null;
    isLoading: boolean;
  };
  authentication: {
    isAuthenticated: boolean;
    loginError: string | null;
    isLoading: boolean;
  };
  tag: {
    tags: {
      id: number;
      code: string;
      color: string;
      description: string;
      creationDate: Date;
    }[];
    tagError: string | null;
    isLoading: boolean;
    selectedTagId: number | null;
  };
  filters: {
    requesterIds: string[];
    repositoryIds: string[];
    commentorIds: string[];
  };
  repository: {
    repositories: [];
    isLoading: boolean;
    repositoryError: string | null;
  };
};

export type StateTypeVersion0 = {
  comment: {
    comments: {
      id: number;
      body: string;
      filePath: string;
      url: string;
      commentor: string;
      requester: string;
      pullRequestUrl: string;
      repositoryId: number;
      creationDate: Date;
    }[];
    commentError: string | null;
    isLoading: boolean;
  };
  authentication: {
    isAuthenticated: boolean;
    loginError: string | null;
    isLoading: boolean;
  };
  tag: {
    tags: {
      id: number;
      code: string;
      color: string;
      description: string;
      creationDate: Date;
    }[];
    tagError: string | null;
    isLoading: boolean;
    selectedTagId: number | null;
  };
  filters: {
    repositoryIds: string[];
  };
  repository: {
    repositories: [];
    isLoading: boolean;
    repositoryError: string | null;
  };
};
