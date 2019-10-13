export type ColumnType = {
  index: number;
  key: string;
  name: string;
  columnWidth: number;
  renderer: (key: string, value: any, objectId: number | 'id', style?: Object) => JSX.Element;
};

export type RendererInputType = {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style?: Object;
};