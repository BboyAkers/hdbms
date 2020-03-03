import React from 'react';
import { Navbar, Nav, NavItem, NavLink as DumbLink } from '@nio/ui-kit';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

import useLMS from '../../state/stores/lmsAuth';
import defaultLMSAuth from '../../state/defaults/defaultLMSAuth';
import useApp from '../../state/stores/appData';
import defaultAppData from '../../state/defaults/defaultAppData';

export default () => {
  const history = useHistory();
  const [lmsAuth, setLMSAuth] = useLMS(defaultLMSAuth);
  const [, setAppData] = useApp(defaultAppData);

  return lmsAuth.user ? (
    <Navbar id="app-nav" dark fixed="top" expand="xs">
      <div className="navbar-brand">
        <div id="logo" title="HarperDB Logo" />
      </div>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink title="View Instances" to="/instances">
            <i className="fa fa-th fa-lg d-sm-none d-inline-block" /><i className="fa fa-th d-none d-sm-inline-block" />&nbsp;<span className="d-none d-sm-inline-block">Instances</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink title="Manage Account" to="/account">
            <i className="fa fa-gear fa-lg d-sm-none d-inline-block" /><i className="fa fa-gear d-none d-sm-inline-block" />&nbsp;<span className="d-none d-sm-inline-block">Account</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <DumbLink title="Log Out" onClick={() => { setLMSAuth(defaultLMSAuth); setAppData(defaultAppData); setTimeout(() => history.push('/'), 0); }}>
            <i className="fa fa-sign-out fa-lg d-sm-none d-inline-block" /><i className="fa fa-sign-out d-none d-sm-inline-block" />&nbsp;<span className="d-none d-sm-inline-block">Log Out</span>
          </DumbLink>
        </NavItem>
      </Nav>
    </Navbar>
  ) : null;
};