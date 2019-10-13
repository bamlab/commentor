import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { getType } from 'typesafe-actions';

import client from 'services/networking/client';

import { addTag, deleteTag, updateTag, loadTags } from '../tag.actions';
import { addTagSaga, updateTagSaga, deleteTagSaga, loadTagsSaga } from '../tag.sagas';

const loadTagsRequestAction = loadTags.request({});
const addTagsRequestAction = addTag.request({ code: 'code', description: 'description' });
const deleteTagsRequestAction = deleteTag.request({ tagId: 1 });
const updateTagsRequestAction = updateTag.request({
  tagId: 1,
  code: 'code',
  description: 'description',
});

const tag = {
  id: 2,
  code: 'refacto',
  description: 'this is refacto done with mistake',
  creationDate: new Date(),
};
const tags = [tag];

describe('[Saga] Tag redux', () => {
  describe('loadTags', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success', async () => {
        return expectSaga(loadTagsSaga, loadTagsRequestAction)
          .provide([[matchers.call.fn(client.fetchTags), tags]])
          .put(loadTags.success({ tags }))
          .run();
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();
        return expectSaga(loadTagsSaga, loadTagsRequestAction)
          .provide([[matchers.call.fn(client.fetchTags), throwError(error)]])
          .put(loadTags.failure({ errorMessage: error.message }))
          .not.put.actionType(getType(loadTags.success))
          .run();
      });
    });
  });

  describe('addTags', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success', async () => {
        return expectSaga(addTagSaga, addTagsRequestAction)
          .provide([[matchers.call.fn(client.addTag), tag]])
          .put(addTag.success({ tag }))
          .run();
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();
        return expectSaga(addTagSaga, loadTagsRequestAction)
          .provide([[matchers.call.fn(client.addTag), throwError(error)]])
          .put(addTag.failure({ errorMessage: error.message }))
          .not.put.actionType(getType(addTag.success))
          .run();
      });
    });
  });

  describe('update Tag', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success', async () => {
        return expectSaga(updateTagSaga, updateTagsRequestAction)
          .provide([[matchers.call.fn(client.updateTag), tag]])
          .put(updateTag.success({ tag }))
          .run();
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();
        return expectSaga(updateTagSaga, updateTagsRequestAction)
          .provide([[matchers.call.fn(client.updateTag), throwError(error)]])
          .put(updateTag.failure({ errorMessage: error.message }))
          .not.put.actionType(getType(updateTag.success))
          .run();
      });
    });
  });

  describe('delete Tag', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success', async () => {
        return expectSaga(deleteTagSaga, deleteTagsRequestAction)
          .provide([[matchers.call.fn(client.deleteTag), 3]])
          .put(deleteTag.success({ tagId: 1 }))
          .run();
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();
        return expectSaga(deleteTagSaga, deleteTagsRequestAction)
          .provide([[matchers.call.fn(client.deleteTag), throwError(error)]])
          .put(deleteTag.failure({ errorMessage: error.message }))
          .not.put.actionType(getType(deleteTag.success))
          .run();
      });
    });
  });
});
