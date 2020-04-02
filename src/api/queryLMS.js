import { fetch } from 'whatwg-fetch';

import config from '../../config';

export default async ({ endpoint, payload, auth, signal = undefined }) => {
  // eslint-disable-next-line no-console
  // console.log('Querying LMS API', endpoint);

  try {
    const request = await fetch(`${config.lms_api_url}${endpoint}`, {
      signal,
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        authorization: auth ? `Basic ${btoa(`${auth.email}:${auth.pass}`)}` : undefined,
      },
    });
    const response = await request.json();

    if (!response || response.errorType || response.errorMessage) {
      return {
        body: {
          result: false,
          message: response?.errorMessage || 'The server did not respond',
        },
      };
    }
    return response;
  } catch (e) {
    return {
      body: {
        result: false,
        message: e.toString(),
      },
    };
  }
};
