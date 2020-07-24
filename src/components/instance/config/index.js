import React, { useState } from 'react';
import { Card, CardBody, Col, Row } from '@nio/ui-kit';
import { useStoreState } from 'pullstate';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import instanceState from '../../../state/instanceState';
import appState from '../../../state/appState';

import UpdateDiskVolume from './updateDiskVolume';
import UpdateRAM from './updateRAM';
import RemoveInstance from './removeInstance';
import RestartInstance from './restartInstance';
import InstanceDetails from './instanceDetails';
import Loader from '../../shared/loader';
import ErrorFallback from '../../shared/errorFallback';
import addError from '../../../api/lms/addError';

export default () => {
  const { customer_id, compute_stack_id } = useParams();
  const is_local = useStoreState(instanceState, (s) => s.is_local);
  const compute_subscription_id = useStoreState(instanceState, (s) => s.compute_subscription_id);
  const storage_subscription_id = useStoreState(instanceState, (s) => s.storage_subscription_id);
  const isOrgUser = useStoreState(appState, (s) => s.auth?.orgs?.find((o) => o.customer_id?.toString() === customer_id), [customer_id]);
  const isOrgOwner = isOrgUser?.status === 'owner';
  const [instanceAction, setInstanceAction] = useState(false);
  const hasUnusedCompute = useStoreState(appState, (s) => s.subscriptions && s.subscriptions[is_local ? 'cloud_compute' : 'cloud_compute']?.length);
  const hasUnusedStorage = useStoreState(appState, (s) => s.subscriptions && s.subscriptions?.cloud_storage?.length);
  const [showPrepaidCompute, setShowPrepaidCompute] = useState(!!compute_subscription_id);
  const [showPrepaidStorage, setShowPrepaidStorage] = useState(!!storage_subscription_id);

  return instanceAction && instanceAction !== 'Restarting' ? (
    <Loader header={`${instanceAction} Instance`} spinner />
  ) : (
    <Row id="config">
      <Col xs="12">
        <ErrorBoundary
          onError={(error, componentStack) => addError({ error: { message: error.message, componentStack }, customer_id, compute_stack_id })}
          FallbackComponent={ErrorFallback}
        >
          <InstanceDetails />
        </ErrorBoundary>
      </Col>
      {isOrgOwner && (
        <Col lg="3" sm="6" xs="12">
          <Row>
            <Col>
              <span className="floating-card-header">update ram</span>
            </Col>
            <Col className="text-right">
              {!!hasUnusedCompute && (
                <span className="floating-card-header">
                  prepaid: <i onClick={() => setShowPrepaidCompute(!showPrepaidCompute)} className={`fa fa-lg fa-toggle-${showPrepaidCompute ? 'on' : 'off'}`} />
                </span>
              )}
            </Col>
          </Row>
          <Card className="my-3">
            <CardBody>
              <ErrorBoundary
                onError={(error, componentStack) => addError({ error: { message: error.message, componentStack }, customer_id, compute_stack_id })}
                FallbackComponent={ErrorFallback}
              >
                <UpdateRAM setInstanceAction={setInstanceAction} showPrepaidCompute={showPrepaidCompute} />
              </ErrorBoundary>
            </CardBody>
          </Card>
        </Col>
      )}
      {isOrgOwner && !is_local && (
        <Col lg="3" sm="6" xs="12">
          <Row>
            <Col>
              <span className="floating-card-header">update storage</span>
            </Col>
            <Col className="text-right">
              {!!hasUnusedStorage && (
                <span className="floating-card-header">
                  prepaid: <i onClick={() => setShowPrepaidStorage(!showPrepaidStorage)} className={`fa fa-lg fa-toggle-${showPrepaidStorage ? 'on' : 'off'}`} />
                </span>
              )}
            </Col>
          </Row>
          <Card className="my-3">
            <CardBody>
              <ErrorBoundary
                onError={(error, componentStack) => addError({ error: { message: error.message, componentStack }, customer_id, compute_stack_id })}
                FallbackComponent={ErrorFallback}
              >
                <UpdateDiskVolume setInstanceAction={setInstanceAction} showPrepaidStorage={showPrepaidStorage} />
              </ErrorBoundary>
            </CardBody>
          </Card>
        </Col>
      )}
      {isOrgOwner && (
        <Col lg="3" sm="6" xs="12">
          <span className="floating-card-header">remove instance</span>
          <Card className="my-3">
            <CardBody>
              <ErrorBoundary
                onError={(error, componentStack) => addError({ error: { message: error.message, componentStack }, customer_id, compute_stack_id })}
                FallbackComponent={ErrorFallback}
              >
                <RemoveInstance setInstanceAction={setInstanceAction} instanceAction={instanceAction} />
              </ErrorBoundary>
            </CardBody>
          </Card>
        </Col>
      )}
      <Col lg="3" sm="6" xs="12">
        <span className="floating-card-header">restart instance</span>
        <Card className="my-3">
          <CardBody>
            <ErrorBoundary
              onError={(error, componentStack) => addError({ error: { message: error.message, componentStack }, customer_id, compute_stack_id })}
              FallbackComponent={ErrorFallback}
            >
              <RestartInstance setInstanceAction={setInstanceAction} instanceAction={instanceAction} />
            </ErrorBoundary>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
