import React from 'react';
import { ToggleContainer } from './Toggle.style';

interface propTypes {
  onSelect: (value: string) => void;
  value: string;
}

const Toggle: React.FunctionComponent<propTypes> = props => {
  const { value, onSelect } = props;

  const selectBarChart = () => onSelect('BAR_CHART');
  const selectDonutChart = () => onSelect('DONUT_CHART');
  const isSelected = (containerValue: string): boolean => containerValue === value;
  return (
    <ToggleContainer>
      <div onClick={selectBarChart}>{isSelected('BAR_CHART') ? 'bar-active' : 'bar'}</div>
      <div onClick={selectDonutChart}>
        {isSelected('DONUT_CHART') ? 'doneught-active' : 'doneught'}
      </div>
    </ToggleContainer>
  );
};

export default Toggle;
