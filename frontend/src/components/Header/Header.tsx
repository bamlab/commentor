import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink, NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from 'assets/logo.png';
import Link from 'components/Link';
import { RepositoryIdsMultiSelect } from 'components/RepositoryIdsMultiSelect';
import { PATHS } from 'routes';
import { Logo, HeaderContainer } from './Header.style';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import Text from 'components/Text';
import { colorUsage, borderRadius, getSpacing, fontSize, fontWeight } from 'stylesheet';

import 'react-datepicker/dist/react-datepicker.css';

interface IHeaderProps {}

const Header: React.FunctionComponent<RouteComponentProps & IHeaderProps> = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <HeaderContainer>
      <RouterLink to={PATHS.HOME}>
        <Logo alt="Commentor" src={logo} />
      </RouterLink>
      <RepositoryIdsMultiSelect placeholder="Select your project(s)..." />
      <LabelledDatePickerContainer>
        <Text>Start Date</Text>
        <DatePickerContainer
          selected={startDate}
          // @ts-ignore
          onChange={date => setStartDate(date)}
          timeCaption="time"
          dateFormat="d MMMM yyyy"
          isClearable
        />
      </LabelledDatePickerContainer>
      <LabelledDatePickerContainer>
        <Text>End Date</Text>
        <DatePickerContainer
          selected={endDate}
          // @ts-ignore
          onChange={date => setEndDate(date)}
          timeCaption="time"
          dateFormat="d MMMM yyyy"
          isClearable
        />
      </LabelledDatePickerContainer>
      <Link as={NavLink} to={PATHS.TAGS} activeStyle={{ color: 'red' }}>
        <FormattedMessage id="header.tag" />
      </Link>
    </HeaderContainer>
  );
};

const LabelledDatePickerContainer = styled.div`
  text-align: center;
`;
const DatePickerContainer = styled(DatePicker)`
  margin: ${getSpacing(1)};
  padding: ${getSpacing(1)};
  border-radius: ${borderRadius.medium};
  color: ${colorUsage.primary};
  background-color: ${colorUsage.oddLineColor};
`;
export default withRouter(Header);
