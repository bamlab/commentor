import React from 'react';
import { ColumnType } from 'components/GenericTable/GenericTable.type';
import { Cell } from 'components/GenericTable/GenericTable.style';

export const columnsConfig: ColumnType[] = [
  {
    index: 0,
    key: 'id',
    name: 'id',
    columnWidth: 75,
    renderer: (key: string, value: any, style?: Object): JSX.Element =>
      defaultTagCellRenderer(key, value, style),
  },
  {
    index: 1,
    key: 'code',
    name: 'code',
    columnWidth: 300,
    renderer: (key: string, value: any, style?: Object): JSX.Element =>
      defaultTagCellRenderer(key, value, style),
  },
  {
    index: 2,
    key: 'description',
    name: 'decription',
    columnWidth: 300,
    renderer: (key: string, value: any, style?: Object): JSX.Element =>
      defaultTagCellRenderer(key, value, style),
  },
  {
    index: 6,
    key: 'creationDate',
    name: 'creationDate',
    columnWidth: 200,
    renderer: (key: string, value: any, style?: Object): JSX.Element =>
      defaultTagCellRenderer(key, value, style),
  },
  {
    index: 7,
    key: 'delete',
    name: 'delete',
    columnWidth: 50,
    renderer: (key: string, value: any, style?: Object): JSX.Element =>
      IconCellRenderer(key, value, style),
  },
];

const IconCellRenderer = (key: string, value: string, style?: Object): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      this is icon
    </Cell>
  );
};
const defaultTagCellRenderer = (key: string, value: string, style?: Object): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {value}
    </Cell>
  );
};

export const fixedColumnCount = 0; // this is the reference
