import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink, NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from 'assets/logo.png';
import Link from 'components/Link';
import { RepositoryIdsMultiSelect } from 'components/RepositoryIdsMultiSelect';
import { DevMultiSelect } from 'components/DevMultiSelect';
import { PATHS } from 'routes';
import { Logo, HeaderContainer } from './Header.style';

interface IHeaderProps {}

const Header: React.FunctionComponent<RouteComponentProps & IHeaderProps> = () => (
  <HeaderContainer>
    <RouterLink to={PATHS.HOME}>
      <Logo alt="Commentor" src={logo} />
    </RouterLink>
    <div>Projets:</div>
    <RepositoryIdsMultiSelect />
    <div>Requesters:</div>
    <DevMultiSelect />
    <Link as={NavLink} to={PATHS.TAGS} activeStyle={{ color: 'red' }}>
      <FormattedMessage id="header.tag" />
    </Link>
  </HeaderContainer>
);

export default withRouter(Header);
