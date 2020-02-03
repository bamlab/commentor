import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink, NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from 'assets/logo.png';
import Link from 'components/Link';
import { RepositoryIdsMultiSelect } from 'components/RepositoryIdsMultiSelect';

import { PATHS } from 'routes';
import { Logo, HeaderContainer } from './Header.style';

interface IHeaderProps {}

const Header: React.FunctionComponent<RouteComponentProps & IHeaderProps> = () => (
  <HeaderContainer>
    <RouterLink to={PATHS.HOME}>
      <Logo alt="Commentor" src={logo} />
    </RouterLink>
    <RepositoryIdsMultiSelect />
    <Link as={NavLink} to={PATHS.TAGS} activeStyle={{ color: 'red' }}>
      <FormattedMessage id="header.tag" />
    </Link>
    <Link as={NavLink} to={PATHS.GRAPHS} activeStyle={{ color: 'yellow' }}>
      <FormattedMessage id="header.graph" />
    </Link>
  </HeaderContainer>
);

export default withRouter(Header);
