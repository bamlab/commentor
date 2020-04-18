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
export const IconAndTitleContainer = styled.div<{ selected: boolean; hasSelectedOptions: boolean }>`
  position: relative;
  background-color: ${props =>
    props.selected || props.hasSelectedOptions ? colorUsage.background : 'transparent'};
  padding: ${getSpacing(1)};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  :hover {
    cursor: pointer;
    background-color: ${colorUsage.background};
  }
`;

export const Badge = styled.p`
  position: absolute;
  top: -${getSpacing(0.5)};
  left: -${getSpacing(0.5)};
  background-color: ${colorUsage.highlight};
  font-family: ${fontStyles.small.fontFamily};
  font-weight: ${fontStyles.small.fontWeight};
  font-size: ${fontStyles.small.fontSize};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  width: 18px;
  border-radius: 9px;
  color: white;
`;
