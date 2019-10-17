import { state } from '__fixtures__/state';
import { getTags, isTagLoading } from '../tag.selectors';
import { TagType } from '..';

const tags: TagType[] = [];
const initialState = {
  ...state,
  tag: { tags, isLoading: true, tagError: null },
};

describe('Tags selectors', () => {
  describe('getTags function', () => {
    it('Should return the value stored in store.tag.tags', () => {
      expect(getTags(initialState)).toBe(tags);
    });
  });

  describe('isCommentLoading function', () => {
    it('Should return the value stored in store.comment.isLoading', () => {
      expect(isTagLoading(initialState)).toBe(true);
    });
  });
});
