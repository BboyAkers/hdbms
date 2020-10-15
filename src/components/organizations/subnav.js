import React from 'react';
import { Navbar, Nav } from 'reactstrap';
import { ErrorBoundary } from 'react-error-boundary';

import Search from './search';
import ErrorFallback from '../shared/errorFallback';
import addError from '../../functions/api/lms/addError';

const SubNav = () => (
  <ErrorBoundary onError={(error, componentStack) => addError({ error: { message: error.message, componentStack } })} FallbackComponent={ErrorFallback}>
    <Navbar className="app-subnav">
      <Nav navbar>
        <div className="filter-holder">
          <Search />
        </div>
      </Nav>
    </Navbar>
  </ErrorBoundary>
);

export default SubNav;
