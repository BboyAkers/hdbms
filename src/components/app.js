import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useStoreState } from 'pullstate';
import useInterval from 'use-interval';
import { positions, useAlert } from 'react-alert';
import { ErrorBoundary } from 'react-error-boundary';

import appState from '../state/appState';
import usePersistedUser from '../state/persistedUser';
import config from '../config';

import TopNav from './topnav';
import Loader from './shared/loader';
import Maintenance from './shared/maintenance';
import ErrorFallback from './shared/errorFallback';
import ErrorFallbackAuth from './shared/errorFallbackAuth';

import getProducts from '../api/lms/getProducts';
import getRegions from '../api/lms/getRegions';
import getCurrentVersion from '../api/lms/getCurrentVersion';
import getPostManCollection from '../methods/examples/getPostManCollection';
import checkVersion from '../methods/app/checkVersion';
import init from '../methods/app/init';
import refreshUser from '../methods/app/refreshUser';

const SignUp = lazy(() => import('./auth/signUp'));
const SignIn = lazy(() => import('./auth/signIn'));
const ResetPassword = lazy(() => import('./auth/resetPassword'));
const UpdatePassword = lazy(() => import('./auth/updatePassword'));
const ResendRegistrationEmail = lazy(() => import('./auth/resendRegistrationEmail'));
const Organization = lazy(() => import('./organization'));
const Organizations = lazy(() => import('./organizations'));
const Support = lazy(() => import('./support'));
const Instances = lazy(() => import('./instances'));
const Instance = lazy(() => import('./instance'));
const Profile = lazy(() => import('./profile'));

const versionAlertOptions = { timeout: 0, position: positions.BOTTOM_CENTER };
let controller;

export default () => {
  const history = useHistory();
  const alert = useAlert();
  const auth = useStoreState(appState, (s) => s.auth);
  const products = useStoreState(appState, (s) => s.products);
  const regions = useStoreState(appState, (s) => s.regions);
  const version = useStoreState(appState, (s) => s.version);
  const postmanCollection = useStoreState(appState, (s) => s.postmanCollection);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [showVersionAlert, setShowVersionAlert] = useState(false);
  const [persistedUser, setPersistedUser] = usePersistedUser({});

  const showPasswordUpdate = auth?.user_id && auth?.update_password;
  const loggedIn = auth?.user_id;

  useEffect(() => {
    setShowVersionAlert(checkVersion({ apiVersion: version.studio }));
  }, [version.studio]);

  useEffect(() => {
    if (showVersionAlert) alert.info(`HarperDB Studio v${showVersionAlert} is now available. Refresh to update.`, versionAlertOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showVersionAlert]);

  useEffect(() => {
    init({ auth: persistedUser, history, setFetchingUser, setPersistedUser, controller, showPasswordUpdate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    if (!products) getProducts();
    if (!regions) getRegions();
    if (!postmanCollection) getPostManCollection();
    refreshUser({ auth, showPasswordUpdate, controller, setFetchingUser });
  }, config.refresh_content_interval);

  useInterval(() => getCurrentVersion(), config.check_version_interval);

  return (
    <div className={persistedUser?.darkTheme ? 'dark' : ''}>
      <div id="app-container">
        {config.maintenance ? (
          <ErrorBoundary FallbackComponent={ErrorFallbackAuth}>
            <Maintenance />
          </ErrorBoundary>
        ) : showPasswordUpdate ? (
          <ErrorBoundary FallbackComponent={ErrorFallbackAuth}>
            <UpdatePassword />
          </ErrorBoundary>
        ) : loggedIn ? (
          <>
            <TopNav />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<Loader header=" " spinner />}>
                <Switch>
                  <Route component={Profile} path="/profile" />
                  <Route component={Support} path="/support/:view?" />
                  <Route component={Instance} path="/o/:customer_id/i/:compute_stack_id" />
                  <Route component={Instances} path="/o/:customer_id/instances/:action?/:purchaseStep?" />
                  <Route component={Organization} path="/o/:customer_id/:view?" />
                  <Route component={Organizations} path="/:action?" />
                  <Redirect to="/" />
                </Switch>
              </Suspense>
            </ErrorBoundary>
          </>
        ) : fetchingUser ? (
          <Loader header="signing in" spinner />
        ) : (
          <ErrorBoundary FallbackComponent={ErrorFallbackAuth}>
            <Suspense fallback={<Loader header=" " spinner />}>
              <Switch>
                <Route component={SignIn} exact path="/" />
                <Route component={SignUp} exact path="/sign-up" />
                <Route component={ResetPassword} exact path="/reset-password" />
                <Route component={ResendRegistrationEmail} exact path="/resend-registration-email" />
                <Redirect to="/" />
              </Switch>
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
      <div id="app-bg-color" />
      <div id="app-bg-dots" />
    </div>
  );
};
