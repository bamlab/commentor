import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { PieChartSection as PieChartSectionComponent } from './PieChartSection';
import { getPieChartData } from '../../../../redux/Comment';
import { getTags } from '../../../../redux/Tag';

const mapStateToProps = (state: RootState) => ({
  pieChartData: getPieChartData(state),
  tags: getTags(state),
});

const mapDispatchToProps = () => ({});

export const PieChartSection = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PieChartSectionComponent);
