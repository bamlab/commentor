import React from 'react';
import { ToggleContainer, Spacer } from './Toggle.style';
import { colorUsage, fontStyles } from 'stylesheet';
import { FiPieChart, FiBarChart2 } from 'react-icons/fi';

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
      <FiBarChart2
        style={{
          cursor: 'pointer',
          fontSize: fontStyles.title.fontSize,
          fontFamily: fontStyles.title.fontFamily,
          fontWeight: fontStyles.title.fontWeight,
          color: isSelected(props.firstOption) ? colorUsage.highlight : colorUsage.text,
        }}
        onClick={selectFirstOption}
      />
      <Spacer>|</Spacer>
      <FiPieChart
        style={{
          cursor: 'pointer',
          fontSize: fontStyles.title.fontSize,
          fontFamily: fontStyles.title.fontFamily,
          fontWeight: fontStyles.title.fontWeight,
          color: isSelected(props.secondOption) ? colorUsage.highlight : colorUsage.text,
        }}
        onClick={selectSecondOption}
      />
    </ToggleContainer>
  );
};

export default Toggle;
