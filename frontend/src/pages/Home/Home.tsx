import React, { useEffect } from 'react';
import {
  HomeContainer,
  CommentTableContainer,
  ChartsContainer,
  AuthenticatedPageContainer,
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
import { BarChartCard } from './components/BarChartCard';
import PieChart from 'components/PieChart';
import { chain } from 'lodash';
import Login from '../Login';
import {
  fixedColumnCount,
  columnsConfig,
  lineHeight,
  CommentTableOptionsType,
} from './columnsConfig';
import { HomePropsType } from './Home.type';

const Home = React.memo<HomePropsType>(props => {
  const { loadRepositories, isAuthenticated, loadComments, loadTags } = props;

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

  return (
    <HomeContainer>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <AuthenticatedPageContainer>
          <FiltersHeader>
            <DateRangeFilterSelector />
            <FiltersContainer>
              <FiltersPrefix>Filter by :</FiltersPrefix>
              <RepositoryIdsMultiSelect
                placeholder="Projects"
                noOptionsMessage="Nous ne trouvons pas de projets. Avez vous bien installé l'app commentor sur votre compte et sur votre repository ?"
              />
              <FilterSpacer />
              <TagMultiSelect placeholder="Tags" />
              <FilterSpacer />
              <RequesterMultiSelect placeholder="Requester" />
              <FilterSpacer />
              <CommentorMultiSelect placeholder="Commentors" />
            </FiltersContainer>
          </FiltersHeader>
          <ChartsContainer>
            <BarChartCard comments={props.comments} tags={props.tags} />
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
              values={chain(props.comments)
                .sortBy('creationDate')
                .reverse()
                .value()}
              fixedColumnCount={fixedColumnCount}
              columnsConfig={columnsConfig}
              options={{}}
              defaultLineHeight={lineHeight}
            />
          </CommentTableContainer>
        </AuthenticatedPageContainer>
      )}
    </HomeContainer>
  );
});

export default Home;
