import { CommentType } from '../../../../redux/Comment';
import { TagType } from '../../../../redux/Tag';

export type BarChartSectionPropsType = {
  comments: CommentType[];
  tags: TagType[];
};
