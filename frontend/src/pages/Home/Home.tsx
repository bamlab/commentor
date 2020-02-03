import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';
import {
  HomeContainer,
  Logo,
  WelcomeMessage,
  GithubLogo,
  GithubAuthentButtonText,
  GithubAuthentButton,
  FloatingButtonContainer,
  CommentTableContainer,
  GitHubAuthentContainer,
} from './Home.style';
import { GenericTable } from 'components/GenericTable/GenericTable';
import { CommentType } from 'redux/Comment';
import { GoSync } from 'react-icons/go';
import Button from 'components/Button';
import Loader from 'components/Loader';

import {
  fixedColumnCount,
  columnsConfig,
  lineHeight,
  CommentTableOptionsType,
} from './columnsConfig';

import logo from 'assets/logo.png';
import githubLogo from 'assets/octocat.png';

type PropsType = {
  loadRepositories: () => void;
  login: (code: string) => void;
  isAuthenticated: boolean;
  location: { search: string };
  comments: CommentType[];
  loadComments: (filters: { repositoryIds: number[] }) => void;
  isCommentLoading: boolean;
  repositoryIds: number[];
};

const Home = React.memo<PropsType>(props => {
  const { login, location, loadRepositories, isAuthenticated, loadComments, repositoryIds } = props;
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
        loadComments({ repositoryIds: repositoryIds });
      }
    },
    [isAuthenticated, loadRepositories],
  );

  return (
    <HomeContainer>
      {!isAuthenticated ? (
        <GitHubAuthentContainer>
          <Logo alt="commentorlogo" src={logo} />
          <WelcomeMessage>
            <FormattedMessage id="home.welcome-message" />
          </WelcomeMessage>
          <GithubAuthentButton
            onClick={() => {
              window.location.href = `https://github.com/login/oauth/authorize?client_id=${
                process.env.REACT_APP_GITHUB_APP_CLIENT_ID
              }`;
            }}
          >
            <GithubLogo src={githubLogo} />
            <GithubAuthentButtonText>
              <FormattedMessage id="home.authenticate-via-github" />
            </GithubAuthentButtonText>
          </GithubAuthentButton>
        </GitHubAuthentContainer>
      ) : (
        <CommentTableContainer>
          <GenericTable<CommentTableOptionsType>
            values={props.comments}
            fixedColumnCount={fixedColumnCount}
            columnsConfig={columnsConfig}
            options={{}}
            defaultLineHeight={lineHeight}
          />
          <FloatingButtonContainer>
            <Button
              disabled={props.isCommentLoading}
              onClick={() => loadComments({ repositoryIds: repositoryIds })}
            >
              {/* to refacto with Icon component */}
              {props.isCommentLoading ? <Loader /> : <GoSync size={25} />}
            </Button>
          </FloatingButtonContainer>
        </CommentTableContainer>
      )}
    </HomeContainer>
  );
});

export default Home;
