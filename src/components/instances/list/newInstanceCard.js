import React from 'react';
import { useHistory } from 'react-router';
import { Card, CardBody, Col } from '@nio/ui-kit';

const NewInstanceCard = () => {
  const history = useHistory();

  return (
    <Col xs="12" md="6" lg="4" xl="3" className="mb-4">
      <Card
        tabIndex="0"
        title="Add New Instance"
        className="instance new"
        onKeyDown={(e) => e.keyCode !== 13 || history.push('/instances/new')}
        onClick={() => history.push('/instances/new')}
      >
        <CardBody className="d-flex flex-column align-items-center justify-content-center">
          <span className="text-small">Create New HarperDB Cloud Instance</span>
          <div className="my-4">
            <i className="fa fa-2x fa-plus-circle new-instance-plus" />
          </div>
          <span className="text-small">Import Existing HarperDB Instance</span>
        </CardBody>
      </Card>
    </Col>
  );
};

export default NewInstanceCard;
