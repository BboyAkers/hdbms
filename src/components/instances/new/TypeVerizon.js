import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import VerizonLogo from '../../shared/logos/VerizonLogo';

function TypeVerizon({ setFormData }) {
  return (
    <Card className="mb-3">
      <CardBody className="instance-form-card-body">
        <Row>
          <Col xs="8" className="logo-header">
            <VerizonLogo />
          </Col>
          <Col xs="4">
            <Button
              id="createCloudInstanceButton"
              color="purple"
              block
              onClick={() => setFormData({ cloud_provider: 'verizon', is_local: false, is_wavelength: true, is_akamai: false })}
            >
              Create
            </Button>
          </Col>
        </Row>

        <hr />
        <ul className="mb-0">
          <li>On Verizon 5G Edge Network</li>
          <li>Billed Monthly</li>
          <li>24/7 Customer Support</li>
          <li>Choose RAM and Disk Size</li>
        </ul>
      </CardBody>
    </Card>
  );
}

export default TypeVerizon;
