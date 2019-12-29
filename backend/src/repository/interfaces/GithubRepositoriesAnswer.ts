export interface GithubRepositoriesAnswer {
  data: Data;
}

export interface Data {
  viewer: Viewer;
}

export interface Viewer {
  repositories: GithubRepositoriesList;
}

export interface GithubRepositoriesList {
  totalCount: number;
  pageInfo: PageInfo;
  nodes: GithubRepository[];
}

export interface GithubRepository {
  name: string;
  databaseId: number;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}
