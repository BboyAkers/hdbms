import React, { useState } from 'react';
import { Col, Row, Button, Card, CardBody, RadioCheckbox } from '@nio/ui-kit';
import { useHistory } from 'react-router';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';
import { useStoreState } from 'pullstate';

import appState from '../../../state/appState';

import config from '../../../config';
import useNewInstance from '../../../state/newInstance';
import CouponForm from '../../shared/couponForm';

export default () => {
  const history = useHistory();
  const { customer_id } = useParams();
  const [newInstance, setNewInstance] = useNewInstance({});
  const [formState, setFormState] = useState({});
  const [formData, setFormData] = useState({ tc_version: newInstance.tc_version || false });
  const stripeCoupons = useStoreState(appState, (s) => s.customer?.stripe_coupons);
  const subdomain = useStoreState(appState, (s) => s.customer?.subdomain);
  const totalPrice = (newInstance?.compute_price || 0) + (newInstance?.storage_price || 0);
  const allPrePaid = newInstance.compute_subscription_id && (newInstance.is_local || newInstance.storage_subscription_id);
  const somePrePaid = newInstance.compute_subscription_id || newInstance.storage_subscription_id;
  const totalPriceString = allPrePaid ? 'PREPAID' : totalPrice ? `$${totalPrice.toFixed(2)}/${newInstance.compute_interval}` : somePrePaid ? 'PREPAID / FREE' : 'FREE';

  useAsyncEffect(() => {
    const { submitted } = formState;
    const { tc_version } = formData;
    if (submitted) {
      if (tc_version) {
        setNewInstance({ ...newInstance, tc_version });
        setTimeout(() => history.push(`/o/${customer_id}/instances/new/status`), 0);
      } else {
        setFormState({ error: 'Please agree to the Privacy Policy and Cloud Terms of Service.' });
      }
    }
  }, [formState]);

  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Col sm="4" className="text-nowrap text-grey">
              Instance Name
            </Col>
            <Col sm="8" className="text-sm-right text-nowrap">
              {newInstance.instance_name}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="4" className="text-nowrap text-grey">
              Admin User
            </Col>
            <Col sm="8" className="text-sm-right text-nowrap">
              {newInstance.user}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="4" className="text-nowrap text-grey">
              Admin Password
            </Col>
            <Col sm="8" className="text-sm-right text-nowrap">
              {newInstance.pass}
            </Col>
          </Row>
          <hr />
          {newInstance.is_local ? (
            <>
              <Row>
                <Col sm="4" className="text-nowrap text-grey">
                  Host
                </Col>
                <Col sm="8" className="text-sm-right text-nowrap">
                  {newInstance.host}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm="4" className="text-nowrap text-grey">
                  Port
                </Col>
                <Col sm="8" className="text-sm-right text-nowrap">
                  {newInstance.port}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm="4" className="text-nowrap text-grey">
                  Uses SSL
                </Col>
                <Col sm="8" className="text-sm-right text-nowrap">
                  {newInstance.is_ssl ? 'yes' : 'no'}
                </Col>
              </Row>
              <hr />
            </>
          ) : (
            <>
              <Row>
                <Col sm="4" className="text-nowrap text-grey">
                  Instance URL
                </Col>
                <Col sm="8" className="text-sm-right text-nowrap">
                  {newInstance.instance_name}-{subdomain}.harperdbcloud.com
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm="4" className="text-nowrap text-grey">
                  Instance Region
                </Col>
                <Col sm="8" className="text-sm-right text-nowrap">
                  {newInstance.instance_region}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm="6" className="text-nowrap text-grey">
                  Instance Storage
                </Col>
                <Col xs="4" sm="2" className="text-sm-right text-nowrap">
                  {newInstance.data_volume_size_string}
                </Col>
                <Col xs="8" sm="4" className="text-sm-right text-nowrap text-truncate">
                  {newInstance.storage_price_string_with_interval}
                </Col>
              </Row>
              <hr />
            </>
          )}
          <Row>
            <Col sm="6" className="text-nowrap text-grey">
              Instance RAM
            </Col>
            <Col xs="4" sm="2" className="text-sm-right text-nowrap">
              {newInstance.compute_ram_string}
            </Col>
            <Col xs="8" sm="4" className="text-sm-right text-nowrap text-truncate">
              {newInstance.compute_price_string_with_interval}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="8" className="text-nowrap text-grey">
              Instance Total Price
            </Col>
            <Col sm="4" className="text-sm-right text-nowrap">
              <b>{totalPriceString}</b>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <hr className="my-3" />
      {stripeCoupons?.length ? (
        <div className="px-2 text-center text-success">
          This organization has <b>{stripeCoupons.length}</b> coupon{stripeCoupons.length > 1 && 's'} on file, good for a total product credit of{' '}
          <b>${stripeCoupons.reduce((total, coupon) => total + parseInt(coupon.amount_off / 100, 10), 0)}</b>. Charges beyond that amount will be billed to your card.
        </div>
      ) : (
        <div className="px-2">
          <CouponForm />
        </div>
      )}
      <hr className="my-3" />
      <Row noGutters>
        <Col xs="2" sm="1" className="text-nowrap overflow-hidden pl-2">
          <RadioCheckbox
            id="agreeToTermsAndConditions"
            className={formState.error ? 'error' : ''}
            type="radio"
            onChange={(value) => setFormData({ tc_version: value })}
            options={{ value: config.tc_version }}
          />
        </Col>
        <Col xs="10" sm="11" className="text-small pt-1 pr-2">
          I agree to HarperDB&apos;s&nbsp;
          <a href="https://harperdb.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://harperdb.io/legal/harperdb-cloud-terms-of-service/" target="_blank" rel="noopener noreferrer">
            HarperDB Cloud Terms of Service
          </a>
        </Col>
      </Row>
      <hr className="mt-3 mb-0" />
      <Row>
        <Col sm="6">
          <Button
            onClick={() => history.push(`/o/${customer_id}/instances/new/details_${newInstance.is_local ? 'local' : 'cloud'}`)}
            title="Back to Instance Details"
            block
            className="mt-3"
            color="purple"
          >
            <i className="fa fa-chevron-circle-left mr-2" />
            Instance Details
          </Button>
        </Col>
        <Col sm="6">
          <Button id="addInstance" onClick={() => setFormState({ submitted: true })} title="Confirm Instance Details" block className="mt-3" color="purple">
            Add Instance
            <i className="fa fa-check-circle ml-2" />
          </Button>
        </Col>
      </Row>
      {formState.error && (
        <Card className="mt-3 error">
          <CardBody>{formState.error}</CardBody>
        </Card>
      )}
    </>
  );
};
