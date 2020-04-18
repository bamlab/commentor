import React, { useState, useEffect } from 'react';
import { PieChartContainer } from './PieChart.style';
import { VictoryPie } from 'victory';
import { TagType } from 'redux/Tag';
import { colorUsage, fontStyles } from 'stylesheet';

interface propTypes {
  data: { x: number | string; y: number; tag: TagType }[];
}

const PieChart = React.memo<propTypes>(props => {
  const [angle, setAngle] = useState(0);

  const ticksLabelsStyle = {
    fill: colorUsage.text,
    ...fontStyles.small,
  };

  useEffect(() => {
    setTimeout(() => {
      setAngle(360);
    }, 100);
  }, []);

  return (
    <PieChartContainer>
      {props.data && props.data.length > 0 && (
        <VictoryPie
          height={300}
          width={300}
          innerRadius={55}
          padAngle={3}
          animate={{ duration: 1000 }}
          endAngle={angle}
          labels={() => ''}
          style={{
            labels: { ...ticksLabelsStyle },
            data: {
              fill: ({ datum }) => (datum.tag ? datum.tag.color : colorUsage.error),
            },
          }}
          data={props.data}
        />
      )}
    </PieChartContainer>
  );
});

export default PieChart;
