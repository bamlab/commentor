import { CommentType } from '../../../../redux/Comment';
import { TagType } from '../../../../redux/Tag';

export type BarChartCartPropsType = {
  comments: CommentType[];
  tags: TagType[];
};
