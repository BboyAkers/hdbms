import React, { useState, useEffect } from 'react';
import { Input, Button, Row, Col, Card, CardBody } from 'reactstrap';
import { NavLink, useLocation } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';
import queryString from 'query-string';

import handleSignup from '../../methods/auth/handleSignup';
import Loader from '../shared/loader';
import config from '../../config';

const SignUp = () => {
  const { search } = useLocation();
  const { code, htuk, pageName, pageUri } = queryString.parse(search);
  const [formState, setFormState] = useState({});
  const [formData, setFormData] = useState({ coupon_code: code, htuk, pageName, pageUri });
  const [showToolTip, setShowToolTip] = useState(false);

  useAsyncEffect(async () => {
    if (formState.submitted) {
      const newFormState = await handleSignup({ formData });
      if (newFormState) setFormState(newFormState);
    }
  }, [formState]);

  useEffect(() => {
    if (!formState.submitted) setFormState({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <div id="login-form">
      <div id="login-logo" title="HarperDB Logo" />
      <div className="version">Studio v{config.studio_version}</div>
      {formState.submitted ? (
        <Loader header="creating your account" spinner relative />
      ) : formState.success ? (
        <Loader
          header="success!"
          body="check your email for your username and password. be sure to check your spam folder, just in case."
          links={[
            { to: '/', text: 'Sign In' },
            { to: '/resend-registration-email', text: 'Resend Email' },
          ]}
          relative
        />
      ) : (
        <>
          <Card className="mb-3">
            <CardBody className="px-3" onKeyDown={(e) => e.keyCode !== 13 || setFormState({ submitted: true })}>
              <Input
                id="firstname"
                className="text-center mb-2"
                type="text"
                title="first name"
                placeholder="first name"
                value={formData.firstname || ''}
                disabled={formState.submitted}
                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
              />
              <Input
                id="lastname"
                className="text-center mb-2"
                type="text"
                title="last name"
                placeholder="last name"
                value={formData.lastname || ''}
                disabled={formState.submitted}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              />
              <Input
                id="email"
                className="text-center mb-2"
                type="text"
                title="email"
                placeholder="email"
                value={formData.email || ''}
                disabled={formState.submitted}
                onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
              />
              <Row>
                <Col className="subdomain-form">
                  <Input
                    id="subdomain"
                    className="text-center mb-2"
                    type="text"
                    title="subdomain"
                    placeholder="subdomain"
                    value={formData.subdomain || ''}
                    disabled={formState.submitted}
                    onChange={(e) => setFormData({ ...formData, subdomain: e.target.value.substring(0, 15).toLowerCase() })}
                  />
                </Col>
                <Col className="subdomain-label">
                  .harperdbcloud.com{' '}
                  <Button color="link" onClick={() => setShowToolTip(!showToolTip)}>
                    <i className="fa fa-question-circle" />
                  </Button>
                </Col>
              </Row>
              {showToolTip && (
                <div className="text-center pb-2 text-white text-small">
                  <i>The URL of your HarperDB Cloud Instances</i>
                </div>
              )}
              <Input
                id="coupon_code"
                type="text"
                className="text-center mb-2"
                name="coupon_code"
                title="coupon code"
                placeholder="coupon code (optional)"
                value={formData.coupon_code || ''}
                onChange={(e) => setFormData({ ...formData, coupon_code: e.target.value })}
                disabled={formState.submitted}
              />
              <div className="disclaimer">
                By creating an account, you agree to the&nbsp;
                <a href="https://harperdb.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
                &nbsp;and&nbsp;
                <a href="https://harperdb.io/legal/harperdb-cloud-terms-of-service/" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>
              </div>
              <Button color="purple" block disabled={formState.submitted} onClick={() => setFormState({ submitted: true })}>
                {formState.submitted ? <i className="fa fa-spinner fa-spin text-white" /> : <span>Sign Up For Free</span>}
              </Button>
            </CardBody>
          </Card>
          {formState.error ? (
            <div className="login-nav-link error">
              {formState.error}
              &nbsp;
            </div>
          ) : (
            <div className="text-center">
              <NavLink to="/" className="login-nav-link">
                Already Have An Account? Sign In Instead.
              </NavLink>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SignUp;
