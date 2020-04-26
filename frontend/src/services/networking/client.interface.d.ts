import { TagsOverTimeType } from '../../redux/GraphData';

export interface FetchedCommentType {
  id: number;
  body: string;
  filePath: string;
  url: string;
  commentor: string;
  requester: string;
  pullRequestUrl: string;
  repositoryId: number;
  creationDate: Date | string;
}

export type FetchedTagsOverTime = TagsOverTimeType;
