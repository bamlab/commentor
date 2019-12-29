import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';
import client from '../../services/networking/client';
import Cookies from 'universal-cookie';
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
const cookies = new Cookies();

const Home = React.memo<PropsType>(props => {
  const [isAuthentified, setIsAuthentified] = useState(!!cookies.get('is_authentified'));
  useEffect(() => {
    const componentDidMount = async () => {
      const params = queryString.parse(props.location.search);
      if (params.code && typeof params.code === 'string') {
        await client.createAccessToken(params.code);
        setIsAuthentified(!!cookies.get('is_authentified'));
      }
    };
    componentDidMount();
  }, []);

  useEffect(
    () => {
      if (isAuthentified) {
        props.loadRepositories();
      }
    },
    [isAuthentified],
  );

  return (
    <HomeContainer>
      <Logo alt="commentorlogo" src={logo} />
      <WelcomeMessage>
        <FormattedMessage id="home.welcome-message" />
      </WelcomeMessage>
      {!isAuthentified && (
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
      {isAuthentified && (
        <SelectRepositoryWrapper>
          <FormattedMessage id="home.select-repository-label" />
          <RepositoryIdsMultiSelect />
        </SelectRepositoryWrapper>
      )}
    </HomeContainer>
  );
});

export default Home;
