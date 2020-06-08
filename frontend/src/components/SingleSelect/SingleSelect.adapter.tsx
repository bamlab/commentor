import { GroupByType } from 'redux/Filters/filters.type';
import { ISelectedOptionsType } from 'components/MultiSelect/MultiSelect.type';

export const adaptGroupByToSingleSelectOptions = (groupBy: GroupByType): ISelectedOptionsType => {
  return {
    value: groupBy,
    label: `Show by ${groupBy}`,
  };
};
