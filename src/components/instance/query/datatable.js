import React, { useState } from 'react';
import ReactTable from 'react-table-6';
import useAsyncEffect from 'use-async-effect';
import useInterval from 'use-interval';
import { Card, CardBody } from 'reactstrap';
import { useStoreState } from 'pullstate';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';

import config from '../../../config';
import instanceState from '../../../state/instanceState';

import DataTableHeader from './datatableHeader';
import ChartModal from './chartModal';
import getQueryData from '../../../methods/instance/getQueryData';
import EmptyPrompt from './emptyPrompt';
import ErrorFallback from '../../shared/errorFallback';
import addError from '../../../api/lms/addError';

const defaultTableState = {
  tableData: [],
  totalPages: -1,
  totalRecords: 0,
  loading: false,
  filtered: [],
  sorted: [],
  autoRefresh: false,
  showFilter: false,
  dataTableColumns: [],
  error: false,
  message: false,
  reload: false,
  accessErrors: false,
};

let controller;

export default ({ query }) => {
  const { customer_id, compute_stack_id } = useParams();
  const [lastUpdate, setLastUpdate] = useState();
  const auth = useStoreState(instanceState, (s) => s.auth);
  const url = useStoreState(instanceState, (s) => s.url);
  const is_local = useStoreState(instanceState, (s) => s.is_local);
  const [tableState, setTableState] = useState(defaultTableState);
  const [showChartModal, setShowChartModal] = useState(false);

  useAsyncEffect(() => {
    if (query.query) {
      setTableState({ ...defaultTableState, reload: true });
    } else {
      setTableState({ ...tableState, tableData: [], error: false, message: false, reload: false });
    }
  }, [query.query]);

  useAsyncEffect(
    async () => {
      if (query.query && query.lastUpdate) {
        if (controller) controller.abort();
        controller = new AbortController();
        setTableState({ ...tableState, loading: true });

        const response = await getQueryData({ query: query.query.replace(/\n/g, ' ').trim(), auth, url, signal: controller.signal, is_local, compute_stack_id, customer_id });

        if (response.error) {
          setTableState({ ...tableState, message: `Error fetching data: ${response.message}`, access_errors: response.access_errors, loading: false, error: true, reload: false });
        } else if (response.message) {
          setTableState({ ...tableState, message: response.message, loading: false, error: false, reload: false });
        } else if (!response.tableData.length) {
          setTableState({ ...tableState, message: 'Your query produced no results', loading: false, error: false, reload: false });
        } else {
          const sortable = query.query.toLowerCase().indexOf('order by') === -1;
          setTableState({
            ...tableState,
            tableData: response.tableData,
            totalRecords: response.totalRecords,
            dataTableColumns: response.dataTableColumns,
            loading: false,
            error: false,
            message: false,
            reload: false,
            sorted: sortable ? [{ id: response.dataTableColumns[0].accessor, desc: (tableState.sorted && tableState.sorted[0]?.desc) || false }] : [],
            sortable,
          });
        }
      }
    },
    () => {
      if (controller) controller.abort();
    },
    [query, lastUpdate]
  );

  useInterval(() => {
    if (tableState.autoRefresh && !tableState.loading) setLastUpdate(Date.now());
  }, config.refresh_content_interval);

  return tableState.reload ? (
    <EmptyPrompt message="Executing Query" />
  ) : tableState.message ? (
    <EmptyPrompt error={tableState.error} message={tableState.message} accessErrors={tableState.access_errors} />
  ) : tableState.tableData?.length ? (
    <ErrorBoundary
      onError={(error, componentStack) => addError({ error: { message: error.message, componentStack }, customer_id, compute_stack_id })}
      FallbackComponent={ErrorFallback}
    >
      <DataTableHeader
        totalRecords={tableState.totalRecords}
        loading={tableState.loading}
        autoRefresh={tableState.autoRefresh}
        setAutoRefresh={() => setTableState({ ...tableState, autoRefresh: !tableState.autoRefresh })}
        showFilter={tableState.showFilter}
        filtered={tableState.filtered}
        toggleFilter={(newValues) => setTableState({ ...tableState, ...newValues })}
        setLastUpdate={setLastUpdate}
        setShowChartModal={setShowChartModal}
      />
      <Card className="my-3">
        <CardBody className="react-table-holder">
          <ReactTable
            sortable={tableState.sortable}
            loading={tableState.loading && !tableState.autoRefresh}
            loadingText="loading"
            data={tableState.tableData}
            columns={tableState.dataTableColumns}
            onFilteredChange={(value) => setTableState({ ...tableState, filtered: value })}
            filtered={tableState.filtered}
            onSortedChange={(value) => setTableState({ ...tableState, sorted: value })}
            sorted={tableState.sorted}
            onPageChange={(value) => setTableState({ ...tableState, page: value })}
            filterable={tableState.showFilter}
            defaultPageSize={tableState.pageSize}
            pageSize={tableState.pageSize}
            onPageSizeChange={(value) => setTableState({ ...tableState, pageSize: value })}
          />
        </CardBody>
      </Card>
      {showChartModal && <ChartModal setShowChartModal={setShowChartModal} tableData={tableState.tableData} query={query.query.replace(/\n/g, ' ').trim()} />}
    </ErrorBoundary>
  ) : (
    <EmptyPrompt message="Please execute a SQL query to proceed" />
  );
};
