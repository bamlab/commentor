export interface Request {
  cookies: {
    github_access_token?: string;
    gitlab_access_token?: string;
    gitlab_premise_domain?: string;
    gitlab_premise_access_token?: string;
  };
  body: { repositoryIds?: number[] };
}
