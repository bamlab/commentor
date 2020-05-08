import { loadComments } from '../comment.actions';
import reducer from '../comment.reducer';

const initialState = {
  comments: [],
  isLoading: false,
  commentError: null,
  availableRequesters: [],
  availableCommentors: [],
  pieChartData: [],
};
const defaultComment = {
  id: 2,
  body: 'ed',
  filePath: 'weff',
  url: 'wffew',
  commentor: 'Amaury',
  requester: 'MaximeS',
  pullRequestUrl: 'ewffew',
  repositoryId: 31312,
  creationDate: new Date(),
};

describe('Comment reducer', () => {
  describe('GET_COMMENT_SUCCESS case', () => {
    it('Should return an initial state with comments in the comments field', () => {
      const action = loadComments.success({
        comments: [defaultComment],
      });
      const expectedState = {
        ...initialState,
        comments: [defaultComment],
        availableCommentors: ['Amaury'],
        availableRequesters: ['MaximeS'],
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('USER_LOGIN_FAILURE case', () => {
    it('Should return an initial state with an error in the loginError field', () => {
      const errorMessage = 'Could not get comments from server';
      const action = loadComments.failure({ errorMessage });
      const expectedState = { ...initialState, commentError: errorMessage };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('USER_LOGIN_REQUESt case', () => {
    it('Should return an initial state loading true', () => {
      const action = loadComments.request({});
      const expectedState = { ...initialState, isLoading: true };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
