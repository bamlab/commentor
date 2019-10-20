import React, { Component } from 'react';
import Select from 'react-select';
import { SelectWrapper } from './MultiSelect.style';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

type PropsType = {};
type StateType = {
  selectedOptions: ISelectOptionType[];
};

export interface ISelectOptionType {
  value: string;
  label: string;
}
export class MultiSelect extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      selectedOptions: [],
    };
  }

  handleChange = (selectedOptions: ISelectOptionType[]) => {
    this.setState({ selectedOptions });
  };

  render() {
    return (
      <SelectWrapper>
        <Select
          value={this.state.selectedOptions}
          // @ts-ignore
          onChange={this.handleChange}
          options={options}
          isMulti
          isSearchable
        />
      </SelectWrapper>
    );
  }
}
