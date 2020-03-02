export interface Tag {
  id: number;
  code: string;
  description: string;
  color: string;
  githubLogin: string;
  created_at: string;
  repositoryId: number | null;
  externalLink: string;
}

export interface InputTag {
  code: string;
  description: string;
  repositoryId: number | null;
  color: string;
  githubLogin: string;
  externalLink: string;
}
