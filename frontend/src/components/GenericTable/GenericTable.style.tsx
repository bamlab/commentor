import React from 'react';
import styled from 'styled-components';
import { fontStyles } from 'stylesheet';

export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eee;
  background-color: white;
`;

export const StandardTextContainer = styled.div`
  padding: 10px;
  font-family: ${fontStyles.regular.fontFamily};
  font-weight: ${fontStyles.regular.fontWeight};
  font-size: ${fontStyles.regular.fontSize};
`;

export const HeaderTextContainer = styled(StandardTextContainer)`
  font-weight: ${fontStyles.bold.fontWeight};
  font-family: ${fontStyles.bold.fontFamily};
  font-size: ${fontStyles.bold.fontSize};
`;

export const HeaderCell = styled(Cell)``;
export const defaultCellRenderer = (
  key: string,
  value: string,
  style: Record<string, any>,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      <StandardTextContainer>{value}</StandardTextContainer>
    </Cell>
  );
};

export const defaultHeaderCellRenderer = (
  key: string,
  value: string,
  style: Record<string, any>,
): JSX.Element => {
  return (
    <HeaderCell key={key} style={style}>
      <HeaderTextContainer>{value}</HeaderTextContainer>
    </HeaderCell>
  );
};

export const STYLE = {
  boxShadow: '0px 0px 6px rgba(34,34,34,0.1)',
  backgroundColor: 'white',
  borderRadius: '5px',
  overflow: 'hidden',
};

export const Wrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

export const getDefaultCellStyle = (
  style: Record<string, any>,
  rowIndex: number,
): Record<string, any> => ({
  ...style,
  wordBreak: 'break-word',
});
