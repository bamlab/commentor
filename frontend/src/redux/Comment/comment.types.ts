import { TagType } from '../../redux/Tag';

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

export type RequesterType = string;
export type CommentorType = string;

export type PieChartData = { x: number | string; y: number; tag: TagType };
