import React, { useState, useEffect } from 'react';
import { StyledGraphs } from './Graphs.style';
import { TagType } from 'redux/Tag';
import { Doughnut } from 'react-chartjs-2';
import { CommentType } from 'redux/Comment';
import Toggle from 'components/Toggle';
import BarChart from 'components/BarChart';
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

  const getTagLabels = (tags: TagType[]): string[] => {
    let data = tags.map(data => data.code);
    data.push('⁉️'); // add no label label
    return data;
  };

  const getTagColor = (tags: TagType[]): string[] => {
    let data = tags.map(data => data.color);
    data.push('#000'); // add no label color
    return data;
  };

  // ths is best-effort 😇
  const getCommentData = (comments: CommentType[], tags: TagType[]): number[] => {
    const labels = tags.map(data => data.code);
    let data: number[] = new Array(labels.length + 1); // add no label label
    data.fill(0);
    comments.forEach(comment => {
      let noMatch = true;
      labels.forEach((label, index) => {
        if (comment.body.match(label)) {
          noMatch = false;
          data[index] += 1;
        }
      });
      if (noMatch) {
        data[labels.length] += 1;
      }
    });
    return data;
  };

  const data = {
    labels: getTagLabels(props.tags),
    datasets: [
      {
        data: getCommentData(props.comments, props.tags),
        backgroundColor: getTagColor(props.tags),
        hoverBackgroundColor: getTagColor(props.tags).map(() => '#51d'),
      },
    ],
  };

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
        return <Doughnut data={data} />;
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
