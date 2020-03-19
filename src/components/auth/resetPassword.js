import React, { useState } from 'react';
import { Card, CardBody, Input, Button, Col, Row } from '@nio/ui-kit';
import useAsyncEffect from 'use-async-effect';
import { NavLink } from 'react-router-dom';

import isEmail from '../../util/isEmail';
import resetPassword from '../../api/lms/resetPassword';
import handleKeydown from '../../util/handleKeydown';

export default () => {
  const [formState, setFormState] = useState({});
  const [formData, updateForm] = useState({});

  useAsyncEffect(async () => {
    const { submitted, processing } = formState;
    if (submitted && !processing) {
      const { email } = formData;

      if (!isEmail(email)) {
        setFormState({ error: 'invalid email supplied' });
        setTimeout(() => updateForm({}), 1000);
      } else if (!email) {
        setFormState({ error: 'email is required' });
        setTimeout(() => updateForm({}), 1000);
      } else {
        setFormState({ processing: true });
        const response = await resetPassword({ payload: { email } });
        if (response.result === false) {
          setFormState({ error: response.message });
          setTimeout(() => updateForm({}), 1000);
        } else {
          setFormState({ success: true });
        }
      }
    }
  }, [formState]);

  useAsyncEffect(() => { if (!formState.submitted) { setFormState({}); } }, [formData]);

  return (
    <div id="login-form">
      <div id="login-logo" title="HarperDB Logo" />
      {formState.processing ? (
        <>
          <Card className="mb-3">
            <CardBody className="text-center text-white">
              Resetting Password<br /><br />
              <i className="fa fa-spinner fa-spin text-white" />
            </CardBody>
          </Card>
          <div className="text-small login-nav-link text-center">&nbsp;</div>
        </>
      ) : formState.success ? (
        <>
          <Card className="mb-3">
            <CardBody className="text-center text-white">
              Success!<br /><br />
              If that email exists in our system, we sent you a password reset email.
            </CardBody>
          </Card>
          <div className="text-small text-white text-center">
            <NavLink to="/sign-in" className="login-nav-link">Back to Sign In</NavLink>
          </div>
        </>
      ) : (
        <>
          <Card className="mb-3">
            <CardBody className="text-center text-white">
              <Input
                onChange={(e) => updateForm({ ...formData, email: e.target.value })}
                onKeyDown={(e) => handleKeydown(e, setFormState)}
                disabled={formState.submitted}
                className="mb-4 text-center"
                type="text"
                title="email"
                name="email"
                placeholder="email address"
              />
              <Button
                onClick={() => setFormState({ submitted: true })}
                disabled={formState.submitted}
                title="Send Password Reset Email"
                block
                color="purple"
              >
                Send Password Reset Email
              </Button>
            </CardBody>
          </Card>
          {formState.error ? (
            <div className="text-small login-nav-link text-center">
              {formState.error}&nbsp;
            </div>
          ) : (
            <Row>
              <Col xs="6">
                <NavLink to="/sign-in" className="login-nav-link">Back to Sign In</NavLink>
              </Col>
              <Col xs="6" className="text-right">
                <NavLink to="/sign-up" className="login-nav-link">Sign Up for Free</NavLink>
              </Col>
            </Row>
          )}
        </>
      )}
    </div>
  );
};