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
  borderRadius: '5px',
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
});
