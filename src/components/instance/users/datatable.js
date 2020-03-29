import React, { useEffect, useState } from 'react';
import { Card, CardBody, Row, Col } from '@nio/ui-kit';
import ReactTable from 'react-table';
import { useStoreState } from 'pullstate';

import defaultTableState from '../../../util/datatable/defaultTableState';
import instanceState from '../../../state/stores/instanceState';
import instanceUserColumns from '../../../util/datatable/instanceUserColumns';
import ModalPassword from './modalPassword';
import ModalRole from './modalRole';
import ModalDelete from './modalDelete';

export default () => {
  const [tableData, setTableData] = useState({ data: [], columns: [] });
  const [tableState, setTableState] = useState({ ...defaultTableState, sorted: [{ id: 'username', desc: false }] });
  const [modal, setModal] = useState(false);
  const { auth, users } = useStoreState(instanceState, (s) => ({
    auth: s.auth,
    users: s.users,
  }));

  const closeModal = ({ refresh = false }) => {
    setModal(false);
    if (refresh) {
      instanceState.update((s) => { s.lastUpdate = Date.now(); });
    }
  };

  useEffect(() => {
    if (users && auth) {
      setTableData({ data: users, columns: instanceUserColumns({ auth, setModal }) });
    }
  }, [users, auth]);

  return (
    <>
      <Row>
        <Col className="text-nowrap">
          <span className="text-white mb-2 floating-card-header">existing users</span>
        </Col>
        <Col className="text-right text-white text-nowrap">
          <a onClick={() => setTableState({ ...tableState, filtered: tableState.showFilter ? [] : tableState.filtered, showFilter: !tableState.showFilter })}>
            <i title="Filter Users" className="fa fa-search mr-3 floating-card-header" />
          </a>
        </Col>
      </Row>
      <Card className="my-3">
        <CardBody>
          <ReactTable
            data={tableData.data}
            columns={tableData.columns}
            onFilteredChange={(value) => setTableState({ ...tableState, filtered: value })}
            filtered={tableState.filtered}
            onSortedChange={(value) => setTableState({ ...tableState, sorted: value })}
            sorted={tableState.sorted}
            page={tableState.page}
            filterable={tableState.showFilter}
            defaultPageSize={tableState.pageSize}
            pageSize={tableState.pageSize}
            onPageSizeChange={(value) => setTableState({ ...tableState, pageSize: value })}
            resizable={false}
          />
        </CardBody>
      </Card>
      {modal?.action === 'password' ? (
        <ModalPassword closeModal={closeModal} username={modal.username} />
      ) : modal?.action === 'role' ? (
        <ModalRole closeModal={closeModal} username={modal.username} role={modal.role} />
      ) : modal?.action === 'delete' ? (
        <ModalDelete closeModal={closeModal} username={modal.username} />
      ) : null }
    </>
  );
};
