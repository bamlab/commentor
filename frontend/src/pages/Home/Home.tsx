import React, { useState, useEffect } from 'react';
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
  FilterButtonContainer,
} from './Home.style';
import TagsLegend from 'components/TagsLegend';
import { GenericTable } from 'components/GenericTable/GenericTable';
import { CommentType } from 'redux/Comment';
import { TagType } from 'redux/Tag';
import { GoSync, GoBeaker } from 'react-icons/go';
import Button from 'components/Button';
import Loader from 'components/Loader';
import FilterModal from 'components/FilterModal';
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
  loadComments: (
    filters: {
      repositoryIds: number[];
    },
  ) => void;
  isCommentLoading: boolean;
  repositoryIds: number[];
  selectedRequesterIds: string[];
  selectedCommentorIds: string[];
  selectedTagsId: string[];
};

const ICON_SIZE = 25;

const Home = React.memo<PropsType>(props => {
  const {
    login,
    location,
    loadRepositories,
    isAuthenticated,
    loadComments,
    repositoryIds,
    selectedRequesterIds,
    selectedCommentorIds,
    selectedTagsId,
    loadTags,
  } = props;

  const loadCommentsWithFilters = () =>
    loadComments({
      repositoryIds: repositoryIds,
    });

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
        loadCommentsWithFilters();
      }
    },
    [isAuthenticated, loadRepositories],
  );

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  // should be extracted in wrapper
  const filteredComments = chain(props.comments)
    .filter(
      comment =>
        selectedRequesterIds.includes(comment.requester) || !(selectedRequesterIds.length > 0),
    )
    .filter(
      comment =>
        selectedCommentorIds.includes(comment.commentor) || !(selectedCommentorIds.length > 0),
    )
    .orderBy('creationDate', 'desc')
    .value();

  const filteredTags = props.tags.filter(
    tag => selectedTagsId.includes(tag.id.toString()) || !(selectedTagsId.length > 0),
  );

  const pieChartFormattedData = chain(filteredTags)
    .map((tag: TagType) => ({
      x: tag.code,
      y: filteredComments.filter((comment: CommentType) => !!comment.body.match(tag.code)).length,
      tag,
    }))
    .filter(chartDatum => chartDatum.y > 0)
    .value();

  const barChartFormattedData = chain(filteredComments)
    .groupBy((comment: CommentType) => moment(comment.creationDate).format('DD-MM-YYYY'))
    .map((comments: CommentType[], date: Moment) =>
      map(comments, (comment: CommentType) =>
        chain(filteredTags)
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
            <TagsLegend tags={filteredTags} />
            <PieChart data={pieChartFormattedData} />
          </ChartsContainer>
          <CommentTableContainer>
            <GenericTable<CommentTableOptionsType, CommentType>
              values={filteredComments}
              fixedColumnCount={fixedColumnCount}
              columnsConfig={columnsConfig}
              options={{}}
              defaultLineHeight={lineHeight}
            />
            <FloatingButtonContainer>
              <Button disabled={props.isCommentLoading} onClick={() => loadCommentsWithFilters()}>
                {/* to refacto with Icon component */}
                {props.isCommentLoading ? <Loader /> : <GoSync size={ICON_SIZE} />}
              </Button>
            </FloatingButtonContainer>
            <FilterButtonContainer>
              <Button onClick={() => setFilterModalVisible(true)}>
                <GoBeaker size={ICON_SIZE} />
              </Button>
            </FilterButtonContainer>
            <FilterModal
              id="FilterModal"
              isOpen={isFilterModalVisible}
              closeFilterModal={() => setFilterModalVisible(false)}
            />
          </CommentTableContainer>
        </AuthenticatedPageContainer>
      )}
    </HomeContainer>
  );
});

export default Home;
