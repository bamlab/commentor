import { connect } from 'react-redux';
import { MultiSelect, adaptDevToMultiSelectOptions, adaptSelectedDevsFromIds } from '../MultiSelect';
import { ISelectedOptionsType } from '../MultiSelect/MultiSelect.type';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { getSelectedDevIds } from 'redux/Filters';
import { getAvailableDevsFromComments } from 'redux/Comment';
import { selectDevIds } from '../../redux/Filters/filters.actions';

const mapStateToProps = (state: RootState) => ({
  selectedOptions: adaptSelectedDevsFromIds(
    getSelectedDevIds(state),
    getAvailableDevsFromComments(state),
  ),
  options: adaptDevToMultiSelectOptions(getAvailableDevsFromComments(state)),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectOptions: (selectedOptions: ISelectedOptionsType[]) =>
    dispatch(selectDevIds.request({ devIds: selectedOptions })),
});


export const DevMultiSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiSelect);
