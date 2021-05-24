import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import { Spinner } from '@blueprintjs/core';

import {
  startApp as actionStartApp,
} from '../store/state/app';

import PrivateRoute from './PrivateRoute'

import PageNotFound from '../page/notFound/Index';
import PageAuthSignIn from '../page/auth/sign-in/Index';
import PageHome from '../page/home/Index';

import PageProducts from '../page/products/Index';
import PageCategories from '../page/categories/Index';

const { REACT_APP_TITLE } = process.env;

const AppLoader = () => (
  <span className="fixed inset-0 w-full h-full flex items-center justify-center bg-white overflow-hidden p-8">
    <Helmet title="Loading" />

    <Spinner intent="primary" size={50} />
  </span>
);

const App = ({ title, loading, startApp }) => {
  useLayoutEffect(() => {
    startApp();
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  return (
    <>
      <Helmet
        defaultTitle={REACT_APP_TITLE}
        titleTemplate={`%s / ${REACT_APP_TITLE}`}
        title={title}
      />

      <Switch>
        <Route path="/auth/sign-in" component={PageAuthSignIn} exact />

        <PrivateRoute path="/products" component={PageProducts} exact />
        <PrivateRoute path="/categories" component={PageCategories} exact />

        <PrivateRoute path="/" component={PageHome} exact />

        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => ({
  title: state.app.title,
  loading: state.app.loading,
});

const mapDispatchToProps = {
  startApp: actionStartApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
