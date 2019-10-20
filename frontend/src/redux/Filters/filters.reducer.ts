import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { selectProjectIds } from './filters.actions';
import { ISelectedOptionsType } from './filters.type';

export type FiltersAction = ActionType<typeof selectProjectIds.request>;

export type FiltersState = Readonly<{
  selectedProjectIds: ISelectedOptionsType[];
}>;

const initialState: FiltersState = {
  selectedProjectIds: [],
};

const reducer = (state: FiltersState = initialState, action: AnyAction) => {
  const typedAction = action as FiltersAction;
  switch (typedAction.type) {
    case getType(selectProjectIds.request):
      return {
        ...state,
        selectedProjectIds: typedAction.payload.selectedProjectIds,
      };
    default:
      return state;
  }
};

export default reducer;
