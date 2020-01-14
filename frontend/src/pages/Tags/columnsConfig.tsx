import React from 'react';
import { ColumnType } from 'components/GenericTable/GenericTable.type';
import { Cell } from 'components/GenericTable/GenericTable.style';
import { getSpacing } from 'stylesheet';

import DeleteIcon from './components/DeleteIcon';
import UpdateIcon from './components/UpdateIcon';

export type TagTableOptionsType = {
  openDeleteTagModal: () => void;
  openUpdateTagModal: () => void;
};

export const columnsConfig: ColumnType<TagTableOptionsType>[] = [
  {
    index: 0,
    key: 'code',
    name: 'Code',
    columnWidth: 300,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => defaultTagCellRenderer(key, value, objectId, style),
  },
  {
    index: 1,
    key: 'description',
    name: 'Description',
    columnWidth: 900,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => defaultTagCellRenderer(key, value, objectId, style),
  },
  {
    index: 2,
    key: 'color',
    name: 'Color',
    columnWidth: 100,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => colorCellRenderer(key, value, style),
  },
  {
    index: 3,
    key: 'delete',
    name: 'delete',
    columnWidth: 50,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => DeleteIconCellRenderer(key, objectId, style, options),
  },
  {
    index: 4,
    key: 'update',
    name: 'update',
    columnWidth: 80,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => UpdateIconCellRenderer(key, objectId, style, options),
  },
];

const UpdateIconCellRenderer = (
  key: string,
  objectId: number | 'id',
  style: Object,
  options: TagTableOptionsType,
): JSX.Element => {
  console.log('HAHA', objectId);
  return (
    <Cell key={key} style={style}>
      {typeof objectId === 'number' ? (
        <UpdateIcon objectId={objectId} onIconClick={options.openUpdateTagModal} />
      ) : (
        'Update'
      )}
    </Cell>
  );
};
const DeleteIconCellRenderer = (
  key: string,
  objectId: number | 'id',
  style: Object,
  options: TagTableOptionsType,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {typeof objectId === 'number' ? (
        <DeleteIcon objectId={objectId} onIconClick={options.openDeleteTagModal} />
      ) : (
        'Delete'
      )}
    </Cell>
  );
};

const colorCellRenderer = (
  key: string,
  value: string,
  style: any & { width: number },
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {value === 'Color' ? value : null}
    </Cell>
  );
};

const defaultTagCellRenderer = (
  key: string,
  value: any,
  objectId: number | 'id',
  style: Object,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {value}
    </Cell>
  );
};
export const lineHeight = 500;
export const fixedColumnCount = 2; // this is the reference
