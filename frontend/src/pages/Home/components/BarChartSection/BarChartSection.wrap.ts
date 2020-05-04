import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { BarChartSection as BarChartSectionComponent } from './BarChartSection';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = () => ({});

export const BarChartSection = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BarChartSectionComponent);
