import { CommentType } from '../../../../redux/Comment';
import { TagType } from '../../../../redux/Tag';

export type PieChartSectionPropsType = {
  tags: TagType[];
  comments: CommentType[];
};
