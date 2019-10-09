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
    key: 'body',
    name: 'body',
    columnWidth: 300,
  },
  {
    index: 2,
    key: 'filePath',
    name: 'filePath',
    columnWidth: 300,
  },
  {
    index: 3,
    key: 'url',
    name: 'url',
    columnWidth: 300,
  },
  {
    index: 4,
    key: 'commentor',
    name: 'commentor',
    columnWidth: 200,
  },
  {
    index: 5,
    key: 'pullRequestUrl',
    name: 'pullRequestUrl',
    columnWidth: 200,
  },
  {
    index: 6,
    key: 'repositoryId',
    name: 'repositoryId',
    columnWidth: 200,
  },
  {
    index: 6,
    key: 'creationDate',
    name: 'creationDate',
    columnWidth: 200,
  },
];

export const fixedColumnCount = 2; // this is the reference
