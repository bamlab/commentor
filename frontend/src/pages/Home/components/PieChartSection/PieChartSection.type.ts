import { PieChartData } from '../../../../redux/Comment';
import { TagType } from '../../../../redux/Tag';

export type PieChartSectionPropsType = {
  tags: TagType[];
  pieChartData: PieChartData[];
};
