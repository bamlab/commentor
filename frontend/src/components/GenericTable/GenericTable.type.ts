import { TagTableOptionsType } from 'src/pages/Tags/columnsConfig';
import { CommentTableOptionsType } from 'src/pages/Comments/columnsConfig';

export type OptionsType = TagTableOptionsType | CommentTableOptionsType;

export type ColumnType<T extends OptionsType> = {
  index: number;
  key: string;
  name: string;
  columnWidth: number;
  renderer: (
    key: string,
    value: any,
    objectId: number | 'id',
    style: Object,
    options: T,
  ) => JSX.Element;
};

export type RendererInputType = {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: Object;
};
