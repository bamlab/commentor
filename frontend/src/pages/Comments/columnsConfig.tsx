import React from 'react';
import { ColumnType } from 'components/GenericTable/GenericTable.type';
import { Cell, StandardTextContainer } from 'components/GenericTable/GenericTable.style';
import LinkCellIcon from './components/LinkCellIcon';

export type CommentTableOptionsType = {};

const defaultCommentCellRenderer = (
  key: string,
  value: string,
  objectId: number | 'id',
  style: Object,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      <StandardTextContainer>{value}</StandardTextContainer>
    </Cell>
  );
};

export const columnsConfig: ColumnType<CommentTableOptionsType>[] = [
  {
    index: 0,
    key: 'body',
    name: 'Comment',
    columnWidth: 450,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      defaultCommentCellRenderer(key, value, objectId, style),
  },
  {
    index: 1,
    key: 'filePath',
    name: 'File',
    columnWidth: 300,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      defaultCommentCellRenderer(key, value, objectId, style),
  },
  {
    index: 2,
    key: 'commentor',
    name: 'Commentor',
    columnWidth: 200,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      defaultCommentCellRenderer(key, value, objectId, style),
  },
  {
    index: 3,
    key: 'creationDate',
    name: 'Creation Date',
    columnWidth: 200,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      defaultCommentCellRenderer(key, value, objectId, style),
  },
  {
    index: 4,
    key: 'url',
    name: 'url',
    columnWidth: 150,
    renderer: (key: string, value: any, objectId: number | 'id', style: Object): JSX.Element =>
      LinkToComment(key, value, style),
  },
  {
    index: 4,
    key: 'pullRequestUrl',
    name: 'pullRequestUrl',
    columnWidth: 150,
    renderer: (key: string, value: string, objectId: number | 'id', style: Object): JSX.Element =>
      LinkToPullRequest(key, value, style),
  },
];

const LinkToPullRequest = (
  key: string,
  linkURL: string | 'pullRequestUrl',
  style: Object,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {linkURL !== 'pullRequestUrl' ? (
        <LinkCellIcon onIconClick={() => window.open(linkURL, '_blank')} />
      ) : (
        'Go to PR'
      )}
    </Cell>
  );
};

const LinkToComment = (key: string, linkURL: string | 'url', style: Object): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {linkURL !== 'url' ? (
        <LinkCellIcon onIconClick={() => window.open(linkURL, '_blank')} />
      ) : (
        'Go to Comment'
      )}
    </Cell>
  );
};
export const lineHeight = 700;
export const fixedColumnCount = 2; // this is the reference
