import styled from 'styled-components';
import { getSpacing, fontSize, colorUsage } from 'stylesheet';

export const ToggleContainer = styled.div`
  margin-top: ${getSpacing(5)};
  display: flex;
  flex-direction: row;
  box-shadow: 2px 2px 2px 2px ${colorUsage.primaryTextColor};
  border-radius: 5px;
`;

export const Spacer = styled.div`
  margin-right: ${getSpacing(5)};
  margin-left: ${getSpacing(5)};
  font-size: ${fontSize.XXLarge};
  color: ${colorUsage.primaryTextColor};
`;
