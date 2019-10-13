import React from 'react';
import { ColumnType } from 'components/GenericTable/GenericTable.type';
import { Cell } from 'components/GenericTable/GenericTable.style';
import DeleteIcon from './components/DeleteIcon';

export const columnsConfig: ColumnType[] = [
  {
    index: 0,
    key: 'id',
    name: 'id',
    columnWidth: 75,
    renderer: (key: string, value: any, objectId: number | 'id', style?: Object): JSX.Element =>
      defaultTagCellRenderer(key, value, objectId, style),
  },
  {
    index: 1,
    key: 'code',
    name: 'code',
    columnWidth: 300,
    renderer: (key: string, value: any, objectId: number | 'id', style?: Object): JSX.Element =>
      defaultTagCellRenderer(key, value, objectId, style),
  },
  {
    index: 2,
    key: 'description',
    name: 'decription',
    columnWidth: 300,
    renderer: (key: string, value: any, objectId: number | 'id', style?: Object): JSX.Element =>
      defaultTagCellRenderer(key, value, objectId, style),
  },
  {
    index: 6,
    key: 'creationDate',
    name: 'creationDate',
    columnWidth: 200,
    renderer: (key: string, value: any, objectId: number | 'id', style?: Object): JSX.Element =>
      defaultTagCellRenderer(key, value, objectId, style),
  },
  {
    index: 7,
    key: 'delete',
    name: 'delete',
    columnWidth: 50,
    renderer: (key: string, value: any, objectId: number | 'id', style?: Object): JSX.Element =>
      IconCellRenderer(key, value, objectId, style),
  },
];

const IconCellRenderer = (
  key: string,
  value: string,
  objectId: number | 'id',
  style?: Object,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {objectId !== 'id' ? <DeleteIcon objectId={objectId} /> : 'Del ?'}
    </Cell>
  );
};
const defaultTagCellRenderer = (
  key: string,
  value: any,
  objectId: number | 'id',
  style?: Object,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {value}
    </Cell>
  );
};

export const fixedColumnCount = 0; // this is the reference
