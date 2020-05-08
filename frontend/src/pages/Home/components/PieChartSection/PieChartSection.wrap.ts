import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { PieChartSection as PieChartSectionComponent } from './PieChartSection';
import { getPieChartData } from '../../../../redux/Comment';

const mapStateToProps = (state: RootState) => ({
  pieChartData: getPieChartData(state),
});

const mapDispatchToProps = () => ({});

export const PieChartSection = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PieChartSectionComponent);
