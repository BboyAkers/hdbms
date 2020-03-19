import React, { useState } from 'react';
import { Input, Button, Row, Col } from '@nio/ui-kit';
import useAsyncEffect from 'use-async-effect';

import isEmail from '../../util/isEmail';
import addCustomer from '../../api/lms/addCustomer';

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
    <div id="add-customer-background">
      {formState.processing ? (
        <div className="p-4 text-center fieldset-label">
          <b>Creating Account</b><br /><br />
          <i className="fa fa-lg fa-spinner fa-spin text-purple" /><br /><br />
          The office dogs are typing furiously.
        </div>
      ) : formState.success ? (
        <div className="p-4 text-center fieldset-label">
          <b>Success!</b><br /><br />
          <i className="fa fa-lg fa-thumbs-up text-purple" /><br /><br />
          Check your email for your username and password.
        </div>
      ) : (
        <>
          <div className="fieldset-label">First Name</div>
          <div className="fieldset full-height">
            <Input
              type="text"
              className="mb-0"
              name="firstname"
              value={formData.firstname || ''}
              onChange={(e) => updateForm({ ...formData, firstname: e.target.value })}
              disabled={formState.submitted}
            />
          </div>

          <div className="fieldset-label">Last Name</div>
          <div className="fieldset full-height">
            <Input
              type="text"
              className="mb-0"
              name="lastname"
              value={formData.lastname || ''}
              onChange={(e) => updateForm({ ...formData, lastname: e.target.value })}
              disabled={formState.submitted}
            />
          </div>

          <div className="fieldset-label">Email Address</div>
          <div className="fieldset full-height">
            <Input
              type="text"
              className="mb-0"
              name="email"
              value={formData.email || ''}
              onChange={(e) => updateForm({ ...formData, email: e.target.value })}
              disabled={formState.submitted}
            />
          </div>

          <div className="fieldset-label">Company</div>
          <div className="fieldset full-height">
            <Input
              type="text"
              className="mb-0"
              name="customer_name"
              value={formData.customer_name || ''}
              onChange={(e) => updateForm({ ...formData, customer_name: e.target.value })}
              disabled={formState.submitted}
            />
          </div>

          <div className="fieldset-label">Subdomain</div>
          <div className="fieldset full-height">
            <Row noGutters>
              <Col xs="8">
                <Input
                  type="text"
                  className="mb-0"
                  name="customer_name"
                  value={formData.subdomain || ''}
                  onChange={(e) => updateForm({ ...formData, subdomain: e.target.value })}
                  disabled={formState.submitted}
                />
              </Col>
              <Col xs="4" className="pt-2 pl-1 text-nowrap">
                .harperdbcloud.com
              </Col>
            </Row>
          </div>

          <div className="fieldset-label">Coupon Code (optional)</div>
          <div className="fieldset full-height">
            <Input
              type="text"
              className="mb-0"
              name="coupon_code"
              value={formData.coupon_code || ''}
              onChange={(e) => updateForm({ ...formData, coupon_code: e.target.value })}
              disabled={formState.submitted}
            />
          </div>

          <Button
            color="success"
            block
            onClick={() => setFormState({ submitted: true })}
            disabled={formState.submitted}
          >
            {formState.submitted ? <i className="fa fa-spinner fa-spin text-white" /> : <span>Create A Free HarperDB Account</span>}
          </Button>
          {formState.error && (
            <div className="text-danger text-small text-center text-italic">
              <hr />
              {formState.error}
            </div>
          )}
        </>
      )}
    </div>
  );
};