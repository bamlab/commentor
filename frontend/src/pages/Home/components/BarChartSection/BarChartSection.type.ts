import { BarChartData } from '../../../../redux/Comment';
import { GroupByType } from 'redux/Filters/filters.type';

export interface BarChartSectionPropsType {
  barChartData: BarChartData[];
  groupBy: GroupByType;
}
