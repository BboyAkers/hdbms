import React, { useState } from 'react';
import { Input, Button, Row, Col } from '@nio/ui-kit';
import useAsyncEffect from 'use-async-effect';
import { useAlert } from 'react-alert';

import isEmail from '../../util/isEmail';
import addCustomer from '../../api/lms/addCustomer';

export default () => {
  const alert = useAlert();
  const [formState, setFormState] = useState({ submitted: false, error: false });
  const [formData, updateForm] = useState({ firstname: '', lastname: '', email: '', company_name: '', subdomain: '' });

  useAsyncEffect(async () => {
    const { submitted } = formState;
    if (submitted) {
      const { firstname, lastname, email, company_name, subdomain } = formData;

      if (!firstname || !lastname || !email || !company_name || !subdomain) {
        setFormState({ submitted: false, error: 'All fields must be filled out' });
      } else if (!isEmail(email)) {
        setFormState({ submitted: false, error: 'Please provide a valid email' });
      } else {
        const response = await addCustomer({ payload: { firstname, lastname, email, company_name, subdomain } });
        if (response.result) {
          updateForm({ firstname: '', lastname: '', email: '', company_name: '', subdomain: '' });
          setFormState({ submitted: false, error: false, success: true });
          alert.success(response.message);
        } else {
          setFormState({ submitted: false, error: response.message });
        }
      }
    }
  }, [formState]);

  useAsyncEffect(() => setFormState({ error: false, submitted: false }), [formData]);

  return (
    <div id="add-customer-background">
      {formState.success ? (
        <div className="p-4 text-center">
          <h5>Success!</h5>
          <hr />
          <i className="fa fa-2x fa-thumbs-up text-purple" />
          <hr className="mb-4" />
          Check your email for your username and password.
        </div>
      ) : formState.submitted ? (
        <div className="p-4 text-center">
          <h5>Submitting</h5>
          <hr />
          <i className="fa fa-2x fa-spinner fa-spin text-purple" />
          <hr className="mb-4" />
          The office dogs are setting up your account.
        </div>
      ) : (
        <>
          <div className="fieldset-label">first name</div>
          <div className="fieldset full-height">
            <Input
              type="text"
              className="mb-0 text-center"
              name="firstname"
              value={formData.firstname}
              onChange={(e) => updateForm({ ...formData, firstname: e.target.value, error: false })}
              disabled={formState.submitted}
            />
          </div>

          <div className="fieldset-label">last name</div>
          <div className="fieldset full-height">
            <Input
              type="text"
              className="mb-0 text-center"
              name="lastname"
              value={formData.lastname}
              onChange={(e) => updateForm({ ...formData, lastname: e.target.value, error: false })}
              disabled={formState.submitted}
            />
          </div>

          <div className="fieldset-label">email address</div>
          <div className="fieldset full-height">
            <Input
              type="text"
              className="mb-0 text-center"
              name="email"
              value={formData.email}
              onChange={(e) => updateForm({ ...formData, email: e.target.value, error: false })}
              disabled={formState.submitted}
            />
          </div>

          <div className="fieldset-label">company</div>
          <div className="fieldset full-height">
            <Input
              type="text"
              className="mb-0 text-center"
              name="company_name"
              value={formData.company_name}
              onChange={(e) => updateForm({ ...formData, company_name: e.target.value, error: false })}
              disabled={formState.submitted}
            />
          </div>

          <div className="fieldset-label">subdomain</div>
          <div className="fieldset full-height">
            <Row noGutters>
              <Col xs="8">
                <Input
                  type="text"
                  className="mb-0 text-center"
                  name="company_name"
                  value={formData.subdomain}
                  onChange={(e) => updateForm({ ...formData, subdomain: e.target.value, error: false })}
                  disabled={formState.submitted}
                />
              </Col>
              <Col xs="4" className="pt-2 pl-1 text-nowrap">
                .harperdbcloud.com
              </Col>
            </Row>

          </div>

          <Button
            color="success"
            block
            onClick={() => setFormState({ submitted: true, error: false })}
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
