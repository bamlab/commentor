import styled from 'styled-components';
import { fontFamily, fontWeight, colorUsage, getSpacing } from 'stylesheet';

const DEFAULT_WIDTH = 300;

export const SelectWrapper = styled.div`
  flex: 1;
  position: absolute;
  margin-top: 10px;
  width: ${DEFAULT_WIDTH}px;
`;

export const SelectModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Title = styled.p<{ selected: boolean }>`
  font-family: ${fontFamily.main};
  font-weight: ${fontWeight.light};
  color: ${props => (props.selected ? colorUsage.black : colorUsage.grey)};
`;

export const Icon = styled.img`
  padding-right: 5px;
`;
export const IconAndTitleContainer = styled.div<{ selected: boolean }>`
  background-color: ${props => (props.selected ? colorUsage.grey : colorUsage.white)};
  padding: ${getSpacing(1)};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  :hover {
    cursor: pointer;
    background-color: ${colorUsage.grey};
  }
`;
