import React, { useState } from 'react';
import { Input, Button, Card, CardBody, SelectDropdown } from '@nio/ui-kit';
import useAsyncEffect from 'use-async-effect';
import { useAlert } from 'react-alert';

import addUser from '../../../api/instance/addUser';

export default ({ auth, url, roles, users, refreshInstance }) => {
  const alert = useAlert();
  const [formState, setFormState] = useState({ submitted: false, error: false });
  const [formData, updateForm] = useState({ username: '', password: '', role: false });

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
        const response = await addUser({ auth, role, username, password, url });
        if (response.message.indexOf('successfully') !== -1) {
          updateForm({ username: '', password: '', role: false });
          refreshInstance(Date.now());
          alert.success(response.message);
        } else {
          alert.error(response.message);
        }
        setFormState({ submitted: false, error: false });
      }
    }
  }, [formState]);

  useAsyncEffect(() => { if (roles) updateForm({ ...formData, role: false }); }, [roles]);

  return (
    <>
      <span className="text-white mb-2 floating-card-header">add user</span>
      <Card className="my-3">
        <CardBody>
          <Input
            type="text"
            className="mb-2 text-center"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={(e) => updateForm({ ...formData, username: e.target.value, error: false })}
          />

          <Input
            type="text"
            className="mb-2 text-center"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={(e) => updateForm({ ...formData, password: e.target.value, error: false })}
          />

          <SelectDropdown
            className="mb-4 select-dropdown"
            onChange={({ value }) => updateForm({ ...formData, role: value })}
            options={roles && roles.map((r) => ({ label: r.role, value: r.id }))}
            value={roles && formData.role && roles.find((r) => r.value === formData.role)}
            isSearchable={false}
            isClearable={false}
            isLoading={!roles}
            placeholder="Select A Role"
          />

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
