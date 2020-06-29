import React, { useState, useEffect } from 'react';
import { Row, Col } from '@nio/ui-kit';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useStoreState } from 'pullstate';
import { ErrorBoundary } from 'react-error-boundary';

import instanceState from '../../../state/instanceState';

import DataTable from './datatable';
import EntityManager from './entityManager';
import JSONViewer from './jsonviewer';
import CSVUpload from './csvupload';
import EmptyPrompt from './emptyPrompt';
import StructureReloader from '../../shared/structureReloader';
import ErrorFallback from '../../shared/errorFallback';
import addError from '../../../api/lms/addError';

const defaultTableState = {
  tableData: [],
  totalPages: 0,
  totalRecords: 0,
  loading: false,
  filtered: [],
  sorted: [],
  page: 0,
  pageSize: 20,
  autoRefresh: false,
  showFilter: false,
  newEntityAttributes: false,
  hashAttribute: false,
  dataTableColumns: [],
};

export default () => {
  const history = useHistory();
  const { compute_stack_id, schema, table, action, customer_id } = useParams();
  const structure = useStoreState(instanceState, (s) => s.structure, [compute_stack_id]);
  const [entities, setEntities] = useState({ schemas: [], tables: [], activeTable: false });
  const [tableState, setTableState] = useState(defaultTableState);
  const baseUrl = `/o/${customer_id}/i/${compute_stack_id}/browse`;

  useEffect(() => {
    if (structure) {
      const schemas = Object.keys(structure);
      const tables = Object.keys(structure?.[schema] || {});
      const activeTable = structure?.[schema]?.[table];

      switch (true) {
        case !schemas.length && history.location.pathname !== '/browse':
          setEntities({ schemas: [], tables: [], activeTable: false });
          history.push(`/o/${customer_id}/i/${compute_stack_id}/browse`);
          break;
        case schemas.length && !schemas.includes(schema):
          history.push(`/o/${customer_id}/i/${compute_stack_id}/browse/${schemas[0]}`);
          break;
        case tables.length && !tables.includes(table):
          history.push(`/o/${customer_id}/i/${compute_stack_id}/browse/${schema}/${tables[0]}`);
          break;
        default:
          setEntities({ schemas, tables, activeTable });
      }
    }
  }, [structure, schema, table, compute_stack_id]);

  return (
    <Row>
      <Col xl="3" lg="4" md="5" xs="12">
        <ErrorBoundary
          onError={(error, componentStack) => addError({ error: { message: error.message, componentStack }, customer_id, compute_stack_id })}
          FallbackComponent={ErrorFallback}
        >
          <EntityManager activeItem={schema} items={entities.schemas} baseUrl={baseUrl} itemType="schema" showForm />
          {schema && <EntityManager activeItem={table} items={entities.tables} activeSchema={schema} baseUrl={`${baseUrl}/${schema}`} itemType="table" showForm />}
          <StructureReloader centerText label="refresh schemas and tables" />
        </ErrorBoundary>
      </Col>
      <Col xl="9" lg="8" md="7" xs="12">
        <ErrorBoundary
          onError={(error, componentStack) => addError({ error: { message: error.message, componentStack }, customer_id, compute_stack_id })}
          FallbackComponent={ErrorFallback}
        >
          {schema && table && action === 'csv' && entities.activeTable ? (
            <CSVUpload />
          ) : schema && table && action && entities.activeTable ? (
            <JSONViewer newEntityAttributes={tableState.newEntityAttributes} hashAttribute={tableState.hashAttribute} />
          ) : schema && table && entities.activeTable ? (
            <DataTable activeTable={entities.activeTable} tableState={tableState} setTableState={setTableState} />
          ) : (
            <EmptyPrompt
              message={`Please ${(schema && entities.tables && !entities.tables.length) || !entities.schemas.length ? 'create' : 'choose'} a ${schema ? 'table' : 'schema'}`}
            />
          )}
        </ErrorBoundary>
      </Col>
    </Row>
  );
};
