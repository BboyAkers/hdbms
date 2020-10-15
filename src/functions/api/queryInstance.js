import { fetch } from 'whatwg-fetch';
import addError from './lms/addError';

export default async (operation, auth, url, compute_stack_id = false, customer_id = false, signal = undefined) => {
  // eslint-disable-next-line no-console
  // console.log('Querying Instance API', operation.operation);
  const errorObject = {
    type: 'instance api',
    status: 'warn',
    url,
    operation: operation.operation,
    request: operation,
    compute_stack_id,
    customer_id,
  };

  try {
    const request = await fetch(url, {
      signal,
      method: 'POST',
      body: JSON.stringify(operation),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${btoa(`${auth.user}:${auth.pass}`)}`,
      },
    });

    const response = await request.json();

    if (response.error) {
      addError({ ...errorObject, error: response });

      return {
        error: true,
        message: response.error,
        type: 'response',
        access_errors: response.unauthorized_access?.map((e) => ({
          schema: e.schema,
          table: e.table,
          type: e.required_attribute_permissions.length ? 'attribute' : 'table',
          entity: e.required_attribute_permissions.length ? e.required_attribute_permissions[0].attribute_name : e.table,
          permission: e.required_attribute_permissions.length ? e.required_attribute_permissions[0].required_permissions.join(', ') : e.required_table_permissions.join(', '),
        })),
      };
    }

    if (request.status !== 200) {
      addError({ ...errorObject, error: { status: `Error of type ${request.status}` } });

      return {
        error: true,
        message: `Error of type ${request.status}`,
        type: 'status',
      };
    }

    return response;
  } catch (e) {
    if (!['Aborted', 'Network request failed'].includes(e.message) && !['registration_info', 'user_info'].includes(operation.operation)) {
      addError({ ...errorObject, error: { catch: e.message } });
    }

    return {
      error: true,
      message: e.message,
      type: 'catch',
    };
  }
};