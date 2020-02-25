import React, { useState } from 'react';
import { Button, Row, Col, Input } from '@nio/ui-kit';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAsyncEffect from 'use-async-effect';

import cardOptions from '../../util/stripe/cardOptions';
import useLMS from '../../stores/lmsData';
import defaultLMSData from '../../util/state/defaultLMSData';
import addPaymentMethod from '../../api/lms/addPaymentMethod';
import getCustomer from '../../api/lms/getCustomer';

export default ({ setEditingCard, customerCard }) => {
  const [lmsData, setLMSData] = useLMS(defaultLMSData);
  const [postalCode, setPostalCode] = useState(false);
  const [cardSubmitted, setCardSubmitted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  useAsyncEffect(async () => {
    if (cardSubmitted && stripe && elements) {
      if (cardComplete) setProcessing(true);

      const newCardObject = {
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
          address: {
            postal_code: postalCode,
          },
        },
      };

      const payload = await stripe.createPaymentMethod(newCardObject);

      if (payload.error) {
        setError(payload.error);
      } else {
        await addPaymentMethod({ payment_method_id: payload.paymentMethod.id, stripe_customer_id: lmsData.customer.stripe_customer_object.id, auth: lmsData.auth });
        const customer = await getCustomer({ auth: lmsData.auth });
        setLMSData({ ...lmsData, customer });
        setEditingCard(false);
      }
      setCardSubmitted(false);
      setProcessing(false);
    }
  }, [cardSubmitted]);

  return (
    <div>
      <Row>
        <Col xs="6" className="mb-2 text text-nowrap d-none d-md-block pt-2">
          card number
        </Col>
        <Col md="6" xs="12" className="text-md-right text-center">
          <div className="stripe-input-holder">
            <CardNumberElement
              options={cardOptions}
              onChange={(e) => { setError(e.error); setCardComplete(e.complete); }}
            />
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs="6" className="mb-2 text text-nowrap d-none d-md-block pt-2">
          expiration
        </Col>
        <Col md="6" xs="12" className="text-md-right text-center">
          <div className="stripe-input-holder">
            <CardExpiryElement
              options={cardOptions}
              onChange={(e) => { setError(e.error); setCardComplete(e.complete); }}
            />
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs="6" className="mb-2 text text-nowrap d-none d-md-block pt-2">
          cvcc
        </Col>
        <Col md="6" xs="12" className="text-md-right text-center">
          <div className="stripe-input-holder">
            <CardCvcElement
              options={cardOptions}
              onChange={(e) => { setError(e.error); setCardComplete(e.complete); }}
            />
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs="6" className="mb-2 text text-nowrap d-none d-md-block pt-2">
          billing postal code
        </Col>
        <Col md="6" xs="12" className="text-md-right text-center">
          <Input
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Col>
      </Row>
      <hr />
      {customerCard ? (
        <Row>
          <Col sm="6">
            <Button disabled={processing} onClick={() => setEditingCard(false)} block color="danger" className="mb-2">Cancel</Button>
          </Col>
          <Col sm="6">
            <Button disabled={processing} onClick={() => setCardSubmitted(true)} block color="purple" className="mb-2">Save New Card</Button>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col sm="12">
            <Button disabled={processing} onClick={() => setCardSubmitted(true)} block color="purple" className="mb-2">Add Card To Account</Button>
          </Col>
        </Row>
      )}
      {error && (
        <div className="text-danger text-center">
          <hr className="mt-2" />
          {error.message}
        </div>
      )}
    </div>
  );
};
