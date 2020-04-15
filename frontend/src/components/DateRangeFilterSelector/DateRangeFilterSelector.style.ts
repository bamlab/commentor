import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { colorUsage, borderRadius, getSpacing } from 'stylesheet';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 ${getSpacing(1)} 0 ${getSpacing(1)};
`;

export const LabelledDatePickerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;
export const DatePickerContainer = styled(DatePicker)`
  margin: 0 ${getSpacing(1)} 0 ${getSpacing(1)};
  padding: ${getSpacing(1)};
  border-radius: ${borderRadius.medium};
  color: ${colorUsage.primary};
  background-color: ${colorUsage.oddLineColor};
`;
