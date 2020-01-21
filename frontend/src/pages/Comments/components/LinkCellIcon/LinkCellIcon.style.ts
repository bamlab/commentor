import styled from 'styled-components';
import { colorUsage } from 'stylesheet';

export const Wrapper = styled.div`
  height: 20px;
  width: 20px;
  background-color: ${colorUsage.linkColor};
  cursor: pointer;

  &:hover {
    background-color: ${colorUsage.linkColorHover};
  }
`;
