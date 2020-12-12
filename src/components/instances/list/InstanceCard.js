import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Col } from 'reactstrap';
import { ErrorBoundary } from 'react-error-boundary';

import CardFront from './CardFront';
import CardBack from './CardBack';
import ErrorFallbackCard from '../../shared/ErrorFallbackCard';
import addError from '../../../functions/api/lms/addError';

const InstanceCard = ({ flippedCard, setFlippedCard, compute_stack_id, customer_id, ...rest }) => {
  const [flipState, setFlipState] = useState(false);

  useEffect(() => {
    if (flippedCard !== compute_stack_id) {
      setFlipState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flippedCard]);

  useEffect(() => {
    if (flipState) {
      setFlippedCard(compute_stack_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipState]);

  return (
    <Col xs="12" md="6" lg="4" xl="3" className="mb-4 card-holder">
      <ErrorBoundary
        onError={(error, componentStack) =>
          addError({
            error: { message: error.message, componentStack },
            customer_id,
            compute_stack_id,
          })
        }
        FallbackComponent={ErrorFallbackCard}
      >
        <ReactCardFlip infinite isFlipped={flipState} flipSpeedBackToFront={0.25} flipSpeedFrontToBack={0.25} flipDirection="vertical">
          <CardFront setFlipState={setFlipState} flipState={flipState} customer_id={customer_id} compute_stack_id={compute_stack_id} {...rest} />
          <CardBack setFlipState={setFlipState} flipState={flipState} customer_id={customer_id} compute_stack_id={compute_stack_id} {...rest} />
        </ReactCardFlip>
      </ErrorBoundary>
    </Col>
  );
};

export default InstanceCard;