import { filterTagsWithCodes } from '../comment.utils';
import { Tag } from '../../tag/tag.entity';

describe('AppController', () => {
  const tag1: Tag = {
    id: 123,
    code: '1',
    description: 'babla',
    color: 'red',
    githubLogin: 'amauryw',
    isDefault: false,
    creationDate: new Date(),
  };

  const tagRefacto: Tag = {
    id: 13,
    code: '♻️',
    description: 'refacto',
    color: 'red',
    githubLogin: null,
    isDefault: true,
    creationDate: new Date(),
  };

  const tagFire: Tag = {
    id: 1,
    code: '🔥',
    description: 'fire',
    color: 'red',
    githubLogin: 'maximes',
    isDefault: false,
    creationDate: new Date(),
  };

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
