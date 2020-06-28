import React, { useState, useEffect } from 'react';
import { PieChartContainer } from './PieChart.style';
import { VictoryPie, VictoryTooltip } from 'victory';
import { colorUsage, fontStyles } from 'stylesheet';
import { PieChartData } from '../../redux/Comment';

interface PropsType {
  data: PieChartData[];
}

const PIE_INNER_RADIUS = 55;
const PieChart = React.memo<PropsType>(props => {
  const [angle, setAngle] = useState(0);

  const ticksLabelsStyle = {
    fill: colorUsage.text,
    ...fontStyles.regular,
    alignItems: 'center',
  };

  const total = props.data.reduce((sum, datum) => sum + datum.y, 0);

  useEffect(() => {
    setTimeout(() => {
      setAngle(360);
    }, 100);
  }, []);

  return (
    <PieChartContainer>
      {props.data && props.data.length > 0 && (
        <VictoryPie
          labelComponent={<VictoryTooltip />}
          height={300}
          width={300}
          innerRadius={PIE_INNER_RADIUS}
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
          data={props.data.map(pie => {
            console.log(JSON.stringify(pie));
            return { ...pie, label: `${pie.tag.code}\n${((pie.y / total) * 100).toFixed(0)}%` };
          })}
        />
      )}
    </PieChartContainer>
  );
});

export default PieChart;
