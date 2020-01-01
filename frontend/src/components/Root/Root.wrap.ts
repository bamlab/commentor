import { connect } from 'react-redux';
import Root from './Root';
import { isAuthenticated } from 'redux/Authentication/authentication.selectors';
import { login } from 'redux/Authentication/authentication.actions';
import { RootState } from 'redux/types';
import { Dispatch } from 'react';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: isAuthenticated(state),
});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);
