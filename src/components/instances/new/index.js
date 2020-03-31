import React from 'react';
import { Modal, ModalHeader, ModalBody, Loader } from '@nio/ui-kit';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';
import { useStoreState } from 'pullstate';

import appState from '../../../state/stores/appState';
import useNewInstance from '../../../state/stores/newInstance';

import config from '../../../../config';

import customerHasChargeableCard from '../../../util/stripe/customerHasChargeableCard';
import steps from '../../../util/instance/addInstanceSteps';

import InstanceTypeForm from './type';
import CloudMetadataForm from './metaCloud';
import LocalMetadataForm from './metaLocal';
import LocalInstanceForm from './detailsLocal';
import CloudInstanceForm from './detailsCloud';
import CustomerPaymentForm from './payment';
import ConfirmOrderForm from './confirm';
import OrderStatus from './status';

export default () => {
  const { auth, customer, products, regions, instanceNames, instanceURLs, cloudInstanceCount, freeCloudInstanceCount, localInstanceCount, freeLocalInstanceCount, cloudInstancesBeingModified } = useStoreState(appState, (s) => {
    const cloud = s.instances.filter((i) => !i.is_local && !['DELETE_COMPLETE', 'DELETE_IN_PROGRESS'].includes(i.status));
    const local = s.instances.filter((i) => i.is_local);

    return ({
      auth: s.auth,
      customer: s.customer,
      products: s.products,
      regions: s.regions,
      instanceNames: [...cloud, ...local].map((i) => i.instance_name),
      instanceURLs: [...cloud, ...local].map((i) => i.url),
      cloudInstancesBeingModified: cloud.filter((i) => !['CREATE_COMPLETE', 'UPDATE_COMPLETE'].includes(i.status)).length,
      cloudInstanceCount: cloud.length,
      freeCloudInstanceCount: cloud.filter((i) => i.compute.price === 'FREE' && i.storage.price === 'FREE').length,
      localInstanceCount: local.length,
      freeLocalInstanceCount: local.filter((i) => i.compute.price === 'FREE').length,
    });
  });

  const history = useHistory();
  const { purchaseStep = 'type' } = useParams();
  const [newInstance, setNewInstance] = useNewInstance({});

  const isLocal = newInstance.is_local;
  const hasCard = customerHasChargeableCard(customer);

  const closeAndResetModal = () => {
    if (purchaseStep !== 'status') {
      setNewInstance({});
      setTimeout(() => history.push('/instances'), 100);
    }
  };

  const finishOrder = () => {
    setNewInstance({});
    setTimeout(() => history.push('/instances'), 100);
  };

  useAsyncEffect(() => setNewInstance({ ...newInstance, customer_id: auth.customer_id }), [purchaseStep]);

  return (
    <Modal id="new-instance-modal" size={purchaseStep === 'type' ? 'lg' : ''} isOpen toggle={closeAndResetModal}>
      {purchaseStep !== 'status' && (
        <ModalHeader toggle={closeAndResetModal}>
          {steps[purchaseStep]?.label}
        </ModalHeader>
      )}
      <ModalBody>
        {!products ? (
          <Loader />
        ) : purchaseStep === 'type' ? (
          <InstanceTypeForm
            cloudInstancesBeingModified={cloudInstancesBeingModified}
            canAddCloudInstance={config.total_cloud_instance_limit && config.total_cloud_instance_limit > cloudInstanceCount}
            cloudInstanceLimit={config.total_cloud_instance_limit}
            canAddLocalInstance={config.total_local_instance_limit && config.total_local_instance_limit > localInstanceCount}
            localInstanceLimit={config.total_local_instance_limit}
          />
        ) : purchaseStep === 'meta_local' ? (
          <LocalMetadataForm
            instanceNames={instanceNames}
            instanceURLs={instanceURLs}
          />
        ) : purchaseStep === 'meta_cloud' ? (
          <CloudMetadataForm
            instanceNames={instanceNames}
          />
        ) : purchaseStep === 'details_local' ? (
          <LocalInstanceForm
            products={products.localCompute}
            hasCard={hasCard}
            canAddFreeLocalInstance={config.free_local_instance_limit && config.free_local_instance_limit > freeLocalInstanceCount}
            freeLocalInstanceLimit={config.free_local_instance_limit}
          />
        ) : purchaseStep === 'details_cloud' ? (
          <CloudInstanceForm
            products={products.cloudCompute}
            storage={products.cloudStorage}
            regions={regions}
            hasCard={hasCard}
            canAddFreeCloudInstance={config.free_cloud_instance_limit && config.free_cloud_instance_limit > freeCloudInstanceCount}
            freeCloudInstanceLimit={config.free_cloud_instance_limit}
          />
        ) : purchaseStep === 'payment' ? (
          <CustomerPaymentForm
            hasCard={hasCard}
            isLocal={isLocal}
            computeProduct={products[isLocal ? 'localCompute' : 'cloudCompute'].find((p) => p.value === newInstance.stripe_plan_id)}
            storageProduct={isLocal ? { price: 'FREE' } : products.cloudStorage.find((p) => p.value === newInstance.data_volume_size)}
          />
        ) : purchaseStep === 'confirm' ? (
          <ConfirmOrderForm
            computeProduct={products[isLocal ? 'localCompute' : 'cloudCompute'].find((p) => p.value === newInstance.stripe_plan_id)}
            storageProduct={isLocal ? { price: 'FREE' } : products.cloudStorage.find((p) => p.value === newInstance.data_volume_size)}
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
