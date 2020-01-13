import styled from 'styled-components';
import { colorUsage } from 'stylesheet';

export const StyledTags = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const ErrorMessage = styled.div`
  color: ${colorUsage.error};
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 50px;
  left: 50%;
`;
