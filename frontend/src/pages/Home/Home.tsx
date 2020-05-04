import React, { useEffect } from 'react';
import {
  HomeContainer,
  FloatingButtonContainer,
  CommentTableContainer,
  ChartsContainer,
  AuthenticatedPageContainer,
} from './Home.style';
import { GenericTable } from 'components/GenericTable/GenericTable';
import { CommentType } from 'redux/Comment';
import { GoSync } from 'react-icons/go';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { chain } from 'lodash';
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
