import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Loader from './components/Loader/Loader';

const Home = lazy(() => import('./pages/Home'));
const Tags = lazy(() => import('./pages/Tags'));
const Graphs = lazy(() => import('./pages/Graphs'));

export const PATHS = {
  HOME: '/',
  TAGS: '/tags',
  GRAPHS: '/graphs',
};

const routes = () => (
  <Suspense fallback={<Loader />}>
    <Switch>
      <Route exact path={PATHS.HOME} component={Home} />
      <Route path={PATHS.TAGS} component={Tags} />
      <Route path={PATHS.GRAPHS} component={Graphs} />
    </Switch>
  </Suspense>
);

export default routes;
