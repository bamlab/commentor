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

export interface PieChartData {
  x: number | string;
  y: number;
  tag: TagType;
}
export interface BarChartData {
  x: Date;
  y: number;
  y0: number;
  tag: TagType;
}
