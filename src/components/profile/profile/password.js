import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button, CardBody, Card } from '@nio/ui-kit';
import { useStoreState } from 'pullstate';

import appState from '../../../state/appState';

import updatePassword from '../../../api/lms/updatePassword';
import FormStatus from '../../shared/formStatus';

export default ({ formStateHeight }) => {
  const auth = useStoreState(appState, (s) => s.auth);
  const [formState, setFormState] = useState({});
  const [formData, setFormData] = useState({});

  const submit = () => {
    setFormState({ submitted: true });
    const { oldpassword, newpassword, newpassword2 } = formData;
    if (oldpassword !== auth.pass) {
      setFormState({ error: 'old password is incorrect' });
    } else if (newpassword !== newpassword2) {
      setFormState({ error: 'new passwords do not match' });
    } else if (!oldpassword || !newpassword || !newpassword2) {
      setFormState({ error: 'all fields are required' });
    } else {
      setFormState({ processing: true });
      updatePassword({ auth, user_id: auth.user_id, password: newpassword });
    }
  };

  useEffect(() => {
    if (auth?.passwordError) {
      setFormState({ error: auth.message });
    } else if (auth?.passwordSuccess) {
      setFormState({ success: auth.message });
    }
  }, [auth.passwordError, auth.passwordSuccess]);

  useEffect(() => {
    let mounted = true;
    if (formState.error || formState.success) {
      setTimeout(() => {
        if (mounted) setFormState({});
      }, 2000);
    }
    return () => {
      mounted = false;
    };
  }, [formState.error, formState.success]);

  return formState.processing ? (
    <FormStatus height={formStateHeight} status="processing" header="Updating Password" subhead="The Security Shepherd is mad-hashing." />
  ) : formState.success ? (
    <FormStatus height={formStateHeight} status="success" header="Success!" subhead={formState.success} />
  ) : formState.error ? (
    <FormStatus height={formStateHeight} status="error" header={formState.error} subhead="Please try again" />
  ) : (
    <>
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col xs="6" className="text text-nowrap d-none d-md-block pt-2">
              current password
            </Col>
            <Col md="6" xs="12">
              <Input
                type="password"
                className="mb-0 text-center"
                name="current password"
                placeholder="current password"
                onChange={(e) => setFormData({ ...formData, oldpassword: e.target.value })}
                value={formData.oldpassword || ''}
                disabled={formState.submitted}
              />
            </Col>
            <Col xs="12">
              <hr className="my-2" />
            </Col>
            <Col xs="6" className="text text-nowrap d-none d-md-block pt-2">
              new password
            </Col>
            <Col md="6" xs="12">
              <Input
                type="password"
                className="mb-0 text-center"
                name="new password"
                placeholder="new password"
                onChange={(e) => setFormData({ ...formData, newpassword: e.target.value })}
                value={formData.newpassword || ''}
                disabled={formState.submitted}
              />
            </Col>
            <Col xs="12">
              <hr className="my-2" />
            </Col>
            <Col xs="6" className="text text-nowrap d-none d-md-block pt-2">
              verify password
            </Col>
            <Col md="6" xs="12">
              <Input
                type="password"
                className="mb-0 text-center"
                name="verify password"
                placeholder="verify password"
                onChange={(e) => setFormData({ ...formData, newpassword2: e.target.value })}
                value={formData.newpassword2 || ''}
                disabled={formState.submitted}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Button color="purple" block onClick={submit} disabled={formState.submitted}>
        Update Password
      </Button>
    </>
  );
};