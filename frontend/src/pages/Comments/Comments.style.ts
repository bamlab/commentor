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

export const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 50px;
  left: 50%;
`;

export default StyledComments;
