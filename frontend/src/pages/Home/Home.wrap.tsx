import { connect } from 'react-redux';
import Home from './Home';
import { loadProjects } from 'redux/Project/project.actions';
import { Dispatch } from 'react';

const mapStateToProps = () => ({});

// @ts-ignore
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadProjects: () => dispatch(loadProjects.request({})),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
