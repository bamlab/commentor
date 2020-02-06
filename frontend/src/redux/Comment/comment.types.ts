export type CommentType = {
  id: number;
  body: string;
  filePath: string;
  url: string;
  commentor: string;
  requester: string;
  pullRequestUrl: string;
  repositoryId: number;
  creationDate: Date;
};

export type DevType = string;
