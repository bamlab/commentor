import { state } from '__fixtures__/state';
import { getComments, isCommentLoading } from '../comment.selectors';
import { CommentType } from '..';

const comments: CommentType[] = [];
const initialState = { ...state, comment: { comments, isLoading: true } };

describe('Comments selectors', () => {
  describe('getComments function', () => {
    it('Should return the value stored in store.comment.comments', () => {
      expect(getComments(initialState)).toBe(comments);
    });
  });

  describe('isCommentLoading function', () => {
    it('Should return the value stored in store.comment.isLoading', () => {
      expect(isCommentLoading(initialState)).toBe(true);
    });
  });
});
