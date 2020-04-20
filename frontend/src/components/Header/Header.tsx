import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from 'assets/logo.svg';
import Link from 'components/Link';
import { PATHS } from 'routes';
import { Logo, HeaderContainer } from './Header.style';
import { colorUsage } from 'stylesheet';

import 'react-datepicker/dist/react-datepicker.css';

const Header: React.FunctionComponent<RouteComponentProps> = () => (
  <HeaderContainer>
    <Logo alt="Commentor" src={logo} />
    <Link
      as={NavLink}
      style={{ textDecoration: 'none' }}
      to={PATHS.HOME}
      activeStyle={{
        color: colorUsage.text,
      }}
      isActive={(match: any, location: any) => {
        if (location.pathname === PATHS.HOME) {
          return true;
        }
        return false;
      }}
    >
      <FormattedMessage id="header.dashboard" />
    </Link>
    <Link
      as={NavLink}
      style={{ textDecoration: 'none' }}
      to={PATHS.TAGS}
      activeStyle={{
        color: colorUsage.text,
      }}
      isActive={(match: any, location: any) => {
        if (location.pathname === PATHS.TAGS) {
          return true;
        }
        return false;
      }}
    >
      <FormattedMessage id="header.tag" />
    </Link>
  </HeaderContainer>
);

export default withRouter(Header);
