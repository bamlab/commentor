import { connect } from 'react-redux';
import {
  MultiSelect,
  adaptTagToMultiSelectOptions,
  adaptSelectedTagsFromIds,
} from '../MultiSelect';
import { ISelectedOptionsType } from '../MultiSelect/MultiSelect.type';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { getSelectedTagIds } from 'redux/Filters';
import { getTags } from 'redux/Tag';
import { selectTagIds } from '../../redux/Filters/filters.actions';

const mapStateToProps = (state: RootState) => ({
  selectedOptions: adaptSelectedTagsFromIds(getSelectedTagIds(state), getTags(state)),
  options: adaptTagToMultiSelectOptions(getTags(state)),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectOptions: (selectedOptions: ISelectedOptionsType[]) =>
    dispatch(selectTagIds.request({ tagIds: selectedOptions })),
});

export const TagMultiSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiSelect);
