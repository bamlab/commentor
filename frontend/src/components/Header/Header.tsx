import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink, NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from 'assets/logo.png';
import Link from 'components/Link';
import { RepositoryIdsMultiSelect } from 'components/RepositoryIdsMultiSelect';
import { RequesterMultiSelect } from 'components/RequesterMultiSelect';
import { CommentorMultiSelect } from 'components/CommentorMultiSelect';
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
    <RequesterMultiSelect />
    <div>Commentors:</div>
    <CommentorMultiSelect />
    <Link as={NavLink} to={PATHS.TAGS} activeStyle={{ color: 'red' }}>
      <FormattedMessage id="header.tag" />
    </Link>
  </HeaderContainer>
);

export default withRouter(Header);
