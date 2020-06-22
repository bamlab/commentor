import React from 'react';
import { ColumnType } from 'components/GenericTable/GenericTable.type';
import { Cell, StandardTextContainer } from 'components/GenericTable/GenericTable.style';
import LinkCellIcon from '../../components/LinkCellIcon';
import { CommentType } from '../../redux/Comment';
import { formatDateToDDMMYYYYSlash } from '../../services/date/dateFormatter';

export interface CommentTableOptionsType {}

const LinkToPullRequest = (
  key: string,
  linkURL: string | 'pullRequestUrl',
  style: Record<string, any>,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {linkURL !== 'pullRequestUrl' ? (
        <LinkCellIcon onIconClick={() => window.open(linkURL, '_blank')} />
      ) : (
        <StandardTextContainer>{'Go to PR'}</StandardTextContainer>
      )}
    </Cell>
  );
};

const LinkToComment = (
  key: string,
  linkURL: string | 'url',
  style: Record<string, any>,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {linkURL !== 'url' ? (
        <LinkCellIcon onIconClick={() => window.open(linkURL, '_blank')} />
      ) : (
        <StandardTextContainer>{'Go to Comment'}</StandardTextContainer>
      )}
    </Cell>
  );
};
export const lineHeight = 700;
export const fixedColumnCount = 0; // this is the reference

const defaultCommentCellRenderer = (
  key: string,
  displayString: string,
  style: Record<string, any>,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      <StandardTextContainer>{displayString}</StandardTextContainer>
    </Cell>
  );
};

const dateCellRenderer = (
  key: string,
  Comment: CommentType,
  style: Record<string, any>,
): JSX.Element => (
  <Cell key={key} style={style}>
    <StandardTextContainer>{formatDateToDDMMYYYYSlash(Comment.creationDate)}</StandardTextContainer>
  </Cell>
);

export const columnsConfig: ColumnType<CommentTableOptionsType, CommentType>[] = [
  {
    index: 0,
    key: 'body',
    name: 'Comment',
    columnWidth: 32, // percentage
    renderer: (key: string, comment: CommentType, style: Record<string, any>): JSX.Element =>
      defaultCommentCellRenderer(key, comment.body, style),
  },
  {
    index: 1,
    key: 'filePath',
    name: 'File',
    columnWidth: 16,
    renderer: (key: string, comment: CommentType, style: Record<string, any>): JSX.Element =>
      defaultCommentCellRenderer(key, comment.filePath, style),
  },
  {
    index: 2,
    key: 'commentor',
    name: 'Commentor',
    columnWidth: 10,
    renderer: (key: string, comment: CommentType, style: Record<string, any>): JSX.Element =>
      defaultCommentCellRenderer(key, comment.commentor, style),
  },
  {
    index: 3,
    key: 'requester',
    name: 'Requester',
    columnWidth: 10,
    renderer: (key: string, comment: CommentType, style: Record<string, any>): JSX.Element =>
      defaultCommentCellRenderer(key, comment.requester, style),
  },
  {
    index: 4,
    key: 'creationDate',
    name: 'Creation Date',
    columnWidth: 10,
    renderer: (key: string, comment: CommentType, style: Record<string, any>): JSX.Element =>
      dateCellRenderer(key, comment, style),
  },
  {
    index: 5,
    key: 'url',
    name: 'url',
    columnWidth: 7,
    renderer: (key: string, comment: CommentType, style: Record<string, any>): JSX.Element =>
      LinkToComment(key, comment.url, style),
  },
  {
    index: 6,
    key: 'pullRequestUrl',
    name: 'pullRequestUrl',
    columnWidth: 7,
    renderer: (key: string, comment: CommentType, style: Record<string, any>): JSX.Element =>
      LinkToPullRequest(key, comment.pullRequestUrl, style),
  },
];
