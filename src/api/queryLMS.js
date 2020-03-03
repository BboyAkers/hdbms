import instances from '../../mock_data/LMS_API.instances.json';
import products from '../../mock_data/LMS_API.products.json';
import regions from '../../mock_data/LMS_API.aws_regions.json';
import customer from '../../mock_data/LMS_API.customer.json';
import user from '../../mock_data/LMS_API.user.json';
import customer_users from '../../mock_data/LMS_API.customer_users.json';
import invoices from '../../mock_data/LMS_API.invoices.json';
import licenses from '../../mock_data/LMS_API.licenses.json';

// eslint-disable-next-line no-unused-vars
export default async ({ endpoint, payload, auth }) => {
  const completedEndpoints = ['getUser', 'addCustomer'];

  if (completedEndpoints.includes(endpoint)) {
    console.log('Querying LMS Live API', endpoint);

    try {
      const request = await fetch(
        `https://poqwe1evwb.execute-api.us-east-2.amazonaws.com/Dev/${endpoint}`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            authorization: `Basic ${btoa(`${auth.user}:${auth.pass}`)}`,
          },
        },
      );
      const response = await request.json();

      if (response.errorType) {
        const errorObject = JSON.parse(response.errorMessage);
        return {
          body: {
            result: false,
            message: errorObject.errorMessage,
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
  }

  console.log('Querying LMS Mock API', endpoint);

  switch (endpoint) {
    case 'getProducts':
      return products;
    case 'getRegions':
      return regions;
    case 'getUser':
      return user;
    case 'getCustomer':
      return customer;
    case 'getInstances':
      return instances;
    case 'getUsers':
      return customer_users;
    case 'getLicenses':
      return licenses;
    case 'getInvoices':
      return invoices;
    case 'addLicense':
      return { statusCode: 200, body: { result: true, message: 'Created license', key: '78rfh334ofholhfdoeh3f48hfq', company: 'customer-guid-1' } };
    case 'updateLicense':
      return { statusCode: 200, body: { result: true, message: 'Updated license', key: '78rfh334ofholhfdoeh3f48hfq', company: 'customer-guid-1' } };
    case 'addTCAcceptance':
      return { statusCode: 200, body: { result: true, message: 'Received Terms and Conditions acceptance' } };
    case 'addPaymentMethod':
      return { statusCode: 200, body: { result: true, message: 'Payment method added to account' } };
    case 'removePaymentMethod':
      return { statusCode: 200, body: { result: true, message: 'Payment method removed from account' } };
    case 'removeUser':
      return { statusCode: 200, body: { result: true, message: 'User removed from account' } };
    case 'updateInstance':
      return { statusCode: 200, body: { result: true, message: 'Instance is being updated' } };
    case 'addInstance':
      return { statusCode: 200, body: { result: true, message: 'Instance is being created||added', instance_id: 'instance-guid-1' } };
    case 'addUser':
      return { statusCode: 200, body: { result: true, message: 'User created successfully', user_id: 'user-guid-6' } };
    default:
      return { statusCode: 404, body: { error: 'unknown endpoint' } };
  }
};