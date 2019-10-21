import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { selectProjectIds } from './filters.actions';

export type FiltersAction = ActionType<typeof selectProjectIds.request>;

export type FiltersState = Readonly<{
  selectedProjectIds: number[];
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
        selectedProjectIds: typedAction.payload.selectedProjectIds.map(item =>
          parseInt(item.value),
        ),
      };
    default:
      return state;
  }
};

export default reducer;
