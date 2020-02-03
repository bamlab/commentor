import React, { useState, useEffect } from 'react';
import { PieChartContainer } from './PieChart.style';
import { VictoryPie, VictoryTheme } from 'victory';
import { colorUsage } from 'stylesheet';
import { TagType } from 'redux/Tag';

interface propTypes {
  data: { x: number | string; y: number; tag: TagType }[];
}

const PieChart: React.FunctionComponent<propTypes> = props => {
  const [angle, setAngle] = useState(0);

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
          theme={VictoryTheme.material}
          innerRadius={20}
          cornerRadius={5}
          padAngle={5}
          animate={{ duration: 1000 }}
          endAngle={angle}
          style={{
            data: {
              fill: ({ datum }) => (datum.tag ? datum.tag.color : colorUsage.error),
            },
          }}
          data={props.data}
        />
      )}
    </PieChartContainer>
  );
};

export default PieChart;
