import React, { useMemo } from 'react';
import { Navbar, Nav, NavItem, NavLink as DumbLink } from 'reactstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { useStoreState } from 'pullstate';
import { ErrorBoundary } from 'react-error-boundary';

import appState from '../state/appState';
import addError from '../api/lms/addError';

import ErrorFallback from './shared/errorFallback';
import changeFavIcon from '../methods/app/changeFavIcon';

const TopNav = () => {
  const { pathname } = useLocation();
  const auth = useStoreState(appState, (s) => s.auth);
  const customer = useStoreState(appState, (s) => s.customer);
  const theme = useStoreState(appState, (s) => s.theme);
  const nextTheme = !theme || theme === 'purple' ? 'dark' : theme === 'dark' ? 'light' : 'purple';
  const showInviteBadge = useMemo(
    () => auth?.orgs?.filter((org) => org.status === 'invited').length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth.orgs]
  );

  const showManageIcon = useMemo(
    () => auth?.orgs?.find((o) => o.customer_id?.toString() === customer?.customer_id?.toString())?.status === 'owner',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth.orgs, customer.customer_id]
  );

  const toggleTheme = (newValue) =>
    appState.update((s) => {
      s.theme = newValue;
    });

  const logOut = () =>
    appState.update((s) => {
      s.auth = false;
    });

  return (
    <ErrorBoundary
      onError={(error, componentStack) =>
        addError({
          error: { message: error.message, componentStack },
          customer_id: customer?.customer_id,
          compute_stack_id: null,
        })
      }
      FallbackComponent={ErrorFallback}
    >
      <Navbar id="app-nav" dark fixed="top" expand="xs">
        <div className="navbar-brand">
          <div id="logo" title="HarperDB Logo" />
        </div>
        <Nav className="ml-auto" navbar>
          <NavItem className="ml-3">
            <NavLink title="View or Switch Organizations" to="/organizations">
              <i className="fa fa-building-o d-inline-block" />
              <span className="d-none d-lg-inline-block">&nbsp; all organizations</span>
              {showInviteBadge ? <span className="invite-badge">{showInviteBadge}</span> : null}
            </NavLink>
          </NavItem>
          <div className={`active-org ml-3 ${customer && pathname.indexOf(customer?.customer_id) !== -1 ? 'open' : ''}`}>
            <div className="text-white org-name">{customer.customer_name}</div>
            <div className="org-actions">
              <NavItem>
                <NavLink title="View Organization Instances" isActive={() => pathname.indexOf(`/o/${customer.customer_id}/i`) !== -1} to={`/o/${customer.customer_id}/instances`}>
                  <i className="fa fa-th d-inline-block" />
                  <span className="d-none d-lg-inline-block">&nbsp; instances</span>
                </NavLink>
              </NavItem>
              {showManageIcon && (
                <>
                  <NavItem className="mr-3" />
                  <NavItem>
                    <NavLink
                      isActive={(match, browserLoc) => match || browserLoc.pathname.indexOf(`/o/${customer.customer_id}/billing`) !== -1}
                      title="Manage Organization"
                      to={`/o/${customer.customer_id}/users`}
                    >
                      <i className="fa fa-gears d-inline-block" />
                      <span className="d-none d-lg-inline-block">&nbsp; manage</span>
                    </NavLink>
                  </NavItem>
                </>
              )}
            </div>
          </div>
          <NavItem className="ml-3">
            <NavLink title="Manage My Profile" to="/profile">
              <i className="fa fa-user" />
            </NavLink>
          </NavItem>
          <NavItem className="ml-3">
            <NavLink title="View Support Documentation" to="/support">
              <i className="far fa-life-ring" />
            </NavLink>
          </NavItem>
          <NavItem className="ml-3">
            <DumbLink
              tabIndex="0"
              title={theme === 'dark' ? 'Switch to light theme' : theme === 'purple' ? 'Switch to dark theme' : 'Switch to light theme'}
              onKeyDown={(e) => e.keyCode !== 13 || toggleTheme(nextTheme)}
              onClick={() => toggleTheme(nextTheme)}
            >
              <i className="fas fa-palette" />
            </DumbLink>
          </NavItem>
          <NavItem className="ml-3">
            <DumbLink tabIndex="0" title="Log Out" onKeyDown={(e) => e.keyCode !== 13 || logOut()} onClick={logOut}>
              <i className="fa fa-sign-out" />
            </DumbLink>
          </NavItem>
        </Nav>
      </Navbar>
    </ErrorBoundary>
  );
};

export default TopNav;
