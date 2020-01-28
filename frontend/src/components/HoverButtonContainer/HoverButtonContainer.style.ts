import styled from 'styled-components';
import { colorUsage } from 'stylesheet';

const HOVER_SQUARE_SIZE = 30;

export const HoverButtonContainerStyled = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: ${colorUsage.primaryButtonBackgroundHover};
    border-radius: 5px;
    width: ${HOVER_SQUARE_SIZE}px;
    height: ${HOVER_SQUARE_SIZE}px;
  }
`;
