import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { TagType } from './tag.types';
import { loadTags, addTag, deleteTag, updateTag, selectTag } from './tag.actions';

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
  | typeof updateTag.success
  | typeof updateTag.failure
  | typeof updateTag
  | typeof selectTag.request
>;

export type TagState = Readonly<{
  tags: TagType[];
  tagError: string | null;
  isLoading: boolean;
  selectedTagId: number | null;
}>;

const initialState: TagState = {
  tags: [],
  tagError: null,
  isLoading: false,
  selectedTagId: null,
};

const reducer = (state: TagState = initialState, action: AnyAction) => {
  const typedAction = action as TagAction;
  switch (typedAction.type) {
    case getType(selectTag.request):
      return {
        ...state,
        selectedTagId: typedAction.payload.tagId,
      };
    case getType(addTag.success):
      return {
        ...state,
        tags: [...state.tags, typedAction.payload.tag],
        isLoading: false,
        tagError: null,
      };
    case getType(loadTags.success):
      return {
        ...state,
        tags: typedAction.payload.tags,
        isLoading: false,
        tagError: null,
      };
    case getType(addTag.failure):
    case getType(loadTags.failure):
    case getType(deleteTag.failure):
    case getType(updateTag.failure):
      return {
        ...state,
        tagError: typedAction.payload.errorMessage,
        isLoading: false,
      };
    case getType(addTag.request):
    case getType(deleteTag.request):
    case getType(loadTags.request):
    case getType(updateTag.request):
      return {
        ...state,
        isLoading: true,
      };
    case getType(deleteTag.success):
      return {
        ...state,
        isLoading: false,
        tagError: null,
        tags: state.tags.filter(tag => tag.id !== typedAction.payload.tagId),
      };
    case getType(updateTag.success):
      return {
        ...state,
        isLoading: false,
        tagError: null,
        tags: state.tags.map(tag =>
          tag.id === typedAction.payload.tag.id ? typedAction.payload.tag : tag,
        ),
      };
    default:
      return state;
  }
};

export default reducer;
