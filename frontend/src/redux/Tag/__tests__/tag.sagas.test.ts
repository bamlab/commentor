import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { getType } from 'typesafe-actions';

import client from 'services/networking/client';

import { loadTags } from '../tag.actions';
import { loadTagsSaga } from '../tag.sagas';

const loadTagssRequestAction = loadTags.request({});

const tags = [
  {
    id: 2,
    code: 'refacto',
    description: 'this is refacto done with mistake',
    creationDate: new Date(),
  },
];

describe('[Saga] Tag redux', () => {
  describe('loadTags', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success', async () => {
        return expectSaga(loadTagsSaga, loadTagssRequestAction)
          .provide([[matchers.call.fn(client.fetchTags), tags]])
          .put(loadTags.success({ tags }))
          .run();
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();
        return expectSaga(loadTagsSaga, loadTagssRequestAction)
          .provide([[matchers.call.fn(client.fetchTags), throwError(error)]])
          .put(loadTags.failure({ errorMessage: error.message }))
          .not.put.actionType(getType(loadTags.success))
          .run();
      });
    });
  });
});
