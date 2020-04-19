import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { compose } from 'recompose';
import { Dispatch } from 'react';
import { login } from 'redux/Authentication/authentication.actions';
import { isAuthenticated } from 'redux/Authentication/authentication.selectors';
import { withRouter } from 'react-router-dom';
import Login from './Login';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: isAuthenticated(state),
});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (code: string) => dispatch(login.request({ code })),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
  // @ts-ignore
)(Login);
