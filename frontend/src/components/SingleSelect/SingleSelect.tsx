import React, { useState } from 'react';
import Select from 'react-select';
import { SelectWrapper } from './SingleSelect.style';
import { ISelectedOptionsType } from 'components/MultiSelect/MultiSelect.type';

type PropsType = {
  selectOption: (selectedOption: ISelectedOptionsType) => void;
  options: ISelectedOptionsType[];
  selectedOption: ISelectedOptionsType;
};

export const SingleSelect = (props: PropsType) => {
  return (
    <SelectWrapper>
      <Select
        defaultValue={props.selectedOption}
        options={props.options}
        onChange={(value: any, action: any) => {
          props.selectOption(value);
        }}
      />
    </SelectWrapper>
  );
};
