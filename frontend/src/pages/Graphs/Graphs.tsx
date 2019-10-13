import React from 'react';
import { StyledGraphs, PieChart } from './Graphs.style';

interface IProps {}

const Graphs = React.memo<IProps>(props => {
  const data = {
    labels: ['✅', '♻️', '🛠', '🏗', '🤩'],
    datasets: [
      {
        data: [100, 50, 100, 30, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#e21313', '#faa'],
        hoverBackgroundColor: ['#aa6384', '#aaA2EB', '#aaCE56', '#aa1313', '#aaa'],
      },
    ],
  };

  return (
    <StyledGraphs>
      <PieChart data={data} />
    </StyledGraphs>
  );
});

export default Graphs;
