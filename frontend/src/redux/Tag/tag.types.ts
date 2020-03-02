export type TagType = {
  id: number;
  code: string;
  color: string;
  description: string;
  githubLogin: string | null;
  repositoryId: number | null;
  externalLink: string;
  creationDate: Date;
  isDefault: boolean;
};
