export interface Repository {
  name: string;
  id: number;
}

export interface Request {
  cookies: { github_access_token?: string; gitlab_access_token?: string };
  body: { repositoryIds?: number[] };
}
