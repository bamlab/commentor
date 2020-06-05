import {
  filterTagsWithCodes,
  getPieChartFormattedData,
  getBarChartFormattedData,
} from '../comment.utils';
import { Comment } from '../comment.entity';
import { Tag } from '../../tag/tag.entity';

const tag1: Tag = {
  id: 123,
  code: '1',
  description: 'babla',
  color: 'red',
  oAuthLogin: 'amauryw',
  isDefault: false,
  creationDate: new Date(),
};

const tagRefacto: Tag = {
  id: 13,
  code: '♻️',
  description: 'refacto',
  color: 'red',
  oAuthLogin: null,
  isDefault: true,
  creationDate: new Date(),
};

const tagFire: Tag = {
  id: 1,
  code: '🔥',
  description: 'fire',
  color: 'red',
  oAuthLogin: 'maximes',
  isDefault: false,
  creationDate: new Date(),
};

const comment1: Comment = {
  id: 1,
  body: '1 comment',
  filePath: 'filePath',
  url: 'url',
  commentor: 'commentor',
  requester: 'requester',
  pullRequestUrl: 'pullRequestUrl',
  repositoryId: 1,
  creationDate: new Date('2020-01-01T11:00:00.000Z'),
};

const commentWithoutTag: Comment = {
  id: 2,
  body: 'no tag comment',
  filePath: 'filePath',
  url: 'url',
  commentor: 'commentor',
  requester: 'requester',
  pullRequestUrl: 'pullRequestUrl',
  repositoryId: 2,
  creationDate: new Date('2020-01-01T11:00:00.000Z'),
};

const commentFire1: Comment = {
  id: 3,
  body: '🔥 comment',
  filePath: 'filePath',
  url: 'url',
  commentor: 'commentor',
  requester: 'requester',
  pullRequestUrl: 'pullRequestUrl',
  repositoryId: 1,
  creationDate: new Date('2021-11-11T11:00:00.000Z'),
};

const commentFire2: Comment = {
  id: 4,
  body: '🔥 comment2',
  filePath: 'filePath',
  url: 'url',
  commentor: 'commentor',
  requester: 'requester',
  pullRequestUrl: 'pullRequestUrl',
  repositoryId: 2,
  creationDate: new Date('2020-01-01T11:00:00.000Z'),
};

const fetchedComments = [commentFire1, comment1, commentWithoutTag, commentFire2];
const filteredTags = [tag1, tagFire];

describe('Comment utils', () => {
  describe('[Method] filterTagsWithCodes', () => {
    test.each`
      tags                           | codes                | expectedResult
      ${[]}                          | ${[]}                | ${[]}
      ${[tag1]}                      | ${[]}                | ${[tag1]}
      ${[tag1]}                      | ${['1']}             | ${[tag1]}
      ${[tag1]}                      | ${['1', '♻️']}       | ${[tag1]}
      ${[tag1, tagRefacto]}          | ${['1', '♻️']}       | ${[tag1, tagRefacto]}
      ${[tag1, tagRefacto]}          | ${['1']}             | ${[tag1]}
      ${[tag1, tagRefacto, tagFire]} | ${['1']}             | ${[tag1]}
      ${[tag1, tagRefacto, tagFire]} | ${['1', '🔥']}       | ${[tag1, tagFire]}
      ${[tag1, tagRefacto, tagFire]} | ${['1', '♻️', '🔥']} | ${[tag1, tagRefacto, tagFire]}
      ${[]}                          | ${['1', '♻️', '🔥']} | ${[]}
    `(
      'should the expected value',

      ({ tags, codes, expectedResult }) => {
        expect(filterTagsWithCodes(tags, codes)).toEqual(expectedResult);
      },
    );
  });

  describe('[Method] getPieChartFormattedData', () => {
    expect(getPieChartFormattedData(fetchedComments, filteredTags)).toEqual([
      {
        x: tag1.code,
        y: 1,
        tag: tag1,
      },
      {
        x: tagFire.code,
        y: 2,
        tag: tagFire,
      },
    ]);
  });

  describe('[Method] getBarChartFormattedData', () => {
    expect(getBarChartFormattedData(fetchedComments, filteredTags)).toEqual([
      {
        x: comment1.creationDate,
        y: 1,
        y0: 0,
        tag: tag1,
      },
      {
        x: commentFire2.creationDate,
        y: 1,
        y0: 0,
        tag: tagFire,
      },
      {
        x: commentFire1.creationDate,
        y: 1,
        y0: 0,
        tag: tagFire,
      },
    ]);
  });
});
