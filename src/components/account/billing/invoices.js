import React, { Fragment } from 'react';
import { Row, Col } from '@nio/ui-kit';
import useAsyncEffect from 'use-async-effect';
import { useStoreState } from 'pullstate';

import useLMS from '../../../state/stores/lmsAuth';
import defaultLMSAuth from '../../../state/defaults/defaultLMSAuth';
import appState from '../../../state/stores/appState';

import getInvoices from '../../../api/lms/getInvoices';

export default () => {
  const [lmsAuth] = useLMS(defaultLMSAuth);
  const invoices = useStoreState(appState, (s) => s.invoices);

  useAsyncEffect(() => getInvoices({ auth: lmsAuth, payload: { customer_id: lmsAuth.customer_id } }), []);

  console.log(invoices);

  return !invoices ? (
    <div className="py-5 text-center">
      <i className="fa fa-spinner fa-spin text-purple" />
    </div>
  ) : !invoices.length ? (
    <div className="py-5 text-center">
      We were unable to fetch your invoices. Please try again later.
    </div>
  ) : (
    <>
      <Row>
        <Col xs="6" className="text text-bold text-small">
          date
        </Col>
        <Col xs="3" className="text-right text-bold text-small">
          amount
        </Col>
        <Col xs="3" className="text-right text-bold text-small">
          print
        </Col>
      </Row>
      {invoices.map((i) => (
        <Fragment key={i.id}>
          <hr className="mt-2" />
          <Row className="pb-2">
            <Col xs="6" className="text text-nowrap">
              {new Date(i.created * 1000).toLocaleString()}
            </Col>
            <Col xs="3" className="text-right text text-nowrap">
              $
              {(i.total / 100).toFixed(2)}
            </Col>
            <Col xs="3" className="text-right text text-nowrap">
              <a title="print invoice" href={i.hosted_invoice_url} target="_blank" rel="noopener noreferrer"><i className="fa fa-print text-purple" /></a>
            </Col>
          </Row>
        </Fragment>
      ))}
    </>
  );
};
