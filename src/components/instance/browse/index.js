import React, { useState, useEffect, lazy } from 'react';
import { Row, Col } from 'reactstrap';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useStoreState } from 'pullstate';
import { ErrorBoundary } from 'react-error-boundary';

import instanceState from '../../../functions/state/instanceState';

import ErrorFallback from '../../shared/ErrorFallback';
import addError from '../../../functions/api/lms/addError';
import useInstanceAuth from '../../../functions/state/instanceAuths';
import EmptyPrompt from '../../shared/EmptyPrompt';
import buildInstanceStructure from '../../../functions/instance/browse/buildInstanceStructure';

const DataTable = lazy(() => import(/* webpackChunkName: "browse-datatable" */ './BrowseDatatable'));
const EntityManager = lazy(() => import(/* webpackChunkName: "browse-entitymanager" */ './EntityManager'));
const JSONEditor = lazy(() => import(/* webpackChunkName: "browse-jsonviewer" */ './JSONEditor'));
const CSVUpload = lazy(() => import(/* webpackChunkName: "browse-csvupload" */ './CsvUpload'));
const StructureReloader = lazy(() => import(/* webpackChunkName: "structure-reloader" */ '../../shared/StructureReloader'));

const defaultTableState = {
  tableData: [],
  dataTableColumns: [],
  filtered: [],
  sorted: [],
  page: 0,
  pageSize: 20,
  autoRefresh: false,
  showFilter: false,
  newEntityAttributes: false,
  hashAttribute: false,
};

function BrowseIndex() {
  const navigate = useNavigate();
  const location = useLocation();
  const { schema, table, action, customer_id, compute_stack_id } = useParams();
  const [instanceAuths] = useInstanceAuth({});
  const auth = instanceAuths && instanceAuths[compute_stack_id];
  const url = useStoreState(instanceState, (s) => s.url);
  const registration = useStoreState(instanceState, (s) => s.registration);
  const version = registration?.version;
  const [major, minor] = version?.split('.') || [];
  const versionAsFloat = `${major}.${minor}`;
  const structure = useStoreState(instanceState, (s) => s.structure);
  const [entities, setEntities] = useState({ schemas: [], tables: [], activeTable: false });
  const [tableState, setTableState] = useState(defaultTableState);
  const baseUrl = `/o/${customer_id}/i/${compute_stack_id}/browse`;
  const showForm = instanceAuths[compute_stack_id]?.super || instanceAuths[compute_stack_id]?.structure === true;
  const showTableForm = showForm || (instanceAuths[compute_stack_id]?.structure && instanceAuths[compute_stack_id]?.structure?.includes(schema));
  const emptyPromptMessage = showForm
    ? `Please ${(schema && entities.tables && !entities.tables.length) || !entities.schemas.length ? 'create' : 'choose'} a ${schema ? 'table' : 'schema'}`
    : "This user has not been granted access to any tables. A super-user must update this user's role.";

  const syncInstanceStructure = () => {
    buildInstanceStructure({ auth, url });
  }

  const validate = () => {
    if (structure) {

      /*
       * FIXME: There is a fair amount of logic scattered throughout this 
       * page that could be put in a router-level validation function.
       *
       * Splitting the browse endpoint into /schema/ and /schema/table heirarchy
       * might ease this.
       *
       */

      const schemas = Object.keys(structure);
      const tables = Object.keys(structure?.[schema] || {});

      if (!schemas.length && location.pathname !== '/browse') {
          setEntities({ schemas: [], tables: [], activeTable: false });
          navigate(`/o/${customer_id}/i/${compute_stack_id}/browse`);
          return;
      }

      // redirect to a valid schema if path doesn't match database's schema
      if (schemas.length && !schemas.includes(schema)) {
          navigate(`/o/${customer_id}/i/${compute_stack_id}/browse/${schemas[0]}`);
          return;
      }

      // redirect to a valid table if path doesn't match database's schema
      if (tables.length && !tables.includes(table)) {
          navigate(`/o/${customer_id}/i/${compute_stack_id}/browse/${schema}/${tables[0]}`);
          return;
      }

      if (entities.activeTable !== `${compute_stack_id}:${schema}:${table}`) {
        setTableState(defaultTableState);
      }
      setEntities({ schemas, tables, activeTable: `${compute_stack_id}:${schema}:${table}` });

    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(validate, [structure, schema, table, compute_stack_id])
  useEffect(syncInstanceStructure, [auth, url, schema, table]);

  return (
    <Row>
      <Col xl="3" lg="4" md="5" xs="12">
        <ErrorBoundary
          onError={(error, componentStack) => addError({ error: { message: error.message, componentStack } })}
          FallbackComponent={ErrorFallback}>
          <EntityManager
            activeItem={schema}
            items={entities.schemas}
            baseUrl={baseUrl}
            itemType={versionAsFloat >= 4.2 ? 'database' : 'schema'}
            showForm={showForm} />
            {
              schema && <EntityManager
                activeItem={table}
                items={entities.tables}
                activeSchema={schema}
                baseUrl={`${baseUrl}/${schema}`}
                itemType="table"
                showForm={showTableForm} />
            }
          <StructureReloader centerText label="refresh schemas and tables" />
        </ErrorBoundary>
      </Col>
      <Col xs="12" className="d-block d-md-none">
        <hr />
      </Col>
      <Col xl="9" lg="8" md="7" xs="12">
        <ErrorBoundary
          onError={(error, componentStack) => addError({ error: { message: error.message, componentStack } })}
          FallbackComponent={ErrorFallback}>
          {schema && table && action === 'csv' && entities.activeTable ? (
            <CSVUpload />
          ) : schema && table && action && entities.activeTable ? (
            <JSONEditor newEntityAttributes={tableState.newEntityAttributes} hashAttribute={tableState.hashAttribute} />
          ) : schema && table && entities.activeTable ? (
            <DataTable activeTable={entities.activeTable} tableState={tableState} setTableState={setTableState} />
          ) : (
            <EmptyPrompt headline={emptyPromptMessage} icon={<i className="fa fa-exclamation-triangle text-warning" />} />
          )}
        </ErrorBoundary>
      </Col>
    </Row>
  );
}

export const metadata = {
  path: `browse/:schema?/:table?/:action?/:hash?`,
  link: 'browse',
  label: 'browse',
  icon: 'list',
  iconCode: 'f03a',
};

export default BrowseIndex;
