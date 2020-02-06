import { connect } from 'react-redux';
import { MultiSelect, adaptRequesterToMultiSelectOptions, adaptSelectedRequestersFromIds } from '../MultiSelect';
import { ISelectedOptionsType } from '../MultiSelect/MultiSelect.type';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { getSelectedRequesterIds } from 'redux/Filters';
import { getAvailableDevsFromComments } from 'redux/Comment';
import { selectRequesterIds } from '../../redux/Filters/filters.actions';

const mapStateToProps = (state: RootState) => ({
  selectedOptions: adaptSelectedRequestersFromIds(
    getSelectedRequesterIds(state),
    getAvailableDevsFromComments(state),
  ),
  options: adaptRequesterToMultiSelectOptions(getAvailableDevsFromComments(state)),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectOptions: (selectedOptions: ISelectedOptionsType[]) =>
    dispatch(selectRequesterIds.request({ requesterIds: selectedOptions })),
});


export const DevMultiSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiSelect);
