import { ColumnType } from 'components/GenericTable/GenericTable.type';

export const columnsConfig: ColumnType[] = [
  {
    index: 0,
    key: 'id',
    name: 'id',
    columnWidth: 75,
  },
  {
    index: 1,
    key: 'code',
    name: 'code',
    columnWidth: 300,
  },
  {
    index: 2,
    key: 'description',
    name: 'decription',
    columnWidth: 300,
  },
  {
    index: 6,
    key: 'creationDate',
    name: 'creationDate',
    columnWidth: 200,
  },
];

export const fixedColumnCount = 0; // this is the reference
