import queryLMS from '../queryLMS';
import appState from '../../state/appState';
import addError from './addError';
import config from '../../../config';

export default async ({ auth, firstname, lastname, customer_id, user_id }) => {
  let response = null;

  try {
    response = await queryLMS({
      endpoint: 'updateUser',
      method: 'POST',
      payload: { firstname, lastname, customer_id, user_id },
      auth,
    });

    if (response.error) {
      return appState.update((s) => {
        s.auth = { ...auth, ...response, profileError: Date.now() };
      });
    }

    return appState.update((s) => {
      s.auth = { ...auth, profileSuccess: Date.now(), ...response };
    });
  } catch (e) {
    return addError({
      type: 'lms data',
      url: config.lms_api_url,
      operation: 'updateUser',
      request: { firstname, lastname, customer_id, user_id },
      error: { catch: e.toString(), response },
      customer_id,
    });
  }
};
