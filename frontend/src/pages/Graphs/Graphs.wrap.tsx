import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import Graphs from './Graphs';
import { Dispatch } from 'redux';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Graphs);
