import styled from 'styled-components';
import { fontFamily, fontWeight, colorUsage } from 'stylesheet';

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

export const Title = styled.p`
  font-family: ${fontFamily.main};
  font-weight: ${fontWeight.light};
  color: ${colorUsage.grey};
`;

export const Icon = styled.img`
  padding-right: 5px;
`;
export const IconAndTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  :hover {
    cursor: pointer;
  }
`;
