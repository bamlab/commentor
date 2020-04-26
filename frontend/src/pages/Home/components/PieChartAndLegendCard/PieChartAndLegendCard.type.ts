import { CommentType } from '../../../../redux/Comment';
import { TagType } from '../../../../redux/Tag';

export type PieChartAndLegendCardPropsType = {
  tags: TagType[];
  comments: CommentType[];
};
