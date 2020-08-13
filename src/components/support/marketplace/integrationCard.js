import React, { useState } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { ErrorBoundary } from 'react-error-boundary';
import { useStoreState } from 'pullstate';

import ErrorFallback from '../../shared/errorFallback';
import addError from '../../../api/lms/addError';
import addIntegrationEngagement from '../../../api/lms/addIntegrationEngagement';
import Code from '../../shared/code';
import appState from '../../../state/appState';
import getIntegrations from '../../../api/lms/getIntegrations';

export default ({ id, avg_rating, user_rating, meta: { name, description, language, homepage, install_command } }) => {
  const auth = useStoreState(appState, (s) => s.auth);
  const [sendingRating, setSendingRating] = useState(false);
  const [userRating, setUserRating] = useState(user_rating);

  const addRating = async (rating) => {
    if (rating !== user_rating) {
      setSendingRating(true);
      setUserRating(rating);
      await addIntegrationEngagement({ auth, integration_id: id, rating });
      await getIntegrations({ auth });
      setSendingRating(false);
    }
  };

  const addEngagement = async (type) => {
    addIntegrationEngagement({ auth, integration_id: id, [type]: true });
  };

  return (
    <Col xl="4" lg="6" xs="12" className="mb-3">
      <ErrorBoundary onError={(error, componentStack) => addError({ error: { message: error.message, componentStack } })} FallbackComponent={ErrorFallback}>
        <Card className="integration-card">
          <CardBody>
            <b className="d-block mb-2">{name}</b>
            <hr />
            <i className="fa fa-code" /> {language}
            <br />
            <div className="d-block text-truncate">
              <i className="fa fa-home" />{' '}
              <a href={homepage} target="_blank" rel="noopener noreferrer" onClick={() => addEngagement('go_to_homepage')}>
                {homepage}
              </a>
            </div>
            <hr className="mb-1" />
            <Row>
              <Col sm="6" className="text-nowrap">
                <span className="d-inline-block mr-2">avg rating</span>
                {sendingRating ? (
                  <i className="fa-spinner fa fa-spin text-small text-purple" />
                ) : (
                  [1, 2, 3, 4, 5].map((star) => <i key={star} className={`text-warning fa fa-star${!avg_rating || avg_rating < star ? '-o' : ''}`} />)
                )}
              </Col>
              <Col sm="6" className="text-nowrap text-sm-right">
                <span className="d-inline-block mr-2">your rating</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                  <i
                    key={star}
                    onMouseOver={() => setUserRating(star)}
                    onMouseOut={() => {
                      if (!sendingRating) setUserRating(user_rating);
                    }}
                    onClick={() => addRating(star)}
                    className={`text-purple fa fa-star${!userRating || userRating < star ? '-o' : ''}`}
                  />
                ))}
              </Col>
            </Row>
            <hr className="mt-1" />
            {install_command ? (
              <Code onClick={() => addEngagement('copy_install_command')}>{install_command}</Code>
            ) : (
              <pre className="lolight-empty">Please visit homepage for usage</pre>
            )}
            <div className="marketplace-description">{description}</div>
          </CardBody>
        </Card>
      </ErrorBoundary>
    </Col>
  );
};
