import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { HomeContainer, Logo, WelcomeMessage } from './Home.style';
import logo from 'assets/final_low.png';

const Home: React.FunctionComponent = () => (
  <HomeContainer>
    <Logo alt="commentorlogo" src={logo} />
    <WelcomeMessage>
      <FormattedMessage id="home.welcome-message" />
    </WelcomeMessage>
  </HomeContainer>
);

export default Home;
