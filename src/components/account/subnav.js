import React from 'react';
import { Navbar, Nav, NavItem } from '@nio/ui-kit';
import { NavLink } from 'react-router-dom';

export default ({ routes = [] }) => (
  <Navbar className="app-subnav" fixed="top" expand="xs">
    <Nav navbar>
      {routes.map((route) => (
        <NavItem key={route.path}>
          <NavLink className="text-capitalize" to={`/account/${route.link}`}>
            <i className={`d-none d-sm-inline-block fa mr-2 fa-${route.icon}`} />
            {route.link}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  </Navbar>
);
