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
  BarChartCard,
  BarChartAndTitleContainer,
  PieChartAndLegendCard,
  PieChartAndTitleContainer,
  TagsLegendContainer,
  ChartTitle,
  FiltersHeader,
  FilterSpacer,
  FiltersPrefix,
  FiltersContainer,
} from './Home.style';
import { RepositoryIdsMultiSelect } from 'components/RepositoryIdsMultiSelect';
import { RequesterMultiSelect } from 'components/RequesterMultiSelect';
import { CommentorMultiSelect } from 'components/CommentorMultiSelect';
import { TagMultiSelect } from 'components/TagMultiSelect';
import { DateRangeFilterSelector } from 'components/DateRangeFilterSelector';
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
import {
  fixedColumnCount,
  columnsConfig,
  lineHeight,
  CommentTableOptionsType,
} from './columnsConfig';
import { HomePropsType } from './Home.type';
import logo from 'assets/logo-text.svg';
import githubLogo from 'assets/octocat.png';
import { formatDateToDDMMYYYLined, formatDateToDDMMLined } from '../../services/date/dateFormatter';

const ICON_SIZE = 25;

const Home = React.memo<HomePropsType>(props => {
  const { login, location, loadRepositories, isAuthenticated, loadComments, loadTags } = props;

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
        loadComments();
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
    .groupBy((comment: CommentType) => formatDateToDDMMYYYLined(comment.creationDate))
    .map((comments: CommentType[], date: Date) =>
      map(comments, (comment: CommentType) =>
        chain(props.tags)
          .filter((tag: TagType) => !!comment.body.match(tag.code))
          .map((tag: TagType) => [
            { x: formatDateToDDMMLined(comment.creationDate), y: 1, y0: 0, tag },
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
          <FiltersHeader>
            <DateRangeFilterSelector />
            <FiltersContainer>
              <FiltersPrefix>Filter by :</FiltersPrefix>
              <RepositoryIdsMultiSelect placeholder="Projects" />
              <FilterSpacer />
              <TagMultiSelect placeholder="Tags" />
              <FilterSpacer />
              <RequesterMultiSelect placeholder="Requester" />
              <FilterSpacer />
              <CommentorMultiSelect placeholder="Commentors" />
            </FiltersContainer>
          </FiltersHeader>
          <ChartsContainer>
            <BarChartCard>
              <BarChartAndTitleContainer>
                <ChartTitle># Tag over time</ChartTitle>
                {
                  // @ts-ignore
                  <BarChart data={barChartFormattedData} />
                }
              </BarChartAndTitleContainer>
            </BarChartCard>
            <PieChartAndLegendCard>
              <PieChartAndTitleContainer>
                <ChartTitle>Total over the period</ChartTitle>
                <PieChart data={pieChartFormattedData} />
              </PieChartAndTitleContainer>
              <TagsLegendContainer>
                <TagsLegend tags={props.tags} />
              </TagsLegendContainer>
            </PieChartAndLegendCard>
          </ChartsContainer>
          <CommentTableContainer>
            <GenericTable<CommentTableOptionsType, CommentType>
              values={props.comments}
              fixedColumnCount={fixedColumnCount}
              columnsConfig={columnsConfig}
              options={{}}
              defaultLineHeight={lineHeight}
            />
            <FloatingButtonContainer>
              <Button disabled={props.isCommentLoading} onClick={() => loadComments()}>
                {/* to refacto with Icon component */}
                {props.isCommentLoading ? <Loader /> : <GoSync size={ICON_SIZE} />}
              </Button>
            </FloatingButtonContainer>
          </CommentTableContainer>
        </AuthenticatedPageContainer>
      )}
    </HomeContainer>
  );
});

export default Home;
