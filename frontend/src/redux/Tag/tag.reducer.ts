import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { TagType } from './tag.types';
import { loadTags, addTag, deleteTag } from './tag.actions';

export type TagAction = ActionType<
  | typeof loadTags.success
  | typeof loadTags.failure
  | typeof loadTags
  | typeof addTag.success
  | typeof addTag.failure
  | typeof addTag
  | typeof deleteTag.success
  | typeof deleteTag.failure
  | typeof deleteTag
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
    case getType(addTag.success):
      return {
        state,
        tags: [...state.tags, typedAction.payload.tag],
        isLoading: false,
      };
    case getType(loadTags.success):
      return {
        ...state,
        tags: typedAction.payload.tags,
        isLoading: false,
      };
    case getType(addTag.failure):
    case getType(loadTags.failure):
    case getType(deleteTag.failure):
      return {
        ...state,
        tagError: typedAction.payload.errorMessage,
        isLoading: false,
      };
    case getType(addTag.request):
    case getType(deleteTag.request):
    case getType(loadTags.request):
      return {
        ...state,
        isLoading: true,
      };
    case getType(deleteTag.success):
      return {
        ...state,
        isLoading: false,
        tags: state.tags.filter(tag => tag.id !== typedAction.payload.tagId),
      };
    default:
      return state;
  }
};

export default reducer;
