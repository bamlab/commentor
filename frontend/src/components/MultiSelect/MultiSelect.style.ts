import styled from 'styled-components';
import { fontStyles, colorUsage, getSpacing } from 'stylesheet';

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
  font-family: ${fontStyles.regular.fontFamily};
  font-weight: ${fontStyles.regular.fontWeight};
  font-size: ${fontStyles.regular.fontSize};
  color: ${props => (props.selected ? colorUsage.text : colorUsage.placeHolderText)};
`;

export const Icon = styled.img`
  padding-right: 5px;
`;
export const IconAndTitleContainer = styled.div<{ selected: boolean }>`
  background-color: ${props => (props.selected ? colorUsage.background : 'transparent')};
  padding: ${getSpacing(1)};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  :hover {
    cursor: pointer;
    background-color: ${colorUsage.background};
  }
`;
