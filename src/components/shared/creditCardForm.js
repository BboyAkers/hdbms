import React, { useState } from 'react';
import { Col, Input, Row } from 'reactstrap';
import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import { useStoreState } from 'pullstate';
import { useParams } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';

import cardOptions from '../../functions/stripe/cardOptions';
import appState from '../../functions/state/appState';
import ErrorFallback from './errorFallback';
import addError from '../../functions/api/lms/addError';

const CreditCardForm = ({ setFormData, formData }) => {
  const { customer_id } = useParams();
  const [formState, setFormState] = useState({});
  const theme = useStoreState(appState, (s) => s.theme);
  const themedCardOptions = cardOptions({ theme });

  return (
    <ErrorBoundary onError={(error, componentStack) => addError({ error: { message: error.message, componentStack }, customer_id })} FallbackComponent={ErrorFallback}>
      <Row>
        <Col xs="6" className="text text-nowrap d-none d-md-block pt-2">
          card number
        </Col>
        <Col md="6" xs="12" className="text-md-right text-center">
          <div className={`fake-input ${formState.cardError ? 'error' : ''}`}>
            <CardNumberElement
              options={themedCardOptions}
              id="ccCardNumber"
              onChange={(e) => {
                setFormState({ ...formState, cardError: e.error?.message });
                setFormData({
                  ...formData,
                  card: e.complete,
                });
              }}
            />
          </div>
        </Col>
        <Col xs="12">
          <hr className="my-2" />
        </Col>
        <Col xs="6" className="text text-nowrap d-none d-md-block pt-2">
          expiration
        </Col>
        <Col md="6" xs="12" className="text-md-right text-center">
          <div className={`fake-input ${formState.expError ? 'error' : ''}`}>
            <CardExpiryElement
              options={themedCardOptions}
              id="ccExpire"
              onChange={(e) => {
                setFormState({ ...formState, expError: e.error?.message });
                setFormData({
                  ...formData,
                  expire: e.complete,
                });
              }}
            />
          </div>
        </Col>
        <Col xs="12">
          <hr className="my-2" />
        </Col>
        <Col xs="6" className="text text-nowrap d-none d-md-block pt-2">
          cvc
        </Col>
        <Col md="6" xs="12" className="text-md-right text-center">
          <div className={`fake-input ${formState.cvcError ? 'error' : ''}`}>
            <CardCvcElement
              id="ccCVC"
              options={themedCardOptions}
              onChange={(e) => {
                setFormState({ ...formState, cvcError: e.error?.message });
                setFormData({
                  ...formData,
                  cvc: e.complete,
                });
              }}
            />
          </div>
        </Col>
        <Col xs="12">
          <hr className="my-2" />
        </Col>
        <Col xs="6" className="text text-nowrap d-none d-md-block pt-2">
          billing postal code
        </Col>
        <Col md="6" xs="12" className="text-md-right text-center">
          <Input
            id="ccPostalCode"
            onChange={(e) =>
              setFormData({
                ...formData,
                postal_code: e.target.value,
              })
            }
          />
        </Col>
      </Row>
    </ErrorBoundary>
  );
};

export default CreditCardForm;
