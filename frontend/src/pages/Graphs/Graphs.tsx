import React from 'react';
import { StyledGraphs } from './Graphs.style';

interface IProps {}

const Graphs = React.memo<IProps>(props => {
  return <StyledGraphs>COUCOU</StyledGraphs>;
});

export default Graphs;
