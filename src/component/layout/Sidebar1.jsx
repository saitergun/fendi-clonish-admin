import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Icon,
  Button,
  Menu,
  MenuItem,
  MenuDivider,
} from '@blueprintjs/core';

import {
  Popover2,
} from '@blueprintjs/popover2';

const UserMenu = ({ onClickSignOut }) => {
  return (
    <Menu>
      <MenuItem
        icon="person"
        text="Profile"
        onClick={() => console.log('q')}
      />

      <MenuDivider />

      <MenuItem
        icon="log-out"
        text="Sign Out"
        onClick={onClickSignOut}
        shouldDismissPopover={false}
      />
    </Menu>
  )
};

const MenuGroup = ({ title, links }) => {
  return (
    <div className="-mx-2">
      <h3 className="text-11/16 font-300 tracking-widest text-gray-1 px-4">{title}</h3>

      <nav className="flex flex-col gap-0.5 mt-2">
        {links.map((link, index) => {
          return (
            <NavLink
              key={index}
              className="flex items-center hover:bg-light-gray-4 transform transition-colors duration-200 rounded gap-2.5 py-1.5 px-4"
              activeClassName="bg-light-gray-4"
              to={link.to}
            >{link.text}</NavLink>
          );
        })}
      </nav>
    </div>
  );
};

const Sidebar1 = ({ user, signOut }) => {
  return (
    <>
      <div>
        <Link className="inline-flex items-center hover:bg-light-gray-4 active:bg-light-gray-3 rounded-full p-2" to="/">
          <Icon
            icon="unresolve"
            iconSize={36}
          />
        </Link>

        <div className="flex flex-col gap-4 mt-4">
          <MenuGroup
            title="PRODUCTS"
            links={[
              { to: '/products', text: 'Products' },
              { to: '/categories', text: 'Categories' },
            ]}
          />

          <MenuGroup
            title="MANAGEMENT"
            links={[
              { to: '/users', text: 'Users' },
              { to: '/settings', text: 'Settings' },
            ]}
          />
        </div>
      </div>

      <div>
        <Popover2
          placement="bottom-start"
          content={(
            <UserMenu
              onClickSignOut={() => signOut()}
            />
          )}
        >
          <Button
            icon="person"
            small
            text={`${user.name} ${user.surname}`}
          />
        </Popover2>
      </div>
    </>
  );
};

const { signOut } = require('../../store/state/auth');

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar1);
