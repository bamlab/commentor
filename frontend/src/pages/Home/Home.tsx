import React, { useEffect } from 'react';
import {
  HomeContainer,
  FloatingButtonContainer,
  CommentTableContainer,
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
import Login from '../Login';
import {
  fixedColumnCount,
  columnsConfig,
  lineHeight,
  CommentTableOptionsType,
} from './columnsConfig';
import { HomePropsType } from './Home.type';

const ICON_SIZE = 25;

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

  const barChartFormattedData = chain(props.comments)
    .groupBy((comment: CommentType) => {
      comment.creationDate.setHours(0, 0, 0, 0);
      return comment.creationDate;
    })
    .map((comments: CommentType[], date: Date) =>
      map(comments, (comment: CommentType) =>
        chain(props.tags)
          .filter((tag: TagType) => !!comment.body.match(tag.code))
          .map((tag: TagType) => {
            comment.creationDate.setHours(0, 0, 0, 0);
            return [{ x: comment.creationDate, y: 1, y0: 0, tag }];
          })
          .value(),
      ),
    )
    .flattenDeep()
    .sortBy('x')
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
              values={chain(props.comments)
                .sortBy('creationDate')
                .reverse()
                .value()}
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
