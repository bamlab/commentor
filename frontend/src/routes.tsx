import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Loader from './components/Loader/Loader';

const Home = lazy(() => import('./pages/Home'));
const Tags = lazy(() => import('./pages/Tags'));

export const PATHS = {
  HOME: '/',
  TAGS: '/tags',
};

const routes = () => (
  <Suspense fallback={<Loader />}>
    <Switch>
      <Route exact path={PATHS.HOME} component={Home} />
      <Route path={PATHS.TAGS} component={Tags} />
    </Switch>
  </Suspense>
);

export default routes;
