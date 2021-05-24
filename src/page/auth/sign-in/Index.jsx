import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Button,
  InputGroup,
} from '@blueprintjs/core';

const PageAuthSignIn = ({ history, user, identifier, password, signing, setIdentifier, setPassword, handleSignIn, setTitle }) => {
  const [img, setImg] = useState('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');

  const imageContainerRef = useRef();

  useLayoutEffect(() => {
    if (user) {
      history.replace('/')
    }
  }, [user]);

  useEffect(() => {
    setTitle('Sign In');

    if (window.innerWidth > 1023) {
      const { clientWidth, clientHeight } = imageContainerRef.current;
      const url = `https://source.unsplash.com/random/${clientWidth}x${clientHeight}?animals`

      try {
        fetch(url).then((response) => setImg(response.url))
      } catch (e) {
        console.log('fetch error', e)
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full flex flex-row overflow-hidden">
      <div className="w-full lg:w-1/2 h-full flex items-center lg:justify-end overflow-auto p-8">
        <form
          className="w-full max-w-sm lg:px-8"
          onSubmit={handleSignIn}
        >
          <h1 className="text-26/16 font-900">SIGN IN</h1>

          <span className="block h-6" />

          <InputGroup
            id="username"
            placeholder="Username or e-mail address"
            value={identifier}
            disabled={signing}
            onChange={(e) => setIdentifier(e.currentTarget.value)}
            required
          />

          <span className="block h-2" />

          <InputGroup
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            disabled={signing}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />

          <div className="w-2/3 mt-6">
            <Button
              type="submit"
              intent="primary"
              text={signing ? 'SIGNING IN' : 'SIGN IN'}
              disabled={signing}
              fill
            />
          </div>
        </form>
      </div>

      <div
        className="w-1/2 h-full flex-1 bg-blue-1 text-white hidden lg:block"
        ref={imageContainerRef}
      >
        <img
          className="block w-full h-full filter saturate-50 object-cover"
          src={img}
          alt=""
        />
      </div>
    </div>
  );
};

const { setIdentifier, setPassword, handleSignIn } = require('../../../store/state/page/auth/signIn');
const { setTitle } = require('../../../store/state/app');

const mapStateToProps = (state) => {
  const { identifier, password, signing } = state.page.auth.signIn;

  return {
    user: state.auth.user,

    identifier,
    password,
    signing,
  }
};

const mapDispatchToProps = {
  setIdentifier,
  setPassword,
  handleSignIn,
  setTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageAuthSignIn));
