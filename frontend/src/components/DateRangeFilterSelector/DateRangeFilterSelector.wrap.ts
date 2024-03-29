import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import { DateRangeFilterSelector as DateRangeFilterSelectorComponent } from './DateRangeFilterSelector';
import { getSelectedStartingDate, getSelectedEndingDate } from '../../redux/Filters';
import { selectStartingDate, selectEndingDate } from '../../redux/Filters/filters.actions';

export interface WrapperProps {
  startingDate: Date | null;
  endingDate: Date | null;
  setStartingDate: (date: Date | null) => void;
  setEndingDate: (date: Date | null) => void;
}
const mapStateToProps = (state: RootState) => ({
  startingDate: getSelectedStartingDate(state),
  endingDate: getSelectedEndingDate(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setStartingDate: (date: Date | null) =>
    dispatch(selectStartingDate.request({ startingDate: date })),
  setEndingDate: (date: Date | null) => dispatch(selectEndingDate.request({ endingDate: date })),
});

export const DateRangeFilterSelector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DateRangeFilterSelectorComponent);
