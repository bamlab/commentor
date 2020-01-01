import { connect } from 'react-redux';
import Home from './Home';
import { loadRepositories } from 'redux/Repository/repository.actions';
import { isAuthenticated } from 'redux/Authentication/authentication.selectors';
import { login } from 'redux/Authentication/authentication.actions';
import { RootState } from 'redux/types';
import { Dispatch } from 'react';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: isAuthenticated(state),
});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadRepositories: () => dispatch(loadRepositories.request({})),
  login: (code: string) => dispatch(login.request({ code })),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
