import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { BarChartCard as BarChartCardComponent } from './BarChartCard';
import { getFilters } from '../../../../redux/Filters';

const mapStateToProps = (state: RootState) => ({
  filters: getFilters(state),
});

const mapDispatchToProps = () => ({});

export const BarChartCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BarChartCardComponent);
