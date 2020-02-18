import React from 'react';
import styled from 'styled-components';
import { fontFamily, colorUsage } from 'stylesheet';

const getBackgroundColor = (index: number) => {
  if (index === 0) return colorUsage.headerBackground;
  if (index % 2 === 0) return colorUsage.oddLineColor;
  if (index % 2 === 1) return colorUsage.evenLineColor;
};

export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eee;
  background-color: white;
`;

export const StandardTextContainer = styled.div`
  padding: 10px;
  font-family: ${fontFamily.main};
`;

export const defaultCellRenderer = (key: string, value: string, style: Object): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      <StandardTextContainer>{value}</StandardTextContainer>
    </Cell>
  );
};

export const STYLE = {
  border: '1px solid #ddd',
  backgroundColor: 'white',
  borderRadius: '10px',
  overflow: 'hidden',
};

export const Wrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

export const getDefaultCellStyle = (style: Object, rowIndex: number): Object => ({
  ...style,
  wordBreak: 'break-word',
  backgroundColor: getBackgroundColor(rowIndex),
});
