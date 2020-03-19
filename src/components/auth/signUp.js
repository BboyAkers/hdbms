import React, { useState } from 'react';
import { Input, Button, Row, Col, Card, CardBody } from '@nio/ui-kit';
import useAsyncEffect from 'use-async-effect';
import { NavLink } from 'react-router-dom';

import isEmail from '../../util/isEmail';
import addCustomer from '../../api/lms/addCustomer';
import handleKeydown from '../../util/handleKeydown';

export default () => {
  const [formState, setFormState] = useState({});
  const [formData, updateForm] = useState({});

  useAsyncEffect(async () => {
    const { submitted, processing } = formState;
    if (submitted && !processing) {
      const { firstname, lastname, email, customer_name, subdomain, coupon_code } = formData;

      if (!firstname || !lastname || !email || !customer_name || !subdomain) {
        setFormState({ error: 'All fields must be filled out' });
        setTimeout(() => updateForm({}), 1000);
      } else if (!isEmail(email)) {
        setFormState({ error: 'Please provide a valid email' });
        setTimeout(() => updateForm({}), 1000);
      } else {
        setFormState({ ...formState, processing: true });
        const response = await addCustomer({ payload: { firstname, lastname, email, customer_name, subdomain, coupon_code } });
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
            <CardBody className="text-white text-center">
              Creating Your Account<br /><br />
              <i className="fa fa-spinner fa-spin text-white" />
            </CardBody>
          </Card>
          <div className="login-nav-link">&nbsp;</div>
        </>
      ) : formState.success ? (
        <>
          <Card className="mb-3">
            <CardBody>
              <div className="text-center text-white">
                Success!<br /><br />
                Check your email for your username and password.
              </div>
            </CardBody>
          </Card>
          <Row>
            <Col xs="6">
              <NavLink to="/sign-in" className="login-nav-link">Sign In</NavLink>
            </Col>
            <Col xs="6" className="text-right">
              <NavLink to="/resend-registration-email" className="login-nav-link">Resend Email</NavLink>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Card className="mb-3">
            <CardBody>
              <Input
                onKeyDown={(e) => handleKeydown(e, setFormState)}
                className="mb-2 text-center"
                type="text"
                title="first name"
                placeholder="first name"
                value={formData.firstname || ''}
                disabled={formState.submitted}
                onChange={(e) => updateForm({ ...formData, firstname: e.target.value })}
              />
              <Input
                onKeyDown={(e) => handleKeydown(e, setFormState)}
                className="mb-2 text-center"
                type="text"
                title="last name"
                placeholder="last name"
                value={formData.lastname || ''}
                disabled={formState.submitted}
                onChange={(e) => updateForm({ ...formData, lastname: e.target.value })}
              />
              <Input
                onKeyDown={(e) => handleKeydown(e, setFormState)}
                className="mb-2 text-center"
                type="text"
                title="email"
                placeholder="email"
                value={formData.email || ''}
                disabled={formState.submitted}
                onChange={(e) => updateForm({ ...formData, email: e.target.value })}
              />
              <Input
                onKeyDown={(e) => handleKeydown(e, setFormState)}
                className="mb-2 text-center"
                type="text"
                title="company name"
                placeholder="company name"
                value={formData.customer_name || ''}
                disabled={formState.submitted}
                onChange={(e) => updateForm({ ...formData, customer_name: e.target.value })}
              />
              <Row>
                <Col xs="6">
                  <Input
                    onKeyDown={(e) => handleKeydown(e, setFormState)}
                    className="mb-2 text-center"
                    type="text"
                    title="subdomain"
                    placeholder="subdomain"
                    value={formData.subdomain || ''}
                    disabled={formState.submitted}
                    onChange={(e) => updateForm({ ...formData, subdomain: e.target.value })}
                  />
                </Col>
                <Col xs="6" className="pt-2 pl-0 text-white text-nowrap subdomain-label">
                  .harperdbcloud.com
                </Col>
              </Row>
              <Input
                type="text"
                className="mb-4 text-center"
                name="coupon_code"
                title="coupon code"
                placeholder="coupon code (optional)"
                value={formData.coupon_code || ''}
                onChange={(e) => updateForm({ ...formData, coupon_code: e.target.value })}
                disabled={formState.submitted}
              />
              <Button
                color="purple"
                block
                disabled={formState.submitted}
                onClick={() => setFormState({ submitted: true })}
              >
                Sign Up For Free
              </Button>
            </CardBody>
          </Card>
          {formState.error ? (
            <div className="login-nav-link text-center">
              {formState.error}&nbsp;
            </div>
          ) : (
            <div className="text-center">
              <NavLink to="/sign-in" className="login-nav-link">Already Have An Account? Sign In Instead.</NavLink>
            </div>
          )}
        </>
      )}
    </div>
  );
};