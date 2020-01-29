import styled from 'styled-components';
import { colorUsage } from 'stylesheet';

const HOVER_SQUARE_SIZE = 30;

/**
 * Component used for container icon in GenericTable only
 */
export const HoverButtonContainerStyled = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    box-shadow: 1px 2px 2px 1px ${colorUsage.shadow};

    border-radius: 5px;
    width: ${HOVER_SQUARE_SIZE}px;
    height: ${HOVER_SQUARE_SIZE}px;
  }
`;
