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

const reducer = (state: GraphDataState = initialState, action: AnyAction): GraphDataState => {
  const typedAction = action as GraphDataAction;
  switch (typedAction.type) {
    case getType(loadTagsOverTime.request):
      return {
        ...state,
        isLoading: true,
        tagsOverTimeError: null,
      };
    case getType(loadTagsOverTime.success):
      return {
        ...state,
        isLoading: false,
        tagsOverTimeError: null,
        tagsOverTime: typedAction.payload.tagsOverTime,
      };
    case getType(loadTagsOverTime.failure):
      return {
        ...state,
        tagsOverTimeError: 'Error',
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
