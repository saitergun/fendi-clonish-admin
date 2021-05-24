import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Layout, { Main } from '../../component/layout/Layout1';

const PageHome = ({ user, setTitle }) => {
  useEffect(() => {
    setTitle('Home');
  }, []);

  return (
    <Layout>
      <Main>
        <h1 className="bp3-heading">Welcome, {user.name}.</h1>
      </Main>
    </Layout>
  );
};

const { setTitle } = require('../../store/state/app');

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  setTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageHome);
