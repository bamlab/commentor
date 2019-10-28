import { connect } from 'react-redux';
import Home from './Home';
import { loadRepositories } from 'redux/Repository/repository.actions';
import { Dispatch } from 'react';

const mapStateToProps = () => ({});

// @ts-ignore Generic type 'Dispatch' requires 1 type argument(s)
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadRepositories: () => dispatch(loadRepositories.request({})),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
