import React, { useState, useEffect } from 'react';
import { PieChartContainer } from './PieChart.style';
import { VictoryPie, VictoryTheme } from 'victory';
import { TagType } from 'redux/Tag';
import { colorUsage, fontFamily, fontSize } from 'stylesheet';

interface propTypes {
  data: { x: number | string; y: number; tag: TagType }[];
}

const PieChart = React.memo<propTypes>(props => {
  const [angle, setAngle] = useState(0);

  const ticksLabelsStyle = {
    fill: colorUsage.primaryTextColor,
    fontSize: fontSize.XSmall,
    fontFamily: fontFamily.main,
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
          height={350}
          width={350}
          theme={VictoryTheme.material}
          innerRadius={70}
          padAngle={3}
          animate={{ duration: 1000 }}
          endAngle={angle}
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
