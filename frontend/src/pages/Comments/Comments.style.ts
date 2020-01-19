import styled from 'styled-components';
import { colorUsage } from 'stylesheet';

const StyledComments = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderText = styled.p`
  font-weight: bold;
`;

export const HeaderCell = styled.div`
  background-color: ${colorUsage.headerBackground};
`;

export const FloatingButtonContainer = styled.div`
  position: fixed;
  right: 2%;
  bottom: 2%;
`;

export default StyledComments;
