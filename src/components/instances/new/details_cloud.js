import React, { useState } from 'react';
import { RadioCheckbox, Button, Card, CardBody, Col, Row } from '@nio/ui-kit';
import useAsyncEffect from 'use-async-effect';
import { useHistory } from 'react-router';
import useNewInstance from '../../../state/stores/newInstance';

export default ({ products, storage, regions, hasCard }) => {
  const history = useHistory();
  const [newInstance, setNewInstance] = useNewInstance({});
  const [formState, setFormState] = useState({});
  const [formData, updateForm] = useState({
    data_volume_size: newInstance.data_volume_size || storage[0].value,
    stripe_plan_id: newInstance.stripe_plan_id || products[0].value,
    instance_region: newInstance.instance_region || regions[0].value,
    instance_type: false,
  });

  const selectedProduct = products && formData.stripe_plan_id && products.find((p) => p.value === formData.stripe_plan_id);
  const computePrice = selectedProduct?.price;
  const instanceType = selectedProduct?.instance_type;
  const storagePrice = storage && formData.data_volume_size ? storage.find((p) => p.value === formData.data_volume_size).price : 0;
  const needsCard = products && storage && !hasCard && computePrice && (computePrice !== 'FREE' || storagePrice !== 'FREE');

  useAsyncEffect(() => {
    const { submitted } = formState;
    const { stripe_plan_id, instance_region, data_volume_size } = formData;
    if (submitted) {
      if (stripe_plan_id && instance_region && data_volume_size) {
        setNewInstance({ ...newInstance, ...formData, instance_type: instanceType });
        setTimeout(() => history.push(needsCard ? '/instances/new/payment' : '/instances/new/confirm'), 0);
      } else {
        setFormState({ error: 'All fields must be filled out.' });
      }
    }
  }, [formState]);

  return (
    <>
      <Card>
        <CardBody>
          <div className="fieldset-label">Storage Size (scroll for more)</div>
          <div className="fieldset">
            <RadioCheckbox
              id="data_volume_size"
              className="radio-button"
              type="radio"
              onChange={(value) => updateForm({ ...formData, data_volume_size: value })}
              options={storage}
              value={formData.data_volume_size}
              defaultValue={newInstance.data_volume_size ? storage.find((p) => p.value === newInstance.data_volume_size) : storage[0]}
            />
          </div>

          <div className="fieldset-label">Instance RAM (scroll for more)</div>
          <div className="fieldset">
            <RadioCheckbox
              id="stripe_plan_id"
              className="radio-button"
              type="radio"
              onChange={(value) => updateForm({ ...formData, stripe_plan_id: value })}
              options={products}
              value={formData.stripe_plan_id}
              defaultValue={newInstance.stripe_plan_id ? products.find((p) => p.value === newInstance.stripe_plan_id) : products[0]}
            />
          </div>

          <div className="fieldset-label">Instance Region (scroll for more)</div>
          <div className="fieldset">
            <RadioCheckbox
              id="instance_region"
              className="radio-button"
              type="radio"
              onChange={(value) => updateForm({ ...formData, instance_region: value })}
              options={regions}
              value={formData.instance_region}
              defaultValue={newInstance.instance_region ? regions.find((p) => p.value === newInstance.instance_region) : regions[0]}
            />
          </div>
        </CardBody>
      </Card>
      <Row>
        <Col sm="6">
          <Button
            onClick={() => history.push('/instances/new/meta_cloud')}
            title="Back to Basic Info"
            block
            className="mt-3"
            color="purple"
            outline
          >
            <i className="fa fa-chevron-circle-left mr-2" />Basic Info
          </Button>
        </Col>
        <Col sm="6">
          <Button
            onClick={() => setFormState({ submitted: true })}
            title={needsCard ? 'Add Payment Method' : 'Confirm Instance Details'}
            block
            className="mt-3"
            color="purple"
          >
            {needsCard ? 'Add Payment Method' : 'Confirm Instance Details'}<i className="fa fa-chevron-circle-right ml-2" />
          </Button>
        </Col>
      </Row>
      {formState.error && (
        <Card className="mt-3 error">
          <CardBody className="text-danger text-small text-center">
            {formState.error}
          </CardBody>
        </Card>
      )}
    </>
  );
};
