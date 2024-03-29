import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { storeMigrations } from './store.migration';
import createReducer from './reducers';
import rootSaga from './sagas';

export const CURRENT_STORE_VERSION = 6;

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(history) {
  const initialState = {};
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  /* eslint-enable */

  const rootReducer = createReducer({ router: connectRouter(history) });
  const persistConfig = {
    key: 'root',
    whitelist: ['authentication', 'filters'],
    storage,
    version: CURRENT_STORE_VERSION,
    migrate: createMigrate(storeMigrations, { debug: true }),
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, initialState, composeEnhancers(...enhancers));

  sagaMiddleware.run(rootSaga);
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};

  const persistor = persistStore(store);

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then(reducerModule => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return { store, persistor };
}
