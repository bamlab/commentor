import * as React from 'react';
import { AutoSizer, MultiGrid } from 'react-virtualized';
import { ColumnType } from './GenericTable.type';
import { STYLE, Wrapper, Cell } from './GenericTable.style';

interface PropsType {
  values: any[];
  columnsConfig: ColumnType[];
  fixedColumnCount: number;
  options?: Object;
}

export const GenericTable = (props: PropsType) => {
  const header = {};
  props.columnsConfig.forEach(column => {
    // @ts-ignore
    if (column) header[`${column.key}`] = column.name;
  });

  const valuesWithHeaders: any[] = [header, ...props.values];

  const defaultCellRenderer = (key: string, style?: Object, options?: Object): JSX.Element => {
    return (
      <Cell key={key} style={style}>
        Empty
      </Cell>
    );
  };

  const getValue = (columnIndex: number, rowIndex: number): string | null => {
    const configKey = getColumnKey(columnIndex);
    if (configKey) return valuesWithHeaders[rowIndex][configKey];
    return null;
  };

  const getColumnKey = (columnIndex: number): string | null =>
    props.columnsConfig[columnIndex].key || null;

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
            cellRenderer={({ columnIndex, key, rowIndex, style }) =>
              (valuesWithHeaders[rowIndex] &&
                props.columnsConfig[columnIndex].renderer(
                  key,
                  getValue(columnIndex, rowIndex),
                  valuesWithHeaders[rowIndex].id || null, // null for header or where object has no id
                  style,
                  props.options,
                )) ||
              defaultCellRenderer(key, style)
            }
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
