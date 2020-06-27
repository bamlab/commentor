import React from 'react';
import { BarChartContainer, CHART_WIDTH, CHART_HEIGHT } from './BarChart.style';
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
  VictoryLabel,
  VictoryTooltip,
} from 'victory';
import { colorUsage, fontStyles } from 'stylesheet';
import { map, chain } from 'lodash';
import { eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns';
import {
  formatDateToDDMMLined,
  formatDateToWeek,
  formatDateToMonthLined,
} from '../../services/date/dateFormatter';
import { TagType } from 'redux/Tag';
import { BarChartData } from '../../redux/Comment';
import { GroupByType } from 'redux/Filters/filters.type';

interface PropsType {
  data: BarChartData[];
  groupBy: GroupByType;
}

const BarChart = React.memo<PropsType>(props => {
  const ticksLabelsStyle = {
    fill: colorUsage.text,
    ...fontStyles.small,
  };

  let tickValues: Date[] = [];
  let tickFormat: (date: Date) => string = date => '';
  let angle = -60;
  if (props.data && props.data.length > 0) {
    switch (props.groupBy) {
      case 'day':
        tickValues = eachDayOfInterval({
          start: props.data[0].x,
          end: props.data[props.data.length - 1].x,
        });
        tickFormat = formatDateToDDMMLined;
        break;

      case 'week':
        tickValues = eachWeekOfInterval(
          {
            start: props.data[0].x,
            end: props.data[props.data.length - 1].x,
          },
          { weekStartsOn: 1 },
        );
        tickFormat = formatDateToWeek;
        angle = 0;
        break;

      case 'month':
        tickValues = eachMonthOfInterval({
          start: props.data[0].x,
          end: props.data[props.data.length - 1].x,
        });
        tickFormat = formatDateToMonthLined;
        angle = -45;
        break;
    }
  }

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
            tickValues={tickValues}
            tickFormat={tickFormat}
            tickLabelComponent={<VictoryLabel angle={angle} />}
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
                    animate={false}
                    labelComponent={<VictoryTooltip style={{ ...fontStyles.small }} />}
                    style={{
                      data: {
                        fill: ({ datum }) => (datum.tag ? datum.tag.color : colorUsage.error),
                      },
                    }}
                    data={[
                      {
                        x: barChartItem.x,
                        y: barChartItem.y,
                        tag: barChartItem.tag,
                        label: barChartItem.tag.code,
                      },
                    ]}
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
