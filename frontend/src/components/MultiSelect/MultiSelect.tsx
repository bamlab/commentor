import React from 'react';
import Select from 'react-select';
import { SelectWrapper } from './MultiSelect.style';
import { ISelectedOptionsType } from '../../redux/Filters/filters.type';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

type PropsType = {
  selectedOptions: ISelectedOptionsType[];
  selectOptions: () => void;
};

export const MultiSelect = (props: PropsType) => {
  return (
    <SelectWrapper>
      <Select
        value={props.selectedOptions}
        onChange={props.selectOptions}
        options={options}
        isMulti
        isSearchable
      />
    </SelectWrapper>
  );
};
