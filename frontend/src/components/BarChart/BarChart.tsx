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
import { colorUsage, fontFamily, fontSize } from 'stylesheet';
import { map, chain } from 'lodash';
import { TagType } from 'redux/Tag';

interface propTypes {
  data: { x: number | string; y: number; y0: number; tag: TagType }[];
}

const BarChart: React.FunctionComponent<propTypes> = props => {
  const ticksLabelsStyle = {
    fill: colorUsage.primaryTextColor,
    fontSize: fontSize.XXSmall,
    fontFamily: fontFamily.main,
  };

  return (
    <BarChartContainer>
      {props.data && props.data.length > 0 && (
        <VictoryChart theme={VictoryTheme.material} domainPadding={10} height={300} width={800}>
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
              grid: { stroke: colorUsage.barChartGrid },
            }}
          />
          <VictoryAxis
            tickCount={
              chain(props.data)
                .map('x')
                .uniq()
                .value().length
            }
            tickLabelComponent={<VictoryLabel angle={-60} />}
            style={{
              tickLabels: { ...ticksLabelsStyle },
              grid: { stroke: colorUsage.barChartGrid },
            }}
          />
          <VictoryStack>
            {map(
              props.data,
              (barChartItem: { x: number | string; y: number; y0: number; tag: TagType }) => {
                return (
                  <VictoryBar
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
};

export default BarChart;
