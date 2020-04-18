import { connect } from 'react-redux';
import {
  MultiSelect,
  adaptRequesterToMultiSelectOptions,
  adaptSelectedRequestersFromIds,
} from '../MultiSelect';
import { ISelectedOptionsType } from '../MultiSelect/MultiSelect.type';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { getSelectedRequesterIds } from 'redux/Filters';
import { getAvailableRequestersFromComments } from 'redux/Comment';
import { selectRequesterIds } from '../../redux/Filters/filters.actions';
import userIcon from './assets/user-icon.svg';

const mapStateToProps = (state: RootState) => ({
  selectedOptions: adaptSelectedRequestersFromIds(
    getSelectedRequesterIds(state),
    getAvailableRequestersFromComments(state),
  ),
  options: adaptRequesterToMultiSelectOptions(getAvailableRequestersFromComments(state)),
  icon: userIcon,
  title: 'Requester',
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectOptions: (selectedOptions: ISelectedOptionsType[]) =>
    dispatch(selectRequesterIds.request({ requesterIds: selectedOptions })),
});

export const RequesterMultiSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiSelect);
