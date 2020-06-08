import { filterTagsWithCodes, getMonday, convertToDateRange } from '../comment.utils';
import { Tag } from '../../tag/tag.entity';

describe('Comment utils', () => {
  describe('[Method] filterTagsWithCodes', () => {
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

  describe('[Method] commentGroupByDateRange', () => {
    const date = new Date(2020, 5, 9, 3, 5, 10);

    it('Change the time to midnight if filter is day', () => {
      const expectedResult = new Date(2020, 5, 9);
      expect(convertToDateRange(date, 'day')).toEqual(expectedResult);
    });

    it('Change the time to midnight and the date to previous monday if filter is week', () => {
      const expectedResult = getMonday(new Date(2020, 5, 9));
      expect(convertToDateRange(date, 'week')).toEqual(expectedResult);
    });

    it('Change the time to midnight and the date to first day of month if filter is month', () => {
      const expectedResult = new Date(2020, 5, 1);
      expect(convertToDateRange(date, 'month')).toEqual(expectedResult);
    });
  });

  describe('[Method] getMonday', () => {
    test.each`
      date                     | expectedResult
      ${new Date(2020, 5, 8)}  | ${new Date(2020, 5, 8)}
      ${new Date(2020, 5, 9)}  | ${new Date(2020, 5, 8)}
      ${new Date(2020, 5, 10)} | ${new Date(2020, 5, 8)}
      ${new Date(2020, 5, 11)} | ${new Date(2020, 5, 8)}
      ${new Date(2020, 5, 12)} | ${new Date(2020, 5, 8)}
      ${new Date(2020, 5, 13)} | ${new Date(2020, 5, 8)}
      ${new Date(2020, 5, 14)} | ${new Date(2020, 5, 8)}
    `('should have return the date from the previous monday', ({ date, expectedResult }) => {
      expect(getMonday(date)).toEqual(expectedResult);
    });
  });
});
