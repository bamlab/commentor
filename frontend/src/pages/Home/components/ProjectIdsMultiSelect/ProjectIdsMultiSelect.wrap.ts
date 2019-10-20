import { connect } from 'react-redux';
import { MultiSelect, adaptProjectToMultiSelectOptions } from '../../../../components/MultiSelect';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { getSelectedProjectIds } from 'redux/Filters';
import { ISelectedOptionsType } from 'redux/Filters/filters.type';
import { selectProjectIds } from 'redux/Filters/filters.actions';
import { getProjects } from 'redux/Project';

const mapStateToProps = (state: RootState) => ({
  selectedOptions: getSelectedProjectIds(state),
  options: adaptProjectToMultiSelectOptions(getProjects(state)),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectOptions: (selectedOptions: ISelectedOptionsType[]) =>
    dispatch(selectProjectIds.request({ selectedProjectIds: selectedOptions })),
});

export const ProjectIdsMultiSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
  //@ts-ignore
)(MultiSelect);
