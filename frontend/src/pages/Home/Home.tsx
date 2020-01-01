import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';
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
  login: (code: string) => void;
  isAuthenticated: boolean;
  location: { search: string };
};

const Home = React.memo<PropsType>(props => {
  const { login, location, loadRepositories, isAuthenticated } = props;
  useEffect(() => {
    const componentDidMount = async () => {
      const params = queryString.parse(location.search);
      if (params.code && typeof params.code === 'string' && !isAuthenticated) {
        await login(params.code);
      }
    };
    componentDidMount();
  }, []);

  useEffect(
    () => {
      if (isAuthenticated) {
        loadRepositories();
      }
    },
    [isAuthenticated, loadRepositories],
  );

  return (
    <HomeContainer>
      <Logo alt="commentorlogo" src={logo} />
      <WelcomeMessage>
        <FormattedMessage id="home.welcome-message" />
      </WelcomeMessage>
      {!isAuthenticated && (
        <GithubAuthentWrapper>
          <GithubAuthentTitleWrapper>
            <FormattedMessage id="home.authenticate-via-github" />
          </GithubAuthentTitleWrapper>
          <GithubAuthentButton
            href={`https://github.com/login/oauth/authorize?client_id=${
              process.env.REACT_APP_GITHUB_APP_CLIENT_ID
            }`}
          >
            Login via Github
          </GithubAuthentButton>
        </GithubAuthentWrapper>
      )}
      {isAuthenticated && (
        <SelectRepositoryWrapper>
          <FormattedMessage id="home.select-repository-label" />
          <RepositoryIdsMultiSelect />
        </SelectRepositoryWrapper>
      )}
    </HomeContainer>
  );
});

export default Home;
