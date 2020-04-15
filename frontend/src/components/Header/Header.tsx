import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink, NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from 'assets/logo.svg';
import Link from 'components/Link';
import { RepositoryIdsMultiSelect } from 'components/RepositoryIdsMultiSelect';
import { PATHS } from 'routes';
import { Logo, HeaderContainer } from './Header.style';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import Text from 'components/Text';
import { colorUsage, borderRadius, getSpacing } from 'stylesheet';

import 'react-datepicker/dist/react-datepicker.css';
import { WrapperProps } from './Header.wrap';

type IHeaderProps = WrapperProps;

const Header: React.FunctionComponent<RouteComponentProps & IHeaderProps> = props => (
  <HeaderContainer>
    <Logo alt="Commentor" src={logo} />
    <Link as={NavLink} to={PATHS.HOME}>
      <FormattedMessage id="header.dashboard" />
    </Link>
    <RepositoryIdsMultiSelect placeholder="Select your project(s)..." />
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
    <Link as={NavLink} to={PATHS.TAGS}>
      <FormattedMessage id="header.tag" />
    </Link>
  </HeaderContainer>
);

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
