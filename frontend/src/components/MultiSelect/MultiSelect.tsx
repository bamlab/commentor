import React, { useState } from 'react';
import Select, { components } from 'react-select';
import {
  SelectWrapper,
  SelectModalOverlay,
  IconAndTitleContainer,
  Title,
  Icon,
} from './MultiSelect.style';
import { fontFamily } from 'stylesheet';
import { ISelectedOptionsType } from './MultiSelect.type';

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <input type="checkbox" checked={props.isSelected} onChange={() => null} />{' '}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

type PropsType = {
  isLoading?: boolean;
  selectedOptions: ISelectedOptionsType[];
  selectOptions: (selectedOptions: ISelectedOptionsType[]) => void;
  options: ISelectedOptionsType[];
  placeholder: string;
  icon: string;
  title: string;
};

export const MultiSelect = (props: PropsType) => {
  const [isSelectDisplayed, setIsSelectDisplayed] = useState(false);
  const selectOptions = (selectedOptions: any) => {
    return props.selectOptions(selectedOptions || []);
  };
  const getOptions = (): ISelectedOptionsType[] => {
    if (props.isLoading) return [{ value: 'loading', label: '💭Loading...' }];
    return props.options;
  };
  return (
    <div>
      <IconAndTitleContainer
        selected={isSelectDisplayed}
        onClick={() => setIsSelectDisplayed(!isSelectDisplayed)}
      >
        <Icon src={props.icon} />
        <Title selected={isSelectDisplayed}>{props.title}</Title>
      </IconAndTitleContainer>
      {isSelectDisplayed && (
        <SelectWrapper>
          <SelectModalOverlay onClick={() => setIsSelectDisplayed(false)} />
          <Select
            menuIsOpen={true}
            autoFocus={true}
            value={props.selectedOptions}
            onChange={selectOptions}
            options={getOptions()}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option,
            }}
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
      )}
    </div>
  );
};
