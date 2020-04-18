import React from 'react';
import { BarChartContainer } from './BarChart.style';
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
  VictoryLabel,
} from 'victory';
import { colorUsage, fontStyles } from 'stylesheet';
import { map, chain, sortBy } from 'lodash';
import { TagType } from 'redux/Tag';

interface propTypes {
  data: { x: number | string; y: number; y0: number; tag: TagType }[];
}

const BarChart = React.memo<propTypes>(props => {
  const ticksLabelsStyle = {
    fill: colorUsage.text,
    ...fontStyles.small,
  };

  const data = sortBy(props.data, 'x');

  return (
    <BarChartContainer>
      {data && data.length > 0 && (
        <VictoryChart theme={VictoryTheme.material} domainPadding={10} height={350} width={800}>
          <VictoryAxis
            dependentAxis
            tickCount={Math.max(
              ...chain(data)
                .countBy('x')
                .map((countByDate: number) => countByDate)
                .value(),
            )}
            style={{
              axis: { stroke: 'none' },
              tickLabels: ticksLabelsStyle,
              grid: { stroke: colorUsage.lines },
            }}
          />
          <VictoryAxis
            tickCount={
              chain(data)
                .map('x')
                .uniq()
                .value().length
            }
            tickLabelComponent={<VictoryLabel angle={-60} />}
            style={{
              tickLabels: { ...ticksLabelsStyle },
            }}
          />
          <VictoryStack>
            {map(
              data,
              (barChartItem: { x: number | string; y: number; y0: number; tag: TagType }) => {
                return (
                  <VictoryBar
                    barWidth={10}
                    animate={{
                      duration: 2000,
                      onLoad: { duration: 1000 },
                    }}
                    style={{
                      data: {
                        fill: ({ datum }) => (datum.tag ? datum.tag.color : colorUsage.error),
                      },
                    }}
                    data={[barChartItem]}
                  />
                );
              },
            )}
          </VictoryStack>
        </VictoryChart>
      )}
    </BarChartContainer>
  );
});

export default BarChart;
