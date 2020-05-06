import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Row, Col } from '@nio/ui-kit';
import useAsyncEffect from 'use-async-effect';
import { useHistory } from 'react-router';
import { NavLink, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import usePersistedLMSAuth from '../../state/persistedLMSAuth';
import appState from '../../state/appState';

import getUser from '../../api/lms/getUser';
import isEmail from '../../methods/util/isEmail';

export default () => {
  const [persistedLMSAuth, setPersistedLMSAuth] = usePersistedLMSAuth({});
  const [formState, setFormState] = useState({});
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const { search } = useLocation();
  const { returnURL } = queryString.parse(search);

  useAsyncEffect(async () => {
    const { submitted } = formState;
    if (submitted) {
      const { email, pass } = formData;
      if (!isEmail(email)) {
        setFormState({ error: 'a valid email is required' });
      } else if (!pass) {
        setFormState({ error: 'password is required' });
      } else {
        setFormState({ processing: true });
        const response = await getUser({ email, pass });
        if (response.error) {
          setFormState({ error: 'Invalid Credentials' });
          appState.update((s) => {
            s.auth = false;
          });
          setPersistedLMSAuth({});
        } else {
          setPersistedLMSAuth({ ...persistedLMSAuth, email, pass });
          if (!response.orgs) {
            response.orgs = [{ customer_id: response.customer_id, customer_name: 'Default', status: 'accepted' }];
            if (window.location.hostname !== 'studio.harperdb.io') {
              response.orgs.push({ customer_id: 16271551, customer_name: 'Fake Accepted Org', status: 'accepted' });
              response.orgs.push({ customer_id: 16051003, customer_name: 'Fake Invited Org', status: 'invited' });
            }
          }
          appState.update((s) => {
            s.auth = { ...response, email, pass };
          });
          const destination = response.update_password
            ? '/update-password'
            : !returnURL || returnURL === '/organizations' || returnURL === '/organizations/load' || returnURL === '/organizations/undefined'
            ? '/organizations/load'
            : `/organizations/load?returnURL=${returnURL}`;
          history.push(destination);
        }
      }
    }
  }, [formState]);

  useAsyncEffect(() => {
    if (!formState.submitted) setFormState({});
  }, [formData]);

  useAsyncEffect(() => {
    if (persistedLMSAuth && persistedLMSAuth.email && persistedLMSAuth.pass && !formState.processing) {
      setFormData(persistedLMSAuth);
      setTimeout(() => setFormState({ submitted: true }), 100);
    }
  }, [persistedLMSAuth]);

  return (
    <div id="login-form">
      <div id="login-logo" title="HarperDB Logo" />
      {formState.processing ? (
        <>
          <Card className="mb-3">
            <CardBody className="text-white text-center">
              <div className="mb-3">signing in</div>
              <i className="fa fa-spinner fa-spin text-white" />
            </CardBody>
          </Card>
          <div className="login-nav-link">&nbsp;</div>
        </>
      ) : (
        <>
          <Card className="mb-3">
            <CardBody onKeyDown={(e) => e.keyCode !== 13 || setFormState({ submitted: true })}>
              <Input
                onChange={(e) => {
                  e.currentTarget.focus();
                  setFormData({ ...formData, email: e.target.value });
                }}
                disabled={formState.submitted}
                className="mb-2 text-center"
                type="text"
                title="email"
                autoComplete="username"
                placeholder="email address"
              />
              <Input
                onChange={(e) => {
                  e.currentTarget.focus();
                  setFormData({ ...formData, pass: e.target.value });
                }}
                disabled={formState.submitted}
                className="mb-4 text-center"
                type="password"
                title="password"
                autoComplete="current-password"
                placeholder="password"
              />
              <Button onClick={() => setFormState({ submitted: true })} title="Sign In My Account" block color="purple" disabled={formState.submitted}>
                Sign In
              </Button>
            </CardBody>
          </Card>
          {formState.error ? (
            <div className="login-nav-link error">{formState.error}</div>
          ) : (
            <Row>
              <Col xs="6">
                <NavLink to="/sign-up" className="login-nav-link">
                  Sign Up for Free
                </NavLink>
              </Col>
              <Col xs="6" className="text-right">
                <NavLink to="/reset-password" className="login-nav-link">
                  Reset Password
                </NavLink>
              </Col>
            </Row>
          )}
        </>
      )}
    </div>
  );
};
