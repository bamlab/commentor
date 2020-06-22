import React, { useEffect } from 'react';
import {
  HomeContainer,
  CommentTableContainer,
  ChartsContainer,
  AuthenticatedPageContainer,
} from './Home.style';
import { GenericTable } from 'components/GenericTable/GenericTable';
import { CommentType } from 'redux/Comment';
import queryString from 'query-string';
import Login from '../Login';
import {
  fixedColumnCount,
  columnsConfig,
  lineHeight,
  CommentTableOptionsType,
} from './columnsConfig';
import { HomePropsType } from './Home.type';
import { FilterSection } from './components/FilterSection';
import { BarChartSection } from './components/BarChartSection';
import { PieChartSection } from './components/PieChartSection';

const Home = React.memo<HomePropsType>(props => {
  const { loadRepositories, isAuthenticated, loadComments, loadTags } = props;

  useEffect(
    () => {
      if (isAuthenticated) {
        loadTags();
        loadRepositories();
        loadComments();
        const params = queryString.parse(window.location.search);
        if (
          params.state &&
          typeof params.state === 'string' &&
          (params.state === 'gitlab' || params.state === 'github')
        ) {
          if (params.code && typeof params.code === 'string') {
            window.location.replace(
              process.env.REACT_APP_OAUTH_REDIRECT_URL
                ? process.env.REACT_APP_OAUTH_REDIRECT_URL
                : '',
            );
          }
        }
      }
    },
    [isAuthenticated, loadComments, loadRepositories, loadTags],
  );

  return (
    <HomeContainer>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <AuthenticatedPageContainer>
          <FilterSection />
          <ChartsContainer>
            <BarChartSection />
            <PieChartSection />
          </ChartsContainer>
          <CommentTableContainer>
            <GenericTable<CommentTableOptionsType, CommentType>
              values={props.comments}
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
