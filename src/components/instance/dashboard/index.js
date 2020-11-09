import React, { useState, useEffect, useCallback } from 'react';
import { Col, Row, Card, CardBody, Button } from 'reactstrap';
import { useStoreState } from 'pullstate';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useAlert } from 'react-alert';
import useInterval from 'use-interval';

import appState from '../../../functions/state/appState';
import instanceState from '../../../functions/state/instanceState';

import commaNumbers from '../../../functions/util/commaNumbers';
import DashboardChart from './dashboardChart';
import getCharts from '../../../functions/api/lms/getCharts';
import removeChart from '../../../functions/api/lms/removeChart';
import registrationInfo from '../../../functions/api/instance/registrationInfo';
import config from '../../../config';

const DashboardIndex = () => {
  const { customer_id, compute_stack_id } = useParams();
  const history = useHistory();
  const alert = useAlert();
  const auth = useStoreState(appState, (s) => s.auth);
  const instanceAuth = useStoreState(instanceState, (s) => s.auth);
  const url = useStoreState(instanceState, (s) => s.url);
  const charts = useStoreState(instanceState, (s) => s.charts);
  const registration = useStoreState(instanceState, (s) => s.registration);
  const structure = useStoreState(instanceState, (s) => s.structure);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({ schemas: '...', tables: '...', records: '...' });

  const refreshCharts = useCallback(() => {
    if (auth && customer_id && compute_stack_id) {
      getCharts({ auth, customer_id, compute_stack_id });
    }
  }, [auth, customer_id, compute_stack_id]);

  const refreshRegistration = useCallback(() => {
    if (instanceAuth && url) {
      registrationInfo({ auth: instanceAuth, url });
    }
  }, [instanceAuth, url]);

  useEffect(() => {
    refreshCharts();
  }, [auth, customer_id, compute_stack_id, refreshCharts]);

  useEffect(() => {
    refreshRegistration();
  }, [auth, refreshRegistration, url]);

  useEffect(() => {
    if (structure) {
      const schemas = Object.keys(structure);
      setDashboardStats({
        schemas: commaNumbers(schemas.length.toString()),
        tables: commaNumbers(schemas.reduce((a, b) => a + Object.keys(structure[b]).length, 0).toString()),
        records: commaNumbers(schemas.reduce((a, b) => a + Object.keys(structure[b]).reduce((c, d) => c + structure[b][d].record_count, 0), 0).toString()),
      });
    }
  }, [structure]);

  useInterval(refreshCharts, config.refresh_content_interval);

  const handleRemoveChart = async (id) => {
    const response = await removeChart({ auth, customer_id, compute_stack_id, id });
    if (response.error) {
      alert.error(response.message);
    } else {
      alert.success(response.message);
      getCharts({ auth, customer_id, compute_stack_id });
    }
  };

  return (
    <Row id="dashboard">
      <Col lg="2" sm="4" xs="6" className="mb-3">
        <Card>
          <CardBody className="text-nowrap text-truncate">
            <h5>{dashboardStats.schemas}</h5>
            schemas
          </CardBody>
        </Card>
      </Col>
      <Col lg="2" sm="4" xs="6" className="mb-3">
        <Card>
          <CardBody className="text-nowrap text-truncate">
            <h5>{dashboardStats.tables}</h5>
            tables
          </CardBody>
        </Card>
      </Col>
      <Col lg="2" sm="4" xs="6" className="mb-3">
        <Card>
          <CardBody className="text-nowrap text-truncate">
            <h5>{dashboardStats.records}</h5>
            total records
          </CardBody>
        </Card>
      </Col>
      <Col lg="2" sm="4" xs="6" className="mb-3">
        <Card>
          <CardBody className="text-nowrap text-truncate">
            <h5>
              {registration?.ram_allocation / 1024 || '...'}
              <span className="text-small">GB</span>
            </h5>
            licensed ram
          </CardBody>
        </Card>
      </Col>
      <Col lg="2" sm="4" xs="6" className="mb-3">
        <Card>
          <CardBody className="text-nowrap text-truncate">
            <h5>{registration?.license_expiration_date || '...'}</h5>
            license exp
          </CardBody>
        </Card>
      </Col>
      <Col lg="2" sm="4" xs="6" className="mb-3">
        <Card>
          <CardBody className="text-nowrap text-truncate">
            <h5>{registration?.version || '...'}</h5>
            hdb version
          </CardBody>
        </Card>
      </Col>
      <Col xs="12">
        <hr className="mt-0 mb-3 dashboard-divider" />
        <div className="text-center text-bold instructions">
          To add charts to the dashboard, execute a
          <Button id="goToQueryPage" onClick={() => history.push(`/o/${customer_id}/i/${compute_stack_id}/query`)} size="sm" color="purple" className="px-2 mx-2">
            <i className="fa fa-search text-small mr-2 " /> query
          </Button>
          Then click &quot;create chart&quot;
        </div>
        <hr className="my-3 dashboard-divider" />
      </Col>
      {charts &&
        charts.map((chart) => <DashboardChart key={chart.id} chart={chart} removeChart={handleRemoveChart} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} />)}
    </Row>
  );
};

export default DashboardIndex;
