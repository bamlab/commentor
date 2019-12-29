/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { LocationChangeAction, RouterState } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';

import { reducer as comment } from './Comment';
import { reducer as tag } from './Tag';
import { reducer as filters } from './Filters';
import { reducer as repository } from './Repository';
import { RootAction, RootState } from './types';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers: {
  router: Reducer<RouterState, LocationChangeAction>;
}) {
  return combineReducers<RootState, RootAction>({
    ...asyncReducers,
    comment,
    tag,
    filters,
    repository,
  });
}
