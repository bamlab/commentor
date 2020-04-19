import styled from 'styled-components';
import { colorUsage } from 'stylesheet';

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
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

export const ColorContainer = styled.div`
  background-color: ${({ color }: { color: string }) => color};
  border-radius: 30px;
  width: 30px;
  height: 30px;
`;
