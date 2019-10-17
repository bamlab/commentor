import { loadTags } from '../tag.actions';
import reducer from '../tag.reducer';

const initialState = { tags: [], isLoading: false, tagError: null };
const defaultTag = {
  id: 2,
  code: 'refacto',
  description: 'this is refacto done with mistake',
  creationDate: new Date(),
};

describe('Tag reducer', () => {
  describe('GET_TAGS_SUCCESS case', () => {
    it('Should return an initial state with comments in the comments field', () => {
      const action = loadTags.success({
        tags: [defaultTag],
      });
      const expectedState = { ...initialState, tags: [defaultTag] };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_TAGS_FAILURE case', () => {
    it('Should return an initial state with an error in the loginError field', () => {
      const errorMessage = 'Could not get tags from server';
      const action = loadTags.failure({ errorMessage });
      const expectedState = { ...initialState, tagError: errorMessage };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('GET_TAGS_REQUEST case', () => {
    it('Should return an initial state loading true', () => {
      const action = loadTags.request({});
      const expectedState = { ...initialState, isLoading: true };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
