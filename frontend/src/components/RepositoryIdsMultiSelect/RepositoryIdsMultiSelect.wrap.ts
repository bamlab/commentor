import { connect } from 'react-redux';
import {
  MultiSelect,
  adaptRepositoryToMultiSelectOptions,
  adaptOptionFromId,
} from '../MultiSelect';
import { ISelectedOptionsType } from '../MultiSelect/MultiSelect.type';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { getSelectedRepositoryIds } from 'redux/Filters/filters.selectors';
import { selectRepositoryIds } from 'redux/Filters/filters.actions';
import { getRepositories, isRepositoriesLoading } from 'redux/Repository/repository.selectors';
import projectIcon from './assets/projects-icon.svg';

const mapStateToProps = (state: RootState) => ({
  isLoading: isRepositoriesLoading(state),
  selectedOptions: adaptOptionFromId(getSelectedRepositoryIds(state), getRepositories(state)),
  options: adaptRepositoryToMultiSelectOptions(getRepositories(state)),
  icon: projectIcon,
  title: 'Project',
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectOptions: (selectedOptions: ISelectedOptionsType[]) =>
    dispatch(selectRepositoryIds.request({ repositoryIds: selectedOptions })),
});

export const RepositoryIdsMultiSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiSelect);
