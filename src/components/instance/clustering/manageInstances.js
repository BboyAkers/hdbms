import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

import InstanceManagerRow from './manageInstancesRow';

const ManageInstances = ({ items, itemType, setShowModal }) => (
  <div className="entity-manager">
    <div className="floating-card-header">{itemType} instances</div>
    <Card className="my-3">
      <CardBody>
        {items && items.length ? (
          items.map((item) => <InstanceManagerRow key={item.instance_name} item={item} itemType={itemType} setShowModal={setShowModal} />)
        ) : (
          <Row className="item-row">
            <Col className="item-label">There are no {itemType} instances</Col>
          </Row>
        )}
      </CardBody>
    </Card>
  </div>
);

export default ManageInstances;
