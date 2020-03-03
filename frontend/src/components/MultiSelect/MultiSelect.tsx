import React from 'react';
import Select from 'react-select';
import { SelectWrapper } from './MultiSelect.style';
import { fontFamily } from 'stylesheet';
import { ISelectedOptionsType } from './MultiSelect.type';

type PropsType = {
  isLoading?: boolean;
  selectedOptions: ISelectedOptionsType[];
  selectOptions: (selectedOptions: ISelectedOptionsType[]) => void;
  options: ISelectedOptionsType[];
  placeholder: string;
};

export const MultiSelect = (props: PropsType) => {
  const selectOptions = (selectedOptions: any) => {
    return props.selectOptions(selectedOptions || []);
  };
  const getOptions = (): ISelectedOptionsType[] => {
    if (props.isLoading) return [{ value: 'loading', label: '💭Loading...' }];
    return props.options;
  };
  return (
    <SelectWrapper>
      <Select
        value={props.selectedOptions}
        onChange={selectOptions}
        options={getOptions()}
        placeholder={props.placeholder}
        isMulti
        isSearchable
        menuPortalTarget={document.body}
        styles={{
          option: styles => ({ ...styles, fontFamily: fontFamily.main }),
          control: styles => ({ ...styles, fontFamily: fontFamily.main }),
          multiValue: styles => ({ ...styles, fontFamily: fontFamily.main }),
          multiValueLabel: styles => ({ ...styles, fontFamily: fontFamily.main }),
          noOptionsMessage: styles => ({ ...styles, fontFamily: fontFamily.main }),
          menuList: styles => ({ ...styles, fontFamily: fontFamily.main }),
          menu: styles => ({ ...styles, fontFamily: fontFamily.main }),
          multiValueRemove: styles => ({ ...styles, fontFamily: fontFamily.main }),
          menuPortal: styles => ({ ...styles, fontFamily: fontFamily.main }),
        }}
      />
    </SelectWrapper>
  );
};
