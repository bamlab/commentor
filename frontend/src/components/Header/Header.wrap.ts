import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import Header from './Header';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
