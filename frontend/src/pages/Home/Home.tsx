import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { HomeContainer, Logo, WelcomeMessage, SelectRepositoryWrapper } from './Home.style';
import { RepositoryIdsMultiSelect } from './components/RepositoryIdsMultiSelect';
import logo from 'assets/final_low.png';

type PropsType = {
  loadRepositories: () => void;
};

const Home = React.memo<PropsType>(props => {
  useEffect(
    () => {
      props.loadRepositories();
    },
    [props],
  );

  return (
    <HomeContainer>
      <Logo alt="commentorlogo" src={logo} />
      <WelcomeMessage>
        <FormattedMessage id="home.welcome-message" />
      </WelcomeMessage>
      <SelectRepositoryWrapper>
        <FormattedMessage id="home.select-repository-label" />
        <RepositoryIdsMultiSelect />
      </SelectRepositoryWrapper>
    </HomeContainer>
  );
});

export default Home;
