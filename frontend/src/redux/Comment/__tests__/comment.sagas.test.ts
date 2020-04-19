import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { getType } from 'typesafe-actions';

import client from 'services/networking/client';

import { loadComments } from '../comment.actions';
import { loadCommentsSaga } from '../comment.sagas';
import { getFilters } from '../../Filters';

const loadCommentsRequestAction = loadComments.request({});
const mockedFilters = {
  repositoryIds: [],
  endingDate: null,
  startingDate: null,
  requesterIds: [],
  commentorIds: [],
  tagCodes: [],
};
const comments = [
  {
    id: 2,
    body: 'ed',
    filePath: 'weff',
    url: 'wffew',
    commentor: 'Amaury',
    requester: 'wfwef',
    pullRequestUrl: 'ewffew',
    repositoryId: 31312,
    creationDate: new Date(),
  },
];

describe('[Saga] Comment redux', () => {
  describe('loadComments', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success', async () => {
        return expectSaga(loadCommentsSaga, loadCommentsRequestAction)
          .provide([
            [matchers.call.fn(client.fetchComments), comments],
            [matchers.select(getFilters), mockedFilters],
          ])
          .put(loadComments.success({ comments }))
          .run();
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();
        return expectSaga(loadCommentsSaga, loadCommentsRequestAction)
          .provide([
            [matchers.call.fn(client.fetchComments), throwError(error)],
            [matchers.select(getFilters), mockedFilters],
          ])
          .put(loadComments.failure({ errorMessage: error.message }))
          .not.put.actionType(getType(loadComments.success))
          .run();
      });
    });
  });
});
