import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { BarChartCard as BarChartCardComponent } from './BarChartCard';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = () => ({});

export const BarChartCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BarChartCardComponent);
