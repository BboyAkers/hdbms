import React, { useState } from 'react';
import { Col, Input, Row } from '@nio/ui-kit';
import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';

import cardOptions from '../../util/stripe/cardOptions';

export default ({ setFormData, formData }) => {
  const [formState, setFormState] = useState({});

  return (
    <>
      <Row>
        <Col xs="6" className="text text-nowrap d-none d-md-block pt-2">
          card number
        </Col>
        <Col md="6" xs="12" className="text-md-right text-center">
          <div className={`fake-input ${formState.cardError ? 'error' : ''}`}>
            <CardNumberElement
              options={cardOptions}
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
              options={cardOptions}
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
          cvcc
        </Col>
        <Col md="6" xs="12" className="text-md-right text-center">
          <div className={`fake-input ${formState.cvcError ? 'error' : ''}`}>
            <CardCvcElement
              options={cardOptions}
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
            onChange={(e) =>
              setFormData({
                ...formData,
                postal_code: e.target.value,
              })
            }
          />
        </Col>
      </Row>
    </>
  );
};