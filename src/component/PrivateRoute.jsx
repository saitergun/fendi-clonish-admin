/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({ user, ...rest }) => {
  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }

  return (
    <Route {...rest} />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(withRouter(PrivateRoute));
