import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import logo from 'assets/logo.svg';
import Link from 'components/Link';
import { PATHS } from 'routes';
import {
  Logo,
  AnimatedLogo,
  HeaderContainer,
  AnimatedLogoContainer,
  LogoContainer,
} from './Header.style';
import { colorUsage } from 'stylesheet';
import logoAnimation from 'assets/logoAnimation.json';

import 'react-datepicker/dist/react-datepicker.css';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: logoAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

type PropsType = RouteComponentProps & { isFetchingData: boolean };

const Header: React.FunctionComponent<PropsType> = props => (
  <HeaderContainer>
    <LogoContainer>
      {props.isFetchingData ? (
        <AnimatedLogoContainer>
          <AnimatedLogo options={defaultOptions} height={45} width={45} />
        </AnimatedLogoContainer>
      ) : (
        <Logo alt="Commentor" src={logo} />
      )}
    </LogoContainer>
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
