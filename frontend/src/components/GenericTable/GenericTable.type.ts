import { TagTableOptionsType } from 'src/pages/Tags/columnsConfig';
import { CommentTableOptionsType } from 'src/pages/Home/columnsConfig';

export type OptionsType = TagTableOptionsType | CommentTableOptionsType;

export type ColumnType<T extends OptionsType> = {
  index: number;
  key: string;
  name: string;
  columnWidth: number;
  backgroundColor?: string;
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
