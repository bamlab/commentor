import React, { useState, useEffect } from 'react';
import { StyledGraphs } from './Graphs.style';
import { TagType } from 'redux/Tag';
import { CommentType } from 'redux/Comment';
import Toggle from 'components/Toggle';
import BarChart from 'components/BarChart';
import PieChart from 'components/PieChart';
import { map, chain } from 'lodash';
import moment, { Moment } from 'moment';

interface IProps {
  tags: TagType[];
  comments: CommentType[];
  loadTags: () => void;
  loadComments: (filters: { repositoryIds: number[] }) => void;
  repositoryIds: number[];
}

const Graphs = React.memo<IProps>(props => {
  const [graphToggle, useGraphToggle] = useState('BAR_CHART');

  useEffect(() => {
    props.loadTags();
    props.loadComments({ repositoryIds: props.repositoryIds });
    // eslint-disable-next-line
  }, []);

  const pieChartFormattedData = chain(props.tags)
    .map((tag: TagType) => ({
      x: tag.code,
      y: props.comments.filter((comment: CommentType) => !!comment.body.match(tag.code)).length,
      tag,
    }))
    .filter(chartDatum => chartDatum.y > 0)
    .value();

  const barChartFormattedData = chain(props.comments)
    .groupBy((comment: CommentType) => moment(comment.creationDate).format('DD-MM-YYYY'))
    .map((comments: CommentType[], date: Moment) =>
      map(comments, (comment: CommentType) =>
        chain(props.tags)
          .filter((tag: TagType) => !!comment.body.match(tag.code))
          .map((tag: TagType) => ({ x: date, y: 1, y0: 0, tag }))
          .value(),
      ),
    )
    .flattenDeep()
    .value();

  const renderGraph = () => {
    switch (graphToggle) {
      case 'BAR_CHART':
        //@ts-ignore
        return <BarChart data={barChartFormattedData} />;
      case 'DOUGHNUT_CHART':
        return <PieChart data={pieChartFormattedData} />;
      default:
        return <div>error lol</div>;
    }
  };

  return (
    <StyledGraphs>
      <Toggle
        firstOption={'BAR_CHART'}
        secondOption={'DOUGHNUT_CHART'}
        value={graphToggle}
        onSelect={useGraphToggle}
      />
      {renderGraph()}
    </StyledGraphs>
  );
});

export default Graphs;
