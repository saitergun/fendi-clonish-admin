import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  NonIdealState,
} from '@blueprintjs/core';

const PageNotFound = ({ setTitle }) => {
  useEffect(() => {
    setTitle('Page Not Found');
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center p-4">
      <NonIdealState
        icon="search"
        description="This is not the web page you are looking for. Check address bar."
        action={(
          <Link
            className="text-link text-12/16 font-700 tracking-widest"
            to="/"
          >RETURN HOMEPAGE</Link>
        )}
      />
    </div>
  );
};

const { setTitle } = require('../../store/state/app');

const mapDispatchToProps = {
  setTitle,
};

export default connect(null, mapDispatchToProps)(PageNotFound);
