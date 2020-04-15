import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  Container,
  LabelledDatePickerContainer,
  DatePickerContainer,
} from './DateRangeFilterSelector.style';
import Text from 'components/Text';

import 'react-datepicker/dist/react-datepicker.css';
import { WrapperProps } from './DateRangeFilterSelector.wrap';

type IDateRangeFilterSelectorProps = WrapperProps;

export const DateRangeFilterSelector: React.FunctionComponent<
  IDateRangeFilterSelectorProps
> = props => (
  <Container>
    <LabelledDatePickerContainer>
      <Text>Start Date</Text>
      <DatePickerContainer
        selected={props.startingDate}
        onChange={(date: Date | null) => props.setStartingDate(date)}
        timeCaption="time"
        dateFormat="d MMMM yyyy"
        isClearable
      />
    </LabelledDatePickerContainer>
    <LabelledDatePickerContainer>
      <Text>End Date</Text>
      <DatePickerContainer
        selected={props.endingDate}
        onChange={(date: Date | null) => props.setEndingDate(date)}
        timeCaption="time"
        dateFormat="d MMMM yyyy"
        isClearable
      />
    </LabelledDatePickerContainer>
  </Container>
);
