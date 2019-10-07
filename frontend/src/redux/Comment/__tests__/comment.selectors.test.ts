import { state } from '__fixtures__/state';
import { getComments } from '../comment.selectors';
import { CommentType } from '..';

const comments: CommentType[] = [];
const initialState = { ...state, comment: { comments } };

describe('Comments selectors', () => {
  describe('getComments function', () => {
    it('Should return the value stored in store.login.token', () => {
      expect(getComments(initialState)).toBe(comments);
    });
  });
});
