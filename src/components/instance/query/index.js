import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';

import DataTable from './Datatable';
import QueryWindow from './QueryWindow';
import QueryHistory from './QueryHistory';

export const metadata = {
  path: `query`,
  link: 'query',
  label: 'query',
  icon: 'search',
  iconCode: 'f002',
};

function QueryIndex() {
  const [query, setQuery] = useState(false);

  return (
    <Row id="query">
      <Col xl="3" lg="4" md="5" xs="12">
        <QueryWindow setQuery={setQuery} query={query} />
        <QueryHistory setQuery={setQuery} query={query} />
      </Col>
      <Col xl="9" lg="8" md="7" xs="12">
        <DataTable query={query} />
      </Col>
    </Row>
  );
}

export default QueryIndex;
