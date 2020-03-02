import React from 'react';
import { ColumnType } from 'components/GenericTable/GenericTable.type';
import { Cell, StandardTextContainer } from 'components/GenericTable/GenericTable.style';

import DeleteIcon from './components/DeleteIcon';
import UpdateIcon from './components/UpdateIcon';
import { GoLock } from 'react-icons/go';
import { ColorContainer } from './Tags.style';
import { TagType } from '../../redux/Tag';

export type TagTableOptionsType = {
  openDeleteTagModal: () => void;
  openUpdateTagModal: () => void;
};

export const columnsConfig: ColumnType<TagTableOptionsType, TagType>[] = [
  {
    index: 0,
    key: 'code',
    name: 'Code',
    columnWidth: 5,
    renderer: (
      key: string,
      tag: TagType,
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => defaultTagCellRenderer(key, tag.code, style),
  },
  {
    index: 1,
    key: 'description',
    name: 'Description',
    columnWidth: 50,
    renderer: (
      key: string,
      tag: TagType,
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => defaultTagCellRenderer(key, tag.description, style),
  },
  {
    index: 2,
    key: 'repositoryId',
    name: 'repositoryId',
    columnWidth: 15,
    renderer: (
      key: string,
      tag: TagType,
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element =>
      defaultTagCellRenderer(
        key,
        (tag.repositoryId && tag.repositoryId.toString()) || 'None',
        style,
      ),
  },
  {
    index: 3,
    key: 'color',
    name: 'Color',
    columnWidth: 10,
    renderer: (
      key: string,
      tag: TagType,
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => colorCellRenderer(key, tag, style),
  },
  {
    index: 4,
    key: 'delete',
    name: 'delete',
    columnWidth: 10,
    renderer: (
      key: string,
      tag: TagType,
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => DeleteIconCellRenderer(key, tag, style, options),
  },
  {
    index: 5,
    key: 'update',
    name: 'update',
    columnWidth: 10,
    renderer: (
      key: string,
      tag: TagType,
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => UpdateIconCellRenderer(key, tag, style, options),
  },
  {
    index: 6,
    key: 'doc',
    name: 'doc',
    columnWidth: 10,
    renderer: (
      key: string,
      tag: TagType,
      style: Object,
      options: TagTableOptionsType,
    ): JSX.Element => defaultTagCellRenderer(key, tag.externalLink, style),
  },
];

const UpdateIconCellRenderer = (
  key: string,
  tag: TagType,
  style: Object,
  options: TagTableOptionsType,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {!tag.isDefault ? (
        <UpdateIcon objectId={tag.id} onIconClick={options.openUpdateTagModal} />
      ) : (
        <GoLock />
      )}
    </Cell>
  );
};
const DeleteIconCellRenderer = (
  key: string,
  tag: TagType,
  style: Object,
  options: TagTableOptionsType,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {!tag.isDefault ? (
        <DeleteIcon objectId={tag.id} onIconClick={options.openDeleteTagModal} />
      ) : (
        <GoLock />
      )}
    </Cell>
  );
};

const colorCellRenderer = (key: string, tag: TagType, style: any): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      {tag && tag.color === 'Color' ? (
        <StandardTextContainer>Color</StandardTextContainer>
      ) : (
        <ColorContainer color={tag.color} />
      )}
    </Cell>
  );
};

const defaultTagCellRenderer = (key: string, displayString: string, style: Object): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      <StandardTextContainer>{displayString}</StandardTextContainer>
    </Cell>
  );
};
export const lineHeight = 700;
export const fixedColumnCount = 0; // this is the reference
