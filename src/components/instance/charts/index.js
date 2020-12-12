import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardBody, Button, Col, Row } from 'reactstrap';
import { useStoreState } from 'pullstate';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useAlert } from 'react-alert';
import useInterval from 'use-interval';

import appState from '../../../functions/state/appState';
import instanceState from '../../../functions/state/instanceState';

import DashboardChart from './DashboardChart';
import PlaceholderChart from './PlaceholderChart';
import getCharts from '../../../functions/api/lms/getCharts';
import removeChart from '../../../functions/api/lms/removeChart';
import config from '../../../config';
import Loader from '../../shared/Loader';

let controller;

const DashboardIndex = () => {
  const { customer_id } = useParams();
  const history = useHistory();
  const alert = useAlert();
  const auth = useStoreState(appState, (s) => s.auth);
  const compute_stack_id = useStoreState(instanceState, (s) => s.compute_stack_id);
  const charts = useStoreState(instanceState, (s) => s.charts);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(true);

  const handleRemoveChart = useCallback(
    async (id) => {
      const response = await removeChart({ auth, customer_id, compute_stack_id, id });
      if (response.error) {
        alert.error(response.message);
      } else {
        alert.success(response.message);
        setLastUpdate(Date.now());
      }
    },
    [alert, auth, compute_stack_id, customer_id]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      controller = new AbortController();
      await getCharts({ auth, customer_id, compute_stack_id, signal: controller.signal });
      if (isMounted) setLoading(false);
    };

    if (auth) fetchData();

    return () => {
      controller?.abort();
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, lastUpdate]);

  useInterval(() => auth && setLastUpdate(Date.now()), config.refresh_content_interval);

  return (
    <div id="charts">
      <Card className="mb-4">
        <CardBody className="text-center">
          To add charts to the dashboard, execute a
          <Button id="goToQueryPage" onClick={() => history.push(`/o/${customer_id}/i/${compute_stack_id}/query`)} size="sm" color="purple" className="px-2 mx-2">
            <i className="fa fa-search text-small mr-2 " /> query
          </Button>
          Then click &quot;create chart&quot;
        </CardBody>
      </Card>
      <Row>
        {loading && !charts?.length ? (
          <Loader header="loading charts" spinner />
        ) : charts?.length ? (
          charts.map((chart) => <DashboardChart key={chart.id} chart={chart} removeChart={handleRemoveChart} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} />)
        ) : (
          <Col lg="6" xs="12" className="mb-3">
            <Card className="dashboard-chart">
              <CardBody className="text-nowrap position-relative">
                <PlaceholderChart />
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default DashboardIndex;