import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, number, date, withKnobs } from '@storybook/addon-knobs';
import { GenericTable } from './GenericTable';

const columnsConfig = [
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

storiesOf('GenericTable', module)
  .addDecorator(withKnobs)

  .add('with empty comments', () => (
    <GenericTable values={[]} fixedColumnCount={2} columnsConfig={columnsConfig} />
  ))
  .add('playground', () => {
    const id = number('id', 1);
    const body = text('body', 'body');
    const filePath = text('body', 'filePath');
    const url = text('body', 'url');
    const commentor = text('body', 'commentor');
    const requester = text('body', 'requester');
    const pullRequestUrl = text('body', 'pullRequestUrl');
    const repositoryId = number('id', 123421);
    // @ts-ignore date is connsidered as number where creationDate is Date
    const creationDate: Date = date('creationDate', new Date('2019-10-09T20:35:55.068Z'));
    const fixedColumnCount = number('id', 1);
    return (
      <GenericTable
        columnsConfig={columnsConfig}
        fixedColumnCount={fixedColumnCount}
        values={[
          {
            id,
            body,
            filePath,
            url,
            commentor,
            requester,
            pullRequestUrl,
            repositoryId,
            creationDate,
          },
        ]}
      />
    );
  });
