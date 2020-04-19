import React, { useState } from 'react';
import { Container } from './DateRangeFilterSelector.style';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './assets/custom-styles.css';
import { DateRangePicker } from 'react-dates';
import calendarIcon from './assets/calendar-icon.svg';
import moment, { Moment } from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import { WrapperProps } from './DateRangeFilterSelector.wrap';

type IDateRangeFilterSelectorProps = WrapperProps;

const today = moment();
const yesterday = moment().subtract(1, 'day');
const presets = [
  {
    text: 'Today',
    start: today,
    end: today,
  },
  {
    text: 'Yesterday',
    start: yesterday,
    end: yesterday,
  },
  {
    text: 'Last Week',
    start: moment().subtract(1, 'week'),
    end: today,
  },
  {
    text: 'Last Month',
    start: moment().subtract(1, 'month'),
    end: today,
  },
];

const renderDatePresets = (
  presets: { text: string; start: Moment; end: Moment }[],
  startDate: Date | null,
  endDate: Date | null,
  onDatesChange: (dateRange: { startDate: Moment; endDate: Moment }) => void,
) => {
  return (
    <div className="PresetsContainer">
      {presets.map(({ text, start, end }) => {
        return (
          <button
            key={text}
            type="button"
            className="PresetsButton"
            onClick={() => onDatesChange({ startDate: start, endDate: end })}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};

export const DateRangeFilterSelector: React.FunctionComponent<
  IDateRangeFilterSelectorProps
> = props => {
  const [focusedInput, setFocusedInput] = useState<'startDate' | 'endDate' | null>(null);
  return (
    <Container>
      <DateRangePicker
        renderCalendarInfo={() =>
          renderDatePresets(
            presets,
            props.startingDate,
            props.endingDate,
            ({ startDate, endDate }: { startDate: Moment; endDate: Moment }) => {
              props.setStartingDate(startDate ? startDate.toDate() : null);
              props.setEndingDate(endDate ? endDate.toDate() : null);
            },
          )
        }
        small
        showClearDates
        numberOfMonths={1}
        startDatePlaceholderText="Start"
        endDatePlaceholderText="End"
        displayFormat={'DD MMM'}
        hideKeyboardShortcutsPanel={true}
        isOutsideRange={() => false}
        customInputIcon={<img src={calendarIcon} alt="calendar-icon" />}
        minDate={moment('01/12/2019')}
        startDate={props.startingDate ? moment(props.startingDate) : null} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={props.endingDate ? moment(props.endingDate) : null} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => {
          props.setStartingDate(startDate ? startDate.toDate() : null);
          props.setEndingDate(endDate ? endDate.toDate() : null);
        }} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
      />
    </Container>
  );
};
