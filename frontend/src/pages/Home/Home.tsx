import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  HomeContainer,
  Logo,
  WelcomeMessage,
  SelectRepositoryWrapper,
  GithubAuthentWrapper,
  GithubAuthentTitleWrapper,
  GithubAuthentButton,
} from './Home.style';
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
      <GithubAuthentWrapper>
        <GithubAuthentTitleWrapper>
          <FormattedMessage id="home.authenticate-via-github" />
        </GithubAuthentTitleWrapper>
        <GithubAuthentButton href="https://github.com/login/oauth/authorize?client_id=Iv1.2125db5cc55ea22c&state=coucou">
          Login via Github
        </GithubAuthentButton>
      </GithubAuthentWrapper>
      <SelectRepositoryWrapper>
        <FormattedMessage id="home.select-repository-label" />
        <RepositoryIdsMultiSelect />
      </SelectRepositoryWrapper>
    </HomeContainer>
  );
});

export default Home;
