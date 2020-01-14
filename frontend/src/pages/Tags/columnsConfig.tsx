import React from 'react';
import { ColumnType } from 'components/GenericTable/GenericTable.type';
import { Cell } from 'components/GenericTable/GenericTable.style';
import DeleteIcon from './components/DeleteIcon';
import UpdateIcon from './components/UpdateIcon';

export type TagTableOptionsType = {
  openDeleteTagModal: () => void;
  openUpdateTagModal: () => void;
};

export const columnsConfig: ColumnType<TagTableOptionsType>[] = [
  {
    index: 0,
    key: 'id',
    name: 'id',
    columnWidth: 75,
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
    key: 'code',
    name: 'code',
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
    index: 2,
    key: 'description',
    name: 'description',
    columnWidth: 600,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style: Object,
      options: TagTableOptionsType,
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
      style: Object,
      options: TagTableOptionsType,
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
      style: Object,
      options: TagTableOptionsType,
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
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => UpdateIconCellRenderer(key, objectId, style, options),
  },
  {
    index: 3,
    key: 'creationDate',
    name: 'creationDate',
    columnWidth: 150,
    renderer: (
      key: string,
      value: any,
      objectId: number | 'id',
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => defaultTagCellRenderer(key, value, objectId, style),
  },
];

const UpdateIconCellRenderer = (
  key: string,
  objectId: number | 'id',
  style: Object,
  options: TagTableOptionsType,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {objectId !== 'id' ? (
        <UpdateIcon objectId={objectId} onIconClick={options.openUpdateTagModal} />
      ) : (
        'Update ?'
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
      {objectId !== 'id' ? (
        <DeleteIcon objectId={objectId} onIconClick={options.openDeleteTagModal} />
      ) : (
        'Del ?'
      )}
    </Cell>
  );
};

const colorCellRenderer = (key: string, value: string, style: Object): JSX.Element => {
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
