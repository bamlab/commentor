export type ColumnType = {
  index: number;
  key: string;
  name: string;
  columnWidth: number;
  // renderer: ({ columnIndex, key, rowIndex, style }: RendererInputType) => JSX.Element;
};

export type RendererInputType = {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style?: Object;
};
