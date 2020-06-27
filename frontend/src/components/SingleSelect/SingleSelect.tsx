import React from 'react';
import Select from 'react-select';
import { SelectWrapper } from './SingleSelect.style';
import { ISelectedOptionsType } from 'components/MultiSelect/MultiSelect.type';
import { fontFamily } from 'stylesheet';

type PropsType = {
  selectOption: (selectedOption: ISelectedOptionsType) => void;
  options: ISelectedOptionsType[];
  selectedOption: ISelectedOptionsType;
};

export const SingleSelect = (props: PropsType) => {
  const IndicatorSeparator = ({ innerProps }: { innerProps: any }) => {
    return <span />;
  };

  return (
    <SelectWrapper>
      <Select
        defaultValue={props.selectedOption}
        options={props.options}
        onChange={(value: any, action: any) => {
          props.selectOption(value);
        }}
        components={{ IndicatorSeparator }}
        styles={{
          option: styles => ({ ...styles, fontFamily: fontFamily, textAlign: 'end' }),
          valueContainer: styles => ({
            ...styles,
            fontFamily: fontFamily,
            justifyContent: 'flex-end',
          }),
          singleValue: styles => ({ ...styles, overflow: 'visible' }),
          control: styles => ({
            ...styles,
            border: 0,
            boxShadow: 'none',
            '&:hover': { border: 0 },
          }),
          input: styles => ({ ...styles, color: 'transparent' }),
        }}
      />
    </SelectWrapper>
  );
};
