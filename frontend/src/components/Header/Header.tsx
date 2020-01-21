import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink, NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from 'assets/final_low.png';
import Link from 'components/Link';
import { PATHS } from 'routes';
import { Logo, HeaderContainer } from './Header.style';

interface IHeaderProps {}

const Header: React.FunctionComponent<RouteComponentProps & IHeaderProps> = () => (
  <HeaderContainer>
    <RouterLink to={PATHS.HOME}>
      <Logo alt="Commentor" src={logo} />
    </RouterLink>
    <Link as={NavLink} to={PATHS.TAGS} activeStyle={{ backgroundColor: 'red' }}>
      <FormattedMessage id="header.tag" />
    </Link>
    <Link as={NavLink} to={PATHS.COMMENTS} activeStyle={{ backgroundColor: 'blue' }}>
      <FormattedMessage id="header.comment" />
    </Link>
    <Link as={NavLink} to={PATHS.GRAPHS} activeStyle={{ backgroundColor: 'yellow' }}>
      <FormattedMessage id="header.graph" />
    </Link>
  </HeaderContainer>
);

export default withRouter(Header);
