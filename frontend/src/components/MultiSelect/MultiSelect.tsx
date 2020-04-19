import React, { useState } from 'react';
import Select, { components } from 'react-select';
import {
  SelectWrapper,
  SelectModalOverlay,
  IconAndTitleContainer,
  Title,
  Icon,
  Badge,
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
  refreshData: () => void;
  placeholder: string;
  icon: string;
  title: string;
};

export const MultiSelect = (props: PropsType) => {
  const [isSelectDisplayed, setIsSelectDisplayed] = useState(false);
  const [locallySelectedOptions, locallySelectOptions] = useState(props.selectedOptions);

  const selectOptions = (selectedOptions: any) => {
    return locallySelectOptions(selectedOptions || []);
  };

  const getOptions = (): ISelectedOptionsType[] => {
    if (props.isLoading) return [{ value: 'loading', label: '💭Loading...' }];
    return props.options;
  };

  const closeDropdown = () => {
    props.selectOptions(locallySelectedOptions);
    setIsSelectDisplayed(false);
    props.refreshData();
  };

  const openDropdown = () => {
    locallySelectOptions(props.selectedOptions);
    setIsSelectDisplayed(true);
  };

  const toggleDropdown = () => {
    isSelectDisplayed ? closeDropdown() : openDropdown();
  };

  return (
    <div>
      <IconAndTitleContainer
        hasSelectedOptions={locallySelectedOptions && locallySelectedOptions.length > 0}
        selected={isSelectDisplayed}
        onClick={toggleDropdown}
      >
        {!props.isLoading && locallySelectedOptions && locallySelectedOptions.length > 0 && (
          <Badge>{locallySelectedOptions.length}</Badge>
        )}
        <Icon src={props.icon} />
        <Title selected={isSelectDisplayed}>{props.title}</Title>
      </IconAndTitleContainer>
      {isSelectDisplayed && (
        <SelectWrapper>
          <SelectModalOverlay onClick={closeDropdown} />
          <Select
            menuIsOpen={true}
            autoFocus={true}
            value={locallySelectedOptions}
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
              option: styles => ({ ...styles, fontFamily: fontFamily }),
              control: styles => ({ ...styles, fontFamily: fontFamily }),
              multiValue: styles => ({ ...styles, fontFamily: fontFamily }),
              multiValueLabel: styles => ({ ...styles, fontFamily: fontFamily }),
              noOptionsMessage: styles => ({ ...styles, fontFamily: fontFamily }),
              menuList: styles => ({ ...styles, fontFamily: fontFamily }),
              menu: styles => ({ ...styles, fontFamily: fontFamily }),
              multiValueRemove: styles => ({ ...styles, fontFamily: fontFamily }),
              menuPortal: styles => ({ ...styles, fontFamily: fontFamily }),
            }}
          />
        </SelectWrapper>
      )}
    </div>
  );
};
