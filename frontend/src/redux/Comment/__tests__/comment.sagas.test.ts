import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { getType } from 'typesafe-actions';

import client from 'services/networking/client';

import { loadComments, loadPieChartData, loadBarChartData } from '../comment.actions';
import { loadCommentsSaga } from '../comment.sagas';
import { getFilters } from '../../Filters';
import { getUser } from '../../Authentication';

const loadCommentsRequestAction = loadComments.request({});
const mockedUser = {
  oAuthLogin: 'amauryw',
};
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
            [
              matchers.call.fn(client.fetchCommentData),
              { comments, pieChartData: [], barChartData: [] },
            ],
            [matchers.select(getFilters), mockedFilters],
            [matchers.select(getUser), mockedUser],
          ])
          .put(loadComments.success({ comments }))
          .put(loadPieChartData.success({ pieChartData: [] }))
          .put(loadBarChartData.success({ barChartData: [] }))
          .run();
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();
        return expectSaga(loadCommentsSaga, loadCommentsRequestAction)
          .provide([
            [matchers.call.fn(client.fetchCommentData), throwError(error)],
            [matchers.select(getFilters), mockedFilters],
            [matchers.select(getUser), mockedFilters],
          ])
          .put(loadComments.failure({ errorMessage: error.message }))
          .not.put.actionType(getType(loadComments.success))
          .not.put.actionType(getType(loadPieChartData.success))
          .not.put.actionType(getType(loadBarChartData.success))
          .run();
      });
    });
  });
});
