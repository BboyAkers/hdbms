import React from 'react';
import { CardBody, Card } from 'reactstrap';

const EmptyPrompt = ({ headline, description, icon }) => (
  <>
    <div className="floating-card-header text-right">&nbsp;</div>
    <Card className="my-3">
      <CardBody>
        <div className="empty-prompt narrow">
          {icon}
          {headline && (
            <div className="mt-3">
              <b>{headline}</b>
            </div>
          )}
          <div className="mt-3">{description}</div>
        </div>
      </CardBody>
    </Card>
  </>
);

export default EmptyPrompt;