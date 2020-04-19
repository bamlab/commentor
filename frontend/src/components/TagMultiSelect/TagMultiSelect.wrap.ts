import { connect } from 'react-redux';
import {
  MultiSelect,
  adaptTagToMultiSelectOptions,
  adaptSelectedTagsFromCodes,
} from '../MultiSelect';
import { ISelectedOptionsType } from '../MultiSelect/MultiSelect.type';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { getSelectedTagCodes } from 'redux/Filters';
import { getTags } from 'redux/Tag';
import { selectTagCodes } from '../../redux/Filters/filters.actions';
import tagIcon from './assets/tag-icon.svg';

const mapStateToProps = (state: RootState) => ({
  selectedOptions: adaptSelectedTagsFromCodes(getSelectedTagCodes(state), getTags(state)),
  options: adaptTagToMultiSelectOptions(getTags(state)),
  icon: tagIcon,
  title: 'Tag',
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectOptions: (selectedOptions: ISelectedOptionsType[]) =>
    dispatch(selectTagCodes.request({ tagCodes: selectedOptions })),
});

export const TagMultiSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiSelect);
