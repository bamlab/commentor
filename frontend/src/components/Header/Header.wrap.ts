import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { compose } from 'recompose';
import { Dispatch } from 'react';
import { logout } from 'redux/Authentication/authentication.actions';
import { isAuthenticated } from 'redux/Authentication/authentication.selectors';
import { withRouter } from 'react-router-dom';
import Header from './Header';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: isAuthenticated(state),
});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logout.request({})),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
  // @ts-ignore
)(Header);
