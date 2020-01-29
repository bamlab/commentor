import * as React from 'react';
import { AutoSizer, MultiGrid, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { ColumnType, OptionsType } from './GenericTable.type';
import { STYLE, Wrapper, Cell } from './GenericTable.style';
import { colorUsage } from 'stylesheet';

interface PropsType<T extends OptionsType> {
  values: any[];
  columnsConfig: ColumnType<T>[];
  fixedColumnCount: number;
  options: T;
  defaultLineHeight: number;
}

export const GenericTable = <T extends OptionsType>(props: PropsType<T>) => {
  const header: { [key: string]: string } = {};
  props.columnsConfig.forEach((column: ColumnType<T>) => {
    if (column) {
      header[`${column.key}`] = column.name;
      header.backgroundColor = colorUsage.headerBackground;
    }
  });

  const valuesWithHeaders: any[] = [header, ...props.values];

  const defaultCellRenderer = (key: string, style: Object): JSX.Element => {
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
  const getBackgroundColor = (index: number, color?: string) => {
    if (color) return color;
    if (index % 2 === 0) return colorUsage.oddLineColor;
    if (index % 2 === 1) return colorUsage.evenLineColor;
  };

  const getColumnKey = (columnIndex: number): string | null =>
    props.columnsConfig[columnIndex].key || null;

  /**
   * For future optimisation check at https://bvaughn.github.io/react-virtualized/#/components/CellMeasurer
   */
  const cacheMeasure = new CellMeasurerCache({
    fixedWidth: true,
  });

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
                {(valuesWithHeaders[rowIndex] &&
                  props.columnsConfig[columnIndex].renderer(
                    key,
                    getValue(columnIndex, rowIndex),
                    valuesWithHeaders[rowIndex].id || null, // null for header or where object has no id
                    {
                      ...style,
                      wordBreak: 'break-word',
                      backgroundColor: getBackgroundColor(
                        rowIndex,
                        valuesWithHeaders[rowIndex].backgroundColor,
                      ),
                    },
                    props.options,
                  )) ||
                  defaultCellRenderer(key, {
                    ...style,
                    backgroundColor: getBackgroundColor(rowIndex),
                  })}
              </CellMeasurer>
            )}
            columnWidth={({ index }) =>
              props.columnsConfig[index] && props.columnsConfig[index].columnWidth
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
