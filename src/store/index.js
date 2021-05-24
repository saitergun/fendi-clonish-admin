import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { reducer as appReducer } from './state/app';
import { reducer as authReducer } from './state/auth';
import { reducer as dataReducer } from './state/data';

import { reducer as signInReducer } from './state/page/auth/signIn';

const logger = createLogger({
  collapsed: true,
});

const reducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  data: dataReducer,

  page: combineReducers({
    auth: combineReducers({
      signIn: signInReducer,
    }),
  }),
});

const enhancer = applyMiddleware(
  thunk,
  logger,
);

const store = createStore(reducer, enhancer);

export const StoreProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default store;
