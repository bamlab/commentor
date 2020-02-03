import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { LinkCellIcon } from './LinkCellIcon';
import { Dispatch } from 'redux';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkCellIcon);
