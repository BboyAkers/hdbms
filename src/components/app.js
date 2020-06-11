import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import usePersistedUser from '../state/persistedUser';

import SignUp from './auth/signUp';
import SignIn from './auth/signIn';
import ResetPassword from './auth/resetPassword';
import UpdatePassword from './auth/updatePassword';
import ResendRegistrationEmail from './auth/resendRegistrationEmail';

import ProtectedRoute from './shared/protectedRoute';
import Organization from './organization';
import Organizations from './organizations';
import Support from './support';
import Instances from './instances';
import Instance from './instance';
import Profile from './profile';
import TopNav from './topnav';

const App = () => {
  const history = useHistory();
  const [{ darkTheme }] = usePersistedUser({});
  const canonical = document.querySelector('link[rel="canonical"]');

  useEffect(() => history.listen(() => (canonical.href = window.location.href)), []);

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div id="app-container">
        <Switch>
          <Route component={SignIn} exact path="/sign-in" />
          <Route component={SignUp} exact path="/sign-up" />
          <Route component={UpdatePassword} exact path="/update-password" />
          <Route component={ResetPassword} exact path="/reset-password" />
          <Route component={ResendRegistrationEmail} exact path="/resend-registration-email" />
          <ProtectedRoute>
            <TopNav />
            <Switch>
              <Route component={Profile} path="/profile" />
              <Route component={Support} path="/support/:view?" />
              <Route component={Organizations} path="/organizations/:action?" />
              <Route component={Instances} path="/:customer_id/instances/:action?/:purchaseStep?" />
              <Route component={Instance} path="/:customer_id/instance/:compute_stack_id" />
              <Route component={Organization} path="/:customer_id/:view?" />
            </Switch>
          </ProtectedRoute>
          <Redirect to="/organizations" />
        </Switch>
      </div>
      <div id="app-bg-color" />
      <div id="app-bg-dots" />
    </div>
  );
};

export default App;
