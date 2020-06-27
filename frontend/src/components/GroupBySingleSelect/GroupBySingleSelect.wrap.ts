import { connect } from 'react-redux';
import { SingleSelect } from '../SingleSelect';
import { ISelectedOptionsType } from '../MultiSelect/MultiSelect.type';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { getGroupBy } from 'redux/Filters';
import { selectGroupBy } from '../../redux/Filters/filters.actions';
import { adaptGroupByToSingleSelectOptions } from 'components/SingleSelect/SingleSelect.adapter';

const mapStateToProps = (state: RootState) => ({
  selectedOption: adaptGroupByToSingleSelectOptions(getGroupBy(state)),
  options: [
    adaptGroupByToSingleSelectOptions('day'),
    adaptGroupByToSingleSelectOptions('week'),
    adaptGroupByToSingleSelectOptions('month'),
  ],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectOption: (selectedOption: ISelectedOptionsType) =>
    dispatch(selectGroupBy.request({ groupBy: selectedOption })),
});

export const GroupBySingleSelect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleSelect);
