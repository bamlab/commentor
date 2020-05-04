import React from 'react';
import { BarChartContainer, CHART_WIDTH, CHART_HEIGHT } from './BarChart.style';
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
  VictoryLabel,
} from 'victory';
import { colorUsage, fontStyles } from 'stylesheet';
import { map, chain } from 'lodash';
import { eachDayOfInterval } from 'date-fns';
import { formatDateToDDMMLined } from '../../services/date/dateFormatter';
import { TagType } from 'redux/Tag';

export type BarChartDataType = { x: Date; y: number; y0: number; tag: TagType };
interface propTypes {
  data: BarChartDataType[];
}

const BarChart = React.memo<propTypes>(props => {
  const ticksLabelsStyle = {
    fill: colorUsage.text,
    ...fontStyles.small,
  };

  return (
    <BarChartContainer>
      {props.data && props.data.length > 0 && (
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={10}
          height={CHART_HEIGHT}
          width={CHART_WIDTH}
        >
          <VictoryAxis
            dependentAxis
            tickCount={Math.max(
              ...chain(props.data)
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
            scale="time"
            tickValues={eachDayOfInterval({
              start: props.data[0].x,
              end: props.data[props.data.length - 1].x,
            })}
            tickFormat={date => {
              return formatDateToDDMMLined(date);
            }}
            tickLabelComponent={<VictoryLabel angle={-60} />}
            style={{
              tickLabels: { ...ticksLabelsStyle },
            }}
          />
          <VictoryStack>
            {map(
              props.data,
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
