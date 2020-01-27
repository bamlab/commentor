import React from 'react';
import { ToggleContainer } from './Toggle.style';

interface propTypes {
  onSelect: (value: string) => void;
  value: string;
  firstOption: string;
  secondOption: string;
}

const Toggle: React.FunctionComponent<propTypes> = props => {
  const { value, onSelect } = props;

  const selectFirstOption = () => onSelect(props.firstOption);
  const selectSecondOption = () => onSelect(props.secondOption);
  const isSelected = (containerValue: string): boolean => containerValue === value;
  return (
    <ToggleContainer>
      <div onClick={selectFirstOption}>
        {isSelected(props.firstOption) ? `${props.firstOption}-active` : `${props.firstOption}`}
      </div>
      <div onClick={selectSecondOption}>
        {isSelected(props.secondOption) ? `${props.secondOption}-active` : `${props.secondOption}`}
      </div>
    </ToggleContainer>
  );
};

export default Toggle;
