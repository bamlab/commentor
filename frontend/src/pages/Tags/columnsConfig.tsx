import React from 'react';
import { ColumnType } from 'components/GenericTable/GenericTable.type';
import { Cell, StandardTextContainer } from 'components/GenericTable/GenericTable.style';

import DeleteIcon from './components/DeleteIcon';
import UpdateIcon from './components/UpdateIcon';
import { ColorContainer } from './Tags.style';

export type TagTableOptionsType = {
  openDeleteTagModal: () => void;
  openUpdateTagModal: () => void;
};

export const columnsConfig: ColumnType<TagTableOptionsType>[] = [
  {
    index: 0,
    key: 'code',
    name: 'Code',
    columnWidth: 10,
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
    columnWidth: 60,
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
    columnWidth: 10,
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
    columnWidth: 10,
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
    columnWidth: 10,
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
  return (
    <Cell key={key} style={style}>
      {typeof objectId === 'number' ? (
        <UpdateIcon objectId={objectId} onIconClick={options.openUpdateTagModal} />
      ) : (
        <StandardTextContainer>Update</StandardTextContainer>
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
        <StandardTextContainer>Delete</StandardTextContainer>
      )}
    </Cell>
  );
};

const colorCellRenderer = (key: string, value: string, style: any): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {value === 'Color' ? (
        <StandardTextContainer>Color</StandardTextContainer>
      ) : (
        <ColorContainer color={value} />
      )}
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
      <StandardTextContainer>{value}</StandardTextContainer>
    </Cell>
  );
};
export const lineHeight = 700;
export const fixedColumnCount = 0; // this is the reference
