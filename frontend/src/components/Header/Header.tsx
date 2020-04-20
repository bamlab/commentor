import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import Link from 'components/Link';
import { PATHS } from 'routes';
import {
  AnimatedLogo,
  HeaderContainer,
  AnimatedLogoContainer,
  LogoContainer,
} from './Header.style';
import { colorUsage } from 'stylesheet';
import logoAnimation from 'assets/logoAnimation.json';

import 'react-datepicker/dist/react-datepicker.css';

const defaultOptions = {
  autoplay: true,
  animationData: logoAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

type PropsType = RouteComponentProps & { isFetchingData: boolean };

const Header: React.FunctionComponent<PropsType> = props => {
  const [isAnimating, setAnimating] = useState(props.isFetchingData);
  useEffect(
    () => {
      props.isFetchingData && setAnimating(true);
    },
    [props.isFetchingData],
  );
  return (
    <HeaderContainer>
      <LogoContainer>
        <AnimatedLogoContainer>
          <AnimatedLogo
            options={defaultOptions}
            height={50}
            width={50}
            speed={1.4}
            isStopped={!isAnimating}
            eventListeners={[
              {
                eventName: 'loopComplete',
                callback: () => setAnimating(false),
              },
            ]}
          />
        </AnimatedLogoContainer>
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
};

export default withRouter(Header);
