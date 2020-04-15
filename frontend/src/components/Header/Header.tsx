import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from 'assets/logo.svg';
import Link from 'components/Link';
import { PATHS } from 'routes';
import { Logo, HeaderContainer } from './Header.style';

import 'react-datepicker/dist/react-datepicker.css';

const Header: React.FunctionComponent<RouteComponentProps> = () => (
  <HeaderContainer>
    <Logo alt="Commentor" src={logo} />
    <Link as={NavLink} to={PATHS.HOME}>
      <FormattedMessage id="header.dashboard" />
    </Link>
    <Link as={NavLink} to={PATHS.TAGS}>
      <FormattedMessage id="header.tag" />
    </Link>
  </HeaderContainer>
);

export default withRouter(Header);
