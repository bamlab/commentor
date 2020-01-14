import styled from 'styled-components';
import { colorUsage } from 'stylesheet';

export const StyledTags = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.div`
  color: ${colorUsage.error};
`;
export const FloatingButtonContainer = styled.div`
  position: fixed;
  right: 2%;
  bottom: 2%;
`;
