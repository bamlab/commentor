import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { BarChartSection as BarChartSectionComponent } from './BarChartSection';
import { getBarChartData } from '../../../../redux/Comment';
import { getGroupBy } from 'redux/Filters';

const mapStateToProps = (state: RootState) => ({
  barChartData: getBarChartData(state),
  groupBy: getGroupBy(state),
});

const mapDispatchToProps = () => ({});

export const BarChartSection = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BarChartSectionComponent);
