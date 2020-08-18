import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useStoreState } from 'pullstate';
import { ErrorBoundary } from 'react-error-boundary';

import appState from '../../../state/appState';

import EntityManagerRow from './entityManagerRow';
import ErrorFallback from '../../shared/errorFallback';

import addError from '../../../api/lms/addError';

export default () => {
  const { type } = useParams();
  const types = useStoreState(appState, (s) => (s.integrations ? Object.keys(s.integrations).filter((k) => s.integrations[k].length) : ['active']));
  const baseUrl = '/support/marketplace';

  return (
    <ErrorBoundary onError={(error, componentStack) => addError({ error: { message: error.message, componentStack } })} FallbackComponent={ErrorFallback}>
      <div className="entity-manager">
        <div className="floating-card-header">Status</div>
        <Card className="mt-3 mb-4">
          <CardBody>{types && types.length ? types.map((item) => <EntityManagerRow key={item} item={item} baseUrl={baseUrl} isActive={type === item} />) : null}</CardBody>
        </Card>
      </div>
    </ErrorBoundary>
  );
};
