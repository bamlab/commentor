import React, { useEffect } from 'react';
import {
  HomeContainer,
  CommentTableContainer,
  ChartsContainer,
  AuthenticatedPageContainer,
} from './Home.style';
import { FilterHeader } from './components/FilterHeader';
import { GenericTable } from 'components/GenericTable/GenericTable';
import { CommentType } from 'redux/Comment';
import { BarChartCard } from './components/BarChartCard';
import Login from '../Login';
import {
  fixedColumnCount,
  columnsConfig,
  lineHeight,
  CommentTableOptionsType,
} from './columnsConfig';
import { HomePropsType } from './Home.type';
import { PieChartAndLegendCard } from './components/PieChartAndLegendCard';

const Home = React.memo<HomePropsType>(props => {
  const { loadRepositories, isAuthenticated, loadTags } = props;

  useEffect(
    () => {
      if (isAuthenticated) {
        loadTags();
        loadRepositories();
      }
    },
    [isAuthenticated, loadRepositories],
  );

  return (
    <HomeContainer>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <AuthenticatedPageContainer>
          <FilterHeader />
          <ChartsContainer>
            <BarChartCard comments={props.comments} tags={props.tags} />
            <PieChartAndLegendCard comments={props.comments} tags={props.tags} />
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
