import queryLMS from '../queryLMS';
import appState from '../../state/appState';
import addError from './addError';
import config from '../../config';
import buildRadioSelectStorageOptions from '../../methods/products/buildRadioSelectStorageOptions';
import buildRadioSelectProductOptions from '../../methods/products/buildRadioSelectProductOptions';

export default async ({ auth, customer_id, stripe_id }) => {
  try {
    const response = await queryLMS({
      endpoint: 'getSubscriptions',
      method: 'POST',
      payload: {
        customer_id,
        stripe_id,
      },
      auth,
    });

    if (response.error) return false;

    let subscriptions = {
      cloudCompute: [],
      cloudStorage: [],
      localCompute: [],
    };

    response.inactive.map((s) =>
      s.items.data
        .filter((i) => i.price.product.name === 'HarperDB Cloud Monthly (Beta)')
        .map((i) =>
          subscriptions.cloudCompute.push({
            subscription_name: s.metadata?.name,
            subscription_id: i.subscription,
            quantity: i.quantity,
            ...i.plan,
          })
        )
    );

    response.inactive.map((s) =>
      s.items.data
        .filter((i) => i.price.product.name === 'HarperDB Cloud Storage')
        .map((i) =>
          subscriptions.cloudStorage.push({
            subscription_name: s.metadata?.name,
            subscription_id: i.subscription,
            quantity: i.quantity,
            ...i.plan,
          })
        )
    );

    response.inactive.map((s) =>
      s.items.data
        .filter((i) => i.price.product.name === 'HarperDB Local Annual')
        .map((i) =>
          subscriptions.localCompute.push({
            subscription_name: s.metadata?.name,
            subscription_id: i.subscription,
            quantity: i.quantity,
            ...i.plan,
          })
        )
    );

    return appState.update((s) => {
      s.subscriptions = {
        cloudStorage: buildRadioSelectStorageOptions(subscriptions.cloudStorage || []),
        cloudCompute: buildRadioSelectProductOptions(subscriptions.cloudCompute || []),
        localCompute: buildRadioSelectProductOptions(subscriptions.localCompute || []),
      };
    });
  } catch (e) {
    console.log('getSubscriptions', e);
    return addError({
      type: 'lms data',
      status: 'error',
      url: config.lms_api_url,
      operation: 'getSubscriptions',
      error: { catch: e.toString() },
    });
  }
};
