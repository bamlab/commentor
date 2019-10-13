import { state } from '__fixtures__/state';
import { getTags, isTagLoading, getErrorMessage, getSelectedTagId } from '../tag.selectors';
import { TagType } from '..';

const tags: TagType[] = [];
const initialState = {
  ...state,
  tag: { tags, isLoading: true, tagError: 'some error', selectedTagId: 23 },
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

  describe('getErrorMessage function', () => {
    it('Should return the value stored in store.comment.isLoading', () => {
      expect(getErrorMessage(initialState)).toEqual('some error');
    });
  });
  describe('getSelectedTagId function', () => {
    it('Should return the value stored in store.comment.isLoading', () => {
      expect(getSelectedTagId(initialState)).toEqual(23);
    });
  });
});
