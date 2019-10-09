import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { TagType } from './tag.types';
import { loadTags } from './tag.actions';

export type TagAction = ActionType<
  typeof loadTags.success | typeof loadTags.failure | typeof loadTags
>;
export type TagState = Readonly<{
  tags: TagType[];
  tagError: string | null;
  isLoading: boolean;
}>;

const initialState: TagState = {
  tags: [],
  tagError: null,
  isLoading: false,
};

const reducer = (state: TagState = initialState, action: AnyAction) => {
  const typedAction = action as TagAction;
  switch (typedAction.type) {
    case getType(loadTags.success):
      return {
        ...state,
        tags: typedAction.payload.tags,
        isLoading: false,
      };
    case getType(loadTags.failure):
      return {
        ...state,
        tagError: typedAction.payload.errorMessage,
        isLoading: false,
      };
    case getType(loadTags.request):
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
