import React from 'react';
import { Modal, ModalHeader, ModalBody, Loader } from '@nio/ui-kit';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';
import { useAlert } from 'react-alert';

import useApp from '../../../state/stores/appData';
import defaultAppData from '../../../state/defaults/defaultAppData';
import useNewInstance from '../../../state/stores/newInstance';
import defaultNewInstanceData from '../../../state/defaults/defaultNewInstanceData';

import customerHasChargeableCard from '../../../util/stripe/customerHasChargeableCard';
import steps from '../../../util/addInstanceSteps';

import InstanceTypeForm from './type';
import CloudMetadataForm from './meta_cloud';
import LocalMetadataForm from './meta_local';
import LocalInstanceForm from './details_local';
import CloudInstanceForm from './details_cloud';
import CustomerPaymentForm from './payment';
import ConfirmOrderForm from './confirm';
import OrderStatus from './status';
import useLMS from '../../../state/stores/lmsAuth';
import defaultLMSAuth from '../../../state/defaults/defaultLMSAuth';

export default () => {
  const history = useHistory();
  const alert = useAlert();
  const { purchaseStep } = useParams();
  const [appData] = useApp(defaultAppData);
  const [lmsAuth] = useLMS(defaultLMSAuth);
  const [newInstance, setNewInstance] = useNewInstance(defaultNewInstanceData);

  const isLocal = newInstance.is_local;
  const hasCard = customerHasChargeableCard(appData.customer);

  const closeAndResetModal = () => {
    if (purchaseStep === 'status') {
      alert.error('Please wait for this window to close automatically');
    } else {
      setNewInstance(defaultNewInstanceData);
      setTimeout(() => history.push('/instances'), 100);
    }
  };

  const finishOrder = () => {
    setNewInstance(defaultNewInstanceData);
    setTimeout(() => history.push('/instances'), 100);
  };

  useAsyncEffect(() => setNewInstance({ ...newInstance, customer_id: lmsAuth.customer_id }), [purchaseStep]);

  return (
    <Modal id="new-instance-modal" size={purchaseStep === 'type' ? 'lg' : ''} isOpen toggle={closeAndResetModal}>
      <ModalHeader toggle={closeAndResetModal}>
        {steps[purchaseStep].label}
      </ModalHeader>
      <ModalBody>
        {!appData.products ? (
          <Loader />
        ) : purchaseStep === 'type' ? (
          <InstanceTypeForm />
        ) : purchaseStep === 'meta_local' ? (
          <LocalMetadataForm
            instanceNames={appData.instances ? appData.instances.map((i) => i.instance_name) : []}
          />
        ) : purchaseStep === 'meta_cloud' ? (
          <CloudMetadataForm
            instanceNames={appData.instances ? appData.instances.map((i) => i.instance_name) : []}
          />
        ) : purchaseStep === 'details_local' ? (
          <LocalInstanceForm
            products={appData.products.localCompute}
            hasCard={hasCard}
          />
        ) : purchaseStep === 'details_cloud' ? (
          <CloudInstanceForm
            products={appData.products.cloudCompute}
            storage={appData.products.cloudStorage}
            regions={appData.regions}
            hasCard={hasCard}
          />
        ) : purchaseStep === 'payment' ? (
          <CustomerPaymentForm
            hasCard={hasCard}
            isLocal={isLocal}
            computeProduct={appData.products[isLocal ? 'localCompute' : 'cloudCompute'].find((p) => p.value === newInstance.stripe_plan_id)}
            storageProduct={isLocal ? { price: 'FREE' } : appData.products.cloudStorage.find((p) => p.value === newInstance.data_volume_size)}
          />
        ) : purchaseStep === 'confirm' ? (
          <ConfirmOrderForm
            computeProduct={appData.products[isLocal ? 'localCompute' : 'cloudCompute'].find((p) => p.value === newInstance.stripe_plan_id)}
            storageProduct={isLocal ? { price: 'FREE' } : appData.products.cloudStorage.find((p) => p.value === newInstance.data_volume_size)}
          />
        ) : purchaseStep === 'status' ? (
          <OrderStatus
            closeAndResetModal={finishOrder}
          />
        ) : null}
      </ModalBody>
    </Modal>
  );
};
