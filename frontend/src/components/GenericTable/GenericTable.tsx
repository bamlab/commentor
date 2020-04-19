import * as React from 'react';
import { AutoSizer, MultiGrid, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { ColumnType, OptionsType, GenericRowObjectType } from './GenericTable.type';
import {
  STYLE,
  Wrapper,
  defaultCellRenderer,
  getDefaultCellStyle,
  defaultHeaderCellRenderer,
} from './GenericTable.style';

interface PropsType<T extends OptionsType, O extends GenericRowObjectType> {
  values: O[];
  columnsConfig: ColumnType<T, O>[];
  fixedColumnCount: number;
  options: T;
  defaultLineHeight: number;
}

export const GenericTable = <T extends OptionsType, O extends GenericRowObjectType>(
  props: PropsType<T, O>,
) => {
  const getHeaderRow = (): { [key: string]: string } => {
    const header: { [key: string]: string } = {};
    props.columnsConfig.forEach((column: ColumnType<T, O>, indexNumber: number) => {
      if (column) {
        header[indexNumber] = column.name;
      }
    });
    return header;
  };

  // @ts-ignore exception on first row, index 0 is handle separatly
  const valuesWithHeaders: O[] = [null, ...props.values];

  /**
   * For future optimisation check at https://bvaughn.github.io/react-virtualized/#/components/CellMeasurer
   */
  const cacheMeasure = new CellMeasurerCache({
    fixedWidth: true,
  });

  const renderRows = (columnIndex: number, key: string, rowIndex: number, style: Object) => {
    if (rowIndex === 0) {
      return defaultHeaderCellRenderer(
        key,
        getHeaderRow()[columnIndex],
        getDefaultCellStyle(style, rowIndex),
      );
    }
    if (rowIndex >= valuesWithHeaders.length) {
      return defaultCellRenderer(key, 'Empty', getDefaultCellStyle(style, rowIndex));
    }
    return props.columnsConfig[columnIndex].renderer(
      key,
      valuesWithHeaders[rowIndex],
      getDefaultCellStyle(style, rowIndex),
      props.options,
    );
  };

  /**
   * force rerender after resize
   */
  // window.onresize = () => console.log('resized');
  return (
    <Wrapper>
      <AutoSizer>
        {({ width }) => (
          <MultiGrid
            fixedColumnCount={props.fixedColumnCount}
            fixedRowCount={1}
            scrollToColumn={0}
            scrollToRow={0}
            cellRenderer={({ columnIndex, key, parent, rowIndex, style }) => (
              <CellMeasurer
                cache={cacheMeasure}
                columnIndex={columnIndex}
                key={key}
                parent={parent}
                rowIndex={rowIndex}
              >
                {renderRows(columnIndex, key, rowIndex, style)}
              </CellMeasurer>
            )}
            columnWidth={({ index }) =>
              props.columnsConfig[index] &&
              (props.columnsConfig[index].columnWidth * window.innerWidth) / 100
            }
            columnCount={props.columnsConfig.length}
            enableFixedColumnScroll
            enableFixedRowScroll
            height={props.defaultLineHeight}
            rowHeight={cacheMeasure.rowHeight}
            rowCount={valuesWithHeaders.length}
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
