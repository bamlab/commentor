import React from 'react';
import Select from 'react-select';
import { SelectWrapper } from './MultiSelect.style';
import { ISelectedOptionsType } from '../../redux/Filters/filters.type';

type PropsType = {
  selectedOptions: ISelectedOptionsType[];
  selectOptions: () => void;
  options: ISelectedOptionsType[];
};

export const MultiSelect = (props: PropsType) => {
  return (
    <SelectWrapper>
      <Select
        value={props.selectedOptions}
        onChange={props.selectOptions}
        options={props.options}
        isMulti
        isSearchable
      />
    </SelectWrapper>
  );
};
