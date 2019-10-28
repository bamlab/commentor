import { connect } from 'react-redux';
import {
  MultiSelect,
  adaptRepositoryToMultiSelectOptions,
  adaptOptionFromId,
} from '../../../../components/MultiSelect';
import { ISelectedOptionsType } from '../../../../components/MultiSelect/MultiSelect.type';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { getSelectedRepositoryIds } from 'redux/Filters';
import { selectRepositoryIds } from 'redux/Filters/filters.actions';
import { getRepositories } from 'redux/Repository';

const mapStateToProps = (state: RootState) => ({
  selectedOptions: adaptOptionFromId(getSelectedRepositoryIds(state), getRepositories(state)),
  options: adaptRepositoryToMultiSelectOptions(getRepositories(state)),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectOptions: (selectedOptions: ISelectedOptionsType[]) =>
    dispatch(selectRepositoryIds.request({ repositoryIds: selectedOptions })),
});

export const RepositoryIdsMultiSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiSelect);
