import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, date, withKnobs } from '@storybook/addon-knobs';
import { Cell, StandardTextContainer } from 'components/GenericTable/GenericTable.style';
import { GenericTable } from './GenericTable';

const defaultCellRenderer = (
  key: string,
  displayString: string,
  style?: Record<string, any>,
): JSX.Element => {
  return (
    <Cell key={key} style={style}>
      <StandardTextContainer>{displayString}</StandardTextContainer>
    </Cell>
  );
};

const columnsConfig = [
  {
    index: 0,
    key: 'id',
    name: 'id',
    columnWidth: 10,
    renderer: (key: string, genericRow: any, style?: Record<string, any>): JSX.Element =>
      defaultCellRenderer(key, genericRow.id, style),
  },
  {
    index: 1,
    key: 'body',
    name: 'body',
    columnWidth: 30,
    renderer: (key: string, genericRow: any, style?: Record<string, any>): JSX.Element =>
      defaultCellRenderer(key, genericRow.body, style),
  },
  {
    index: 2,
    key: 'filePath',
    name: 'filePath',
    columnWidth: 20,
    renderer: (key: string, genericRow: any, style?: Record<string, any>): JSX.Element =>
      defaultCellRenderer(key, genericRow.filePath, style),
  },
  {
    index: 3,
    key: 'url',
    name: 'url',
    columnWidth: 10,
    renderer: (key: string, genericRow: any, style?: Record<string, any>): JSX.Element =>
      defaultCellRenderer(key, genericRow.url, style),
  },
  {
    index: 4,
    key: 'commentor',
    name: 'commentor',
    columnWidth: 20,
    renderer: (key: string, genericRow: any, style?: Record<string, any>): JSX.Element =>
      defaultCellRenderer(key, genericRow.commentor, style),
  },
  {
    index: 5,
    key: 'pullRequestUrl',
    name: 'pullRequestUrl',
    columnWidth: 20,
    renderer: (key: string, genericRow: any, style?: Record<string, any>): JSX.Element =>
      defaultCellRenderer(key, genericRow.pullRequestUrl, style),
  },
  {
    index: 6,
    key: 'repositoryId',
    name: 'repositoryId',
    columnWidth: 10,
    renderer: (key: string, genericRow: any, style?: Record<string, any>): JSX.Element =>
      defaultCellRenderer(key, genericRow.repositoryId, style),
  },
  {
    index: 6,
    key: 'creationDate',
    name: 'creationDate',
    columnWidth: 10,
    renderer: (key: string, genericRow: any, style?: Record<string, any>): JSX.Element =>
      defaultCellRenderer(key, genericRow.creationDate, style),
  },
];

storiesOf('GenericTable', module)
  .addDecorator(withKnobs)

  .add('with empty comments', () => (
    <GenericTable<any, any>
      values={[]}
      fixedColumnCount={2}
      columnsConfig={columnsConfig}
      options={{}}
      defaultLineHeight={300}
    />
  ))
  .add('playground', () => {
    const id = number('id', 1);
    const body = text(
      'body',
      '123210937812907329847329 fweifehwofewi fweohiewihfewo pihfiowheoifewhfewoihfewoih8472398472398472984723987',
    );
    const filePath = text('body', 'filePath');
    const url = text('body', 'url');
    const commentor = text('body', 'commentor');
    const requester = text('body', 'requester');
    const pullRequestUrl = text('body', 'pullRequestUrl');
    const repositoryId = number('id', 123421);
    // @ts-ignore date is considered as number where creationDate is Date
    const creationDate: Date = date('creationDate', new Date('2019-10-09T20:35:55.068Z'));
    const fixedColumnCount = number('id', 1);
    return (
      <GenericTable<any, any>
        columnsConfig={columnsConfig}
        fixedColumnCount={fixedColumnCount}
        defaultLineHeight={600}
        options={{}}
        values={[
          {
            id,
            body: 'coucou',
            filePath: 'vor',
            url: 'vor',
            commentor: 'vor',
            requester: 'vor',
            pullRequestUrl: 'vor',
            repositoryId: 'vor',
            creationDate: new Date('2019-10-09T20:35:55.068Z'),
          },
          {
            id,
            body: 'coucou',
            filePath: 'vor',
            url: 'vor',
            commentor: 'vor',
            requester: 'vor',
            pullRequestUrl: 'vor',
            repositoryId: 'vor',
            creationDate: new Date('2019-10-09T20:35:55.068Z'),
          },
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
          {
            id,
            body: 'coucou',
            filePath: 'vor',
            url: 'vor',
            commentor: 'vor',
            requester: 'vor',
            pullRequestUrl: 'vor',
            repositoryId: 'vor',
            creationDate: new Date('2019-10-09T20:35:55.068Z'),
          },
        ]}
      />
    );
  });
