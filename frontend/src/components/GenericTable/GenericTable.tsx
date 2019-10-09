import * as React from 'react';
import { AutoSizer, MultiGrid } from 'react-virtualized';
import styled from 'styled-components';
import { ColumnType, RendererInputType } from './GenericTable.type';

const STYLE = {
  border: '1px solid #ddd',
};

const Wrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
`;

interface PropsType {
  values: Object[];
  columnsConfig: ColumnType[];
  fixedColumnCount: number;
}

export const GenericTable = (props: PropsType) => {
  const header = {};
  props.columnsConfig.forEach(column => {
    // @ts-ignore
    if (column) header[`${column.key}`] = column.name;
  });

  const valuesWithHeaders: Object[] = [header, ...props.values];

  const cellRenderer = ({ columnIndex, key, rowIndex, style }: RendererInputType): JSX.Element => {
    const configKey = props.columnsConfig[columnIndex].key || 'error';
    if (!valuesWithHeaders[rowIndex]) {
      return (
        <Cell key={key} style={style}>
          vide
        </Cell>
      );
    }
    return (
      <Cell key={key} style={style}>
        {
          // @ts-ignore too much check to do on this commit
          valuesWithHeaders[rowIndex][configKey]
        }
      </Cell>
    );
  };

  return (
    <Wrapper>
      <AutoSizer>
        {({ width }) => (
          // @ts-ignore
          <MultiGrid
            fixedColumnCount={props.fixedColumnCount}
            fixedRowCount={1}
            scrollToColumn={0}
            scrollToRow={0}
            cellRenderer={cellRenderer}
            columnWidth={({ index }) =>
              props.columnsConfig[index] && props.columnsConfig[index].columnWidth
            }
            columnCount={props.columnsConfig.length}
            enableFixedColumnScroll
            enableFixedRowScroll
            height={500}
            rowHeight={40}
            // +1 is for empty value => will be used for lazy loading
            rowCount={valuesWithHeaders.length + 1}
            style={STYLE}
            width={width}
            hideTopRightGridScrollbar
            hideBottomLeftGridScrollbar
          />
        )}
      </AutoSizer>
    </Wrapper>
  );
};
