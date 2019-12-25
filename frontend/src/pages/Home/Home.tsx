import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';
import client from '../../services/networking/client';
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
  location: { search: string };
};

const Home = React.memo<PropsType>(props => {
  const componentDidMount = async () => {
    const params = queryString.parse(props.location.search);
    if (params.code && typeof params.code === 'string') {
      await client.createAccessToken(params.code);
    }
    await props.loadRepositories();
  };
  useEffect(() => {
    componentDidMount();
  }, []);

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
        <GithubAuthentButton
          href={`https://github.com/login/oauth/authorize?client_id=${
            process.env.GITHUB_APP_CLIENT_ID
          }`}
        >
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
