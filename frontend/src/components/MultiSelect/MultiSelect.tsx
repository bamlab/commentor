import React from 'react';
import Select from 'react-select';
import { SelectWrapper } from './MultiSelect.style';
import { ISelectedOptionsType } from './MultiSelect.type';

type PropsType = {
  selectedOptions: ISelectedOptionsType[];
  selectOptions: (selectedOptions: ISelectedOptionsType[]) => void;
  options: ISelectedOptionsType[];
};

export const MultiSelect = (props: PropsType) => {
  const selectOptions = (selectedOptions: any) => {
    return props.selectOptions(selectedOptions || []);
  };
  return (
    <SelectWrapper>
      <Select
        value={props.selectedOptions}
        onChange={selectOptions}
        options={props.options}
        isMulti
        isSearchable
      />
    </SelectWrapper>
  );
};
