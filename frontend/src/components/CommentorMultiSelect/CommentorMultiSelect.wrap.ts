import { connect } from 'react-redux';
import {
  MultiSelect,
  adaptCommentorToMultiSelectOptions,
  adaptSelectedCommentorsFromIds,
} from '../MultiSelect';
import { ISelectedOptionsType } from '../MultiSelect/MultiSelect.type';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { getSelectedCommentords } from 'redux/Filters';
import { getAvailableCommentorsFromComments } from 'redux/Comment';
import { selectCommentorIds } from '../../redux/Filters/filters.actions';

const mapStateToProps = (state: RootState) => ({
  selectedOptions: adaptSelectedCommentorsFromIds(
    getSelectedCommentords(state),
    getAvailableCommentorsFromComments(state),
  ),
  options: adaptCommentorToMultiSelectOptions(getAvailableCommentorsFromComments(state)),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectOptions: (selectedOptions: ISelectedOptionsType[]) =>
    dispatch(selectCommentorIds.request({ commentorIds: selectedOptions })),
});

export const CommentorMultiSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiSelect);
