import { TagTableOptionsType } from 'src/pages/Tags/columnsConfig';
import { CommentTableOptionsType } from 'src/pages/Home/columnsConfig';
import { TagType } from '../../redux/Tag';
import { CommentType } from '../../redux/Comment';

export type OptionsType = TagTableOptionsType | CommentTableOptionsType;

export type GenericRowObjectType = TagType | CommentType;

export interface ColumnType<T extends OptionsType, O extends GenericRowObjectType> {
  index: number;
  key: string;
  name: string;
  columnWidth: number;
  backgroundColor?: string;
  renderer: (
    key: string,
    genericRowObject: O,
    style: Record<string, any>,
    options: T,
  ) => JSX.Element;
}

export interface RendererInputType {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: Record<string, any>;
}
