import styled from 'styled-components';
import { fontFamily, fontSize } from 'stylesheet';

export const TagsLegendContainer = styled.div``;

export const TagLegendItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px 10px 0px;
  cursor: pointer;
`;

export const TagCode = styled.p`
  font-family: ${fontFamily.main};
  font-size: ${fontSize.medium};
`;

export const ColorDot = styled.div`
  border-radius: 10px;
  height: 20px;
  width: 20px;
  margin: 0px 5px 0px 5px;
  background-color: ${({ color }) => color};
`;
