import React from 'react';
import { ColumnType } from 'components/GenericTable/GenericTable.type';
import { Cell } from 'components/GenericTable/GenericTable.style';

export type CommentTableOptionsType = {};

const defaultCommentCellRenderer = (
  key: string,
  value: string,
  objectId: number | 'id',
  style: Object,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {value}
    </Cell>
  );
};

export const columnsConfig: ColumnType<CommentTableOptionsType>[] = [
  {
    index: 0,
    key: 'id',
    name: 'id',
    columnWidth: 75,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      defaultCommentCellRenderer(key, value, objectId, style),
  },
  {
    index: 1,
    key: 'body',
    name: 'body',
    columnWidth: 300,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      defaultCommentCellRenderer(key, value, objectId, style),
  },
  {
    index: 2,
    key: 'filePath',
    name: 'filePath',
    columnWidth: 300,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      defaultCommentCellRenderer(key, value, objectId, style),
  },
  {
    index: 3,
    key: 'url',
    name: 'url',
    columnWidth: 300,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      defaultCommentCellRenderer(key, value, objectId, style),
  },
  {
    index: 4,
    key: 'commentor',
    name: 'commentor',
    columnWidth: 200,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      defaultCommentCellRenderer(key, value, objectId, style),
  },
  {
    index: 5,
    key: 'pullRequestUrl',
    name: 'pullRequestUrl',
    columnWidth: 200,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      defaultCommentCellRenderer(key, value, objectId, style),
  },
  {
    index: 6,
    key: 'repositoryId',
    name: 'repositoryId',
    columnWidth: 200,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      defaultCommentCellRenderer(key, value, objectId, style),
  },
  {
    index: 6,
    key: 'creationDate',
    name: 'creationDate',
    columnWidth: 200,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      defaultCommentCellRenderer(key, value, objectId, style),
  },
];

export const fixedColumnCount = 2; // this is the reference
