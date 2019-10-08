import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, number, date, withKnobs } from '@storybook/addon-knobs';
import { CommentsTable } from './CommentsTable';

storiesOf('CommentsTable', module)
  .addDecorator(withKnobs)

  .add('with empty comments', () => <CommentsTable comments={[]} />)
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
    const creationDate: Date = date('creationDate', new Date());

    return (
      <CommentsTable
        comments={[
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
