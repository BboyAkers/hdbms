import React, { useState, useEffect } from 'react';
import { Row, Col } from '@nio/ui-kit';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useStoreState } from 'pullstate';

import instanceState from '../../../state/instanceState';

import DataTable from './datatable';
import EntityManager from './entityManager';
import JSONViewer from './jsonviewer';
import CSVUpload from './csvupload';
import EmptyPrompt from './emptyPrompt';

export default () => {
  const history = useHistory();
  const { compute_stack_id, schema, table, action } = useParams();
  const [entities, setEntities] = useState({
    schemas: false,
    tables: false,
    activeTable: false,
  });
  const { structure } = useStoreState(
    instanceState,
    (s) => ({
      structure: s.structure,
    }),
    [compute_stack_id]
  );

  useEffect(() => {
    if (structure) {
      setEntities({
        schemas: Object.keys(structure),
        tables: Object.keys(structure?.[schema] || {}),
        activeTable: structure?.[schema]?.[table],
      });
    }
  }, [structure, schema, table, compute_stack_id]);

  useEffect(() => {
    if (entities.schemas) {
      switch (true) {
        case !entities.schemas.length && history.location.pathname !== '/browse':
          history.push(`/instance/${compute_stack_id}/browse`);
          break;
        case entities.schemas?.length && (!schema || !entities.schemas.includes(schema)):
          history.push(`/instance/${compute_stack_id}/browse/${entities.schemas[0]}`);
          break;
        case entities.tables?.length && (!table || !entities.tables.includes(table)):
          history.push(`/instance/${compute_stack_id}/browse/${schema}/${entities.tables[0]}`);
          break;
        default:
          break;
      }
    }
  }, [entities]);

  return (
    <Row>
      <Col xl="3" lg="4" md="5" xs="12">
        <EntityManager activeItem={schema} items={entities.schemas} baseUrl={`/instance/${compute_stack_id}/browse`} itemType="schema" showForm />
        {schema && (
          <EntityManager activeItem={table} items={entities.tables} activeSchema={schema} baseUrl={`/instance/${compute_stack_id}/browse/${schema}`} itemType="table" showForm />
        )}
      </Col>
      <Col xl="9" lg="8" md="7" xs="12">
        {schema && table && action === 'csv' && entities.activeTable ? (
          <CSVUpload />
        ) : schema && table && action && entities.activeTable ? (
          <JSONViewer newEntityColumns={entities.activeTable.newEntityColumns} hashAttribute={entities.activeTable.hashAttribute} />
        ) : schema && table && entities.activeTable ? (
          <DataTable activeTable={entities.activeTable} />
        ) : (
          <EmptyPrompt
            message={`Please ${(schema && entities.tables && !entities.tables.length) || !entities.schemas.length ? 'create' : 'choose'} a ${schema ? 'table' : 'schema'}`}
          />
        )}
      </Col>
    </Row>
  );
};
