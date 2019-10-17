import React from 'react';
import { ColumnType } from 'components/GenericTable/GenericTable.type';
import { Cell } from 'components/GenericTable/GenericTable.style';
import DeleteIcon from './components/DeleteIcon';
import UpdateIcon from './components/UpdateIcon';

export const columnsConfig: ColumnType[] = [
  {
    index: 0,
    key: 'id',
    name: 'id',
    columnWidth: 75,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style?: Object,
      options?: Object,
    ): JSX.Element => defaultTagCellRenderer(key, value, objectId, style),
  },
  {
    index: 1,
    key: 'code',
    name: 'code',
    columnWidth: 300,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style?: Object,
      options?: Object,
    ): JSX.Element => defaultTagCellRenderer(key, value, objectId, style),
  },
  {
    index: 2,
    key: 'description',
    name: 'decription',
    columnWidth: 300,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style?: Object,
      options?: Object,
    ): JSX.Element => defaultTagCellRenderer(key, value, objectId, style),
  },
  {
    index: 3,
    key: 'creationDate',
    name: 'creationDate',
    columnWidth: 200,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style?: Object,
      options?: Object,
    ): JSX.Element => defaultTagCellRenderer(key, value, objectId, style),
  },
  {
    index: 4,
    key: 'color',
    name: 'color',
    columnWidth: 100,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style?: Object,
      options?: Object,
    ): JSX.Element => colorCellRenderer(key, value, style),
  },
  {
    index: 5,
    key: 'delete',
    name: 'delete',
    columnWidth: 50,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style?: Object,
      options?: Object,
    ): JSX.Element => DeleteIconCellRenderer(key, objectId, style, options),
  },
  {
    index: 6,
    key: 'update',
    name: 'update',
    columnWidth: 80,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style?: Object,
      options?: Object,
    ): JSX.Element => UpdateIconCellRenderer(key, objectId, style, options),
  },
];

const UpdateIconCellRenderer = (
  key: string,
  objectId: number | 'id',
  style?: Object,
  options?: Object,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {objectId !== 'id' ? (
        // @ts-ignore yeye
        <UpdateIcon objectId={objectId} onIconClick={options && options.openUpdateTagModal} />
      ) : (
        'Update ?'
      )}
    </Cell>
  );
};
const DeleteIconCellRenderer = (
  key: string,
  objectId: number | 'id',
  style?: Object,
  options?: Object,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {objectId !== 'id' ? (
        // @ts-ignore
        <DeleteIcon objectId={objectId} onIconClick={options && options.openDeleteTagModal} />
      ) : (
        'Del ?'
      )}
    </Cell>
  );
};

const colorCellRenderer = (key: string, value: string, style?: Object): JSX.Element => {
  return (
    <Cell key={key} style={{ ...style, backgroundColor: value }}>
      {value}
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
