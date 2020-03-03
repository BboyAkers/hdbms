import React, { useState } from 'react';
import { Input, Button, Card, CardBody, RadioCheckbox } from '@nio/ui-kit';
import useAsyncEffect from 'use-async-effect';
import { useAlert } from 'react-alert';

import addUser from '../../../api/instance/addUser';

export default ({ auth, roles, users, refreshInstance }) => {
  const alert = useAlert();
  const [formState, setFormState] = useState({ submitted: false, error: false });
  const [formData, updateForm] = useState({ username: '', password: '' });

  useAsyncEffect(async () => {
    const { submitted } = formState;
    if (submitted) {
      const { username, password, role } = formData;

      if (!username || !role || !password) {
        setFormState({ submitted: false, error: 'All fields must be filled out' });
      } else if (username.indexOf(' ') !== -1) {
        setFormState({ submitted: false, error: 'Username may not have spaces' });
      } else if (users.find((u) => u.username.toLowerCase() === username.toLowerCase())) {
        setFormState({ submitted: false, error: 'User already exists' });
      } else {
        const response = await addUser({ auth, role, username, password });
        if (response.message.indexOf('successfully') !== -1) {
          updateForm({ username: '', password: '', role: roles[0].id });
          refreshInstance(Date.now());
          alert.success(response.message);
        } else {
          alert.error(response.message);
        }
        setFormState({ submitted: false, error: false });
      }
    }
  }, [formState]);

  useAsyncEffect(() => { if (roles) updateForm({ ...formData, role: roles[0].id }); }, [roles]);

  return (
    <>
      <span className="text-white mb-2 floating-card-header">add user</span>
      <Card className="my-3">
        <CardBody>
          <div className="fieldset-label">username</div>
          <div className="fieldset full-height">
            <Input
              type="text"
              className="mb-0 text-center"
              name="username"
              value={formData.username}
              onChange={(e) => updateForm({ ...formData, username: e.target.value, error: false })}
            />
          </div>

          <div className="fieldset-label">password</div>
          <div className="fieldset full-height">
            <Input
              type="text"
              className="mb-0 text-center"
              name="password"
              value={formData.password}
              onChange={(e) => updateForm({ ...formData, password: e.target.value, error: false })}
            />
          </div>

          <div className="fieldset-label">role</div>
          <div className="fieldset full-height">
            {roles && (
              <RadioCheckbox
                className="radio-button"
                type="radio"
                onChange={(value) => updateForm({ ...formData, role: value })}
                options={roles ? roles.map((r) => ({ label: r.role, value: r.id })) : []}
                value={formData.role}
                defaultValue={formData.role}
              />
            )}
          </div>

          <Button
            color="success"
            block
            onClick={() => setFormState({ submitted: true, error: false })}
          >
            Add User
          </Button>
          {formState.error && (
            <div className="text-danger text-small text-center text-italic">
              <hr />
              {formState.error}
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};