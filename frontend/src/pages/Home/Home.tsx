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
  ChartsContainer,
  AuthenticatedPageContainer,
} from './Home.style';
import TagsLegend from 'components/TagsLegend';
import { GenericTable } from 'components/GenericTable/GenericTable';
import { CommentType } from 'redux/Comment';
import { TagType } from 'redux/Tag';
import { GoSync } from 'react-icons/go';
import Button from 'components/Button';
import Loader from 'components/Loader';
import BarChart from 'components/BarChart';
import PieChart from 'components/PieChart';
import { map, chain } from 'lodash';
import moment, { Moment } from 'moment';

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
  tags: TagType[];
  loadTags: () => void;
  loadComments: (filters: { repositoryIds: number[] }) => void;
  isCommentLoading: boolean;
  repositoryIds: number[];
};

const Home = React.memo<PropsType>(props => {
  const {
    login,
    location,
    loadRepositories,
    isAuthenticated,
    loadComments,
    repositoryIds,
    loadTags,
  } = props;
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
        loadTags();
        loadRepositories();
        loadComments({ repositoryIds: repositoryIds });
      }
    },
    [isAuthenticated, loadRepositories],
  );

  const pieChartFormattedData = chain(props.tags)
    .map((tag: TagType) => ({
      x: tag.code,
      y: props.comments.filter((comment: CommentType) => !!comment.body.match(tag.code)).length,
      tag,
    }))
    .filter(chartDatum => chartDatum.y > 0)
    .value();

  const barChartFormattedData = chain(props.comments)
    .groupBy((comment: CommentType) => moment(comment.creationDate).format('DD-MM-YYYY'))
    .map((comments: CommentType[], date: Moment) =>
      map(comments, (comment: CommentType) =>
        chain(props.tags)
          .filter((tag: TagType) => !!comment.body.match(tag.code))
          .map((tag: TagType) => [
            { x: moment(comment.creationDate).format('DD-MM'), y: 1, y0: 0, tag },
          ])
          .value(),
      ),
    )
    .flattenDeep()
    .value();

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
        <AuthenticatedPageContainer>
          <ChartsContainer>
            {
              // @ts-ignore
              <BarChart data={barChartFormattedData} />
            }
            <TagsLegend tags={props.tags} />
            <PieChart data={pieChartFormattedData} />
          </ChartsContainer>
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
        </AuthenticatedPageContainer>
      )}
    </HomeContainer>
  );
});

export default Home;
