import { TagsOverTimeType } from './GraphData';

export const storeMigrations = {
  1: (state: StateTypeVersion0): StateTypeVersion1 => ({
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
  2: (state: StateTypeVersion1): StateTypeVersion2 => ({
    ...state,
    filters: {
      ...state.filters,
      tagIds: [],
    },
  }),
  3: (state: StateTypeVersion2): StateTypeVersion3 => ({
    ...state,
    filters: {
      ...state.filters,
      startingDate: null,
      endingDate: null,
    },
  }),
  4: (state: StateTypeVersion3): StateTypeVersion4 => ({
    ...state,
    filters: {
      requesterIds: state.filters.requesterIds,
      repositoryIds: state.filters.repositoryIds,
      commentorIds: state.filters.commentorIds,
      startingDate: state.filters.startingDate,
      endingDate: state.filters.endingDate,
      tagCodes: [],
    },
  }),
  5: (state: StateTypeVersion4): StateTypeVersion5 => ({
    ...state,
    graphData: {
      tagsOverTime: [],
      tagsOverTimeError: null,
      isLoading: false,
    },
  }),
};
export type StateTypeVersion5 = {
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
    tagCodes: string[];
    startingDate: Date | null;
    endingDate: Date | null;
  };
  repository: {
    repositories: [];
    isLoading: boolean;
    repositoryError: string | null;
  };
  graphData: {
    tagsOverTime: TagsOverTimeType;
    tagsOverTimeError: string | null;
    isLoading: boolean;
  };
};

export type StateTypeVersion4 = {
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
    tagCodes: string[];
    startingDate: Date | null;
    endingDate: Date | null;
  };
  repository: {
    repositories: [];
    isLoading: boolean;
    repositoryError: string | null;
  };
};

export type StateTypeVersion3 = {
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
    tagIds: string[];
    startingDate: Date | null;
    endingDate: Date | null;
  };
  repository: {
    repositories: [];
    isLoading: boolean;
    repositoryError: string | null;
  };
};

export type StateTypeVersion2 = {
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
    tagIds: string[];
  };
  repository: {
    repositories: [];
    isLoading: boolean;
    repositoryError: string | null;
  };
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
