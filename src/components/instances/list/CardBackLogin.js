import React, { useState } from 'react';
import { Button, Card, CardBody, Input, Row, Col } from 'reactstrap';
import useAsyncEffect from 'use-async-effect';
import { ErrorBoundary } from 'react-error-boundary';

import useInstanceAuth from '../../../functions/state/instanceAuths';
import handleCloudInstanceUsernameChange from '../../../functions/instances/handleCloudInstanceUsernameChange';
import userInfo from '../../../functions/api/instance/userInfo';
import ErrorFallback from '../../shared/ErrorFallback';
import addError from '../../../functions/api/lms/addError';
import CardInstanceUpdateRole from './CardInstanceUpdateRole';

const CardBackLogin = ({ customer_id, compute_stack_id, url, is_ssl, setFlipState, flipState, instance_id, is_local }) => {
  const [formState, setFormState] = useState({});
  const [formData, setFormData] = useState({});
  const [instanceAuths, setInstanceAuths] = useInstanceAuth({});

  useAsyncEffect(async () => {
    const { submitted } = formState;
    if (submitted) {
      const { user, pass } = formData;
      if (!user || !pass) {
        setFormState({ error: 'All fields are required' });
      } else {
        const result = await userInfo({ auth: { user, pass }, url, is_local, compute_stack_id, customer_id });

        if (is_ssl && result.error && result.type === 'catch') {
          setFormState({ error: 'Login failed. Click to verify status?', url });
        } else if (result.error && result.type === 'catch') {
          setFormState({ error: "Can't reach non-SSL instance. Enable SSL?", url: 'https://harperdb.io/developers/documentation/security/configuration/' });
        } else if (result.error && result.message === 'Login failed' && !is_local) {
          const handleCloudInstanceUsernameChangeResult = await handleCloudInstanceUsernameChange({
            instance_id,
            instanceAuth: { user, pass },
            url,
          });

          if (handleCloudInstanceUsernameChangeResult) {
            setInstanceAuths({ ...instanceAuths, [compute_stack_id]: { user: formData.user, pass: formData.pass, super: true } });
            setFlipState(false);
          } else {
            setFormState({ error: 'Login failed.' });
          }
        } else if (result.error && result.message === 'Login failed') {
          setFormState({ error: 'Login failed.' });
        } else if (result.error) {
          setFormState({ error: result.message });
        } else {
          setInstanceAuths({ ...instanceAuths, [compute_stack_id]: { user: formData.user, pass: formData.pass, super: result.role.permission.super_user } });
          setFlipState(false);
        }
      }
    }
  }, [formState]);

  return (
    <ErrorBoundary onError={(error, componentStack) => addError({ error: { message: error.message, componentStack } })} FallbackComponent={ErrorFallback}>
      <Card className="instance">
        {flipState && ( // don't render the forms unless the card is flipped, as the autocomplete icon shows through
          <CardBody>
            {formState.error && formState.error.indexOf('This instance was recently') !== -1 ? (
              <CardInstanceUpdateRole formState={formState} setFormData={setFormData} setFormState={setFormState} />
            ) : (
              <>
                <Input
                  id="username"
                  onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                  className="text-center mb-1"
                  type="text"
                  title="username"
                  placeholder="user"
                  disabled={formState.submitted}
                />
                <Input
                  id="password"
                  onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
                  className="text-center mb-2"
                  type="password"
                  title="password"
                  placeholder="password"
                  disabled={formState.submitted}
                />
                <Row noGutters>
                  <Col xs="6" className="pr-1">
                    <Button
                      onClick={() => {
                        setFormData({});
                        setFormState({});
                        setFlipState(false);
                      }}
                      title="Cancel"
                      block
                      color="grey"
                      disabled={formState.submitted}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col xs="6" className="pl-1">
                    <Button onClick={() => setFormState({ submitted: true })} title="Log Into Instance" block color="purple" disabled={formState.submitted}>
                      Log In
                    </Button>
                  </Col>
                </Row>
                {formState.error && (
                  <a href={formState.url || null} target="_blank" rel="noopener noreferrer" className="text-bold text-center text-small text-danger d-block mt-2 text-nowrap">
                    {formState.error}
                    {formState.url && <i className="ml-2 fa fa-lg fa-external-link-square text-purple" />}
                  </a>
                )}
              </>
            )}
          </CardBody>
        )}
      </Card>
    </ErrorBoundary>
  );
};

export default CardBackLogin;