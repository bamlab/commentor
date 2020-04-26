import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { TagsOverTimeType } from './graphData.types';
import { loadTagsOverTime } from './graphData.actions';

export type GraphDataAction = ActionType<
  typeof loadTagsOverTime.success | typeof loadTagsOverTime.failure | typeof loadTagsOverTime
>;

export type GraphDataState = Readonly<{
  tagsOverTime: TagsOverTimeType;
  tagsOverTimeError: string | null;
  isLoading: boolean;
}>;

const initialState: GraphDataState = {
  tagsOverTime: [],
  tagsOverTimeError: null,
  isLoading: false,
};

const reducer = (state: GraphDataState = initialState, action: AnyAction) => {
  const typedAction = action as GraphDataAction;
  switch (typedAction.type) {
    default:
      return state;
  }
};

export default reducer;
