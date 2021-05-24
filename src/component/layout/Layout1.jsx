import React from 'react';
import classNames from 'classnames';

import Sidebar1 from './Sidebar1';

import getChildByTypeName from '../../utility/getChildByTypeName';

export const Navbar = ({ children }) => (
  <nav className="w-full h-14 flex-shrink-0 flex items-center border-b overflow-hidden px-8">{children}</nav>
);

export const Main = ({ children, noPadding }) => (
  <main
    className={classNames('flex-1 w-full h-full overflow-hidden overflow-y-auto', {
      'p-8': !noPadding,
    })}
  >{children}</main>
);

export const Aside = ({ children, open }) => (
  <aside
    className={classNames('h-full overflow-hidden bg-light-gray-5 bp3-elevation-0 transform transition-width ease-in-out duration-300 z-10', {
      'w-0': !open,
      'w-96': open,
    })}
  >{children}</aside>
);

const Layout1 = ({ children }) => {
  const navbar = getChildByTypeName(children, 'Navbar');
  const main = getChildByTypeName(children, 'Main');
  const aside = getChildByTypeName(children, 'Aside');

  return (
    <div className="fixed inset-0 w-full h-full flex flex-row bg-white overflow-hidden">
      <aside className="w-60 h-full flex flex-shrink-0 flex-col justify-between bg-light-gray-5 p-4">
        <Sidebar1 />
      </aside>

      <div className="w-full h-full flex-1 flex flex-col overflow-hidden bp3-elevation-0">
        {navbar}

        {main}
      </div>

      {aside}
    </div>
  );
};

Layout1.Navbar = Navbar;
Layout1.Main = Main;
Layout1.Aside = Aside;

export default Layout1;
