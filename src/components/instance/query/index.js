import React, { useState } from 'react';
import { Row, Col } from '@nio/ui-kit';

import DataTable from './datatable';
import QueryWindow from './queryWindow';
import QueryHistory from './queryHistory';

export default () => {
  const [query, setQuery] = useState(false);
  const [pastQuery, setPastQuery] = useState(false);

  return (
    <Row>
      <Col xl="3" lg="4" md="5" xs="12">
        <QueryWindow setQuery={setQuery} query={pastQuery} />
        <QueryHistory setQuery={setPastQuery} query={query} />
      </Col>
      <Col xl="9" lg="8" md="7" xs="12">
        <DataTable query={query} />
      </Col>
    </Row>
  );
};
