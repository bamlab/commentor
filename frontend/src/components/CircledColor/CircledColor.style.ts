import styled, { css } from 'styled-components';

const CIRCLE_SIZE = 32;

const selectedCss = css`
  border: 1px solid white;
  box-shadow: 0px 0px 6px black;
`;

export const Container = styled.div<{ color: string; isSelected?: boolean }>`
  background-color: ${props => props.color};
  height: ${CIRCLE_SIZE}px;
  width: ${CIRCLE_SIZE}px;
  cursor: pointer;
  border: 1px solid transparent;

  ${props => props.isSelected && selectedCss};
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;

  /* for tick */
  display: inline-block;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
  transform: rotate(45deg);
`;

export const TickPartLeft = styled.div`
  position: absolute;
  width: 3px;
  height: 12px;
  background-color: white;
  left: 17px;
  top: 9px;
`;

export const TickPartRight = styled.div`
  position: absolute;
  width: 8px;
  height: 3px;
  background-color: white;
  left: 11px;
  top: 18px;
`;
