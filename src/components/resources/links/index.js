import React from 'react';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';

function LinksIndex() {
  return (
    <main id="support">
      <Row>
        <Col lg="3" className="mb-3">
          <span className="floating-card-header">Full API Documenation</span>
          <Card className="my-3">
            <CardBody>
              <Button color="purple" block href="https://api.harperdb.io" target="_blank" rel="noopener noreferrer">
                Visit api.harperdb.io
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" className="mb-3">
          <span className="floating-card-header">HarperDB Community Slack</span>
          <Card className="my-3">
            <CardBody>
              <Button
                color="purple"
                block
                href="https://join.slack.com/t/harperdbcommunity/shared_invite/zt-e8w6u1pu-2UFAXl_f4ZHo7F7DVkHIDA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Our Slack Community
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" className="mb-3">
          <span className="floating-card-header">HarperDB Add Ons</span>
          <Card className="my-3">
            <CardBody>
              <Button color="purple" block href="https://github.com/orgs/HarperDB-Add-Ons/repositories" target="_blank" rel="noopener noreferrer">
                Jump Start Your Project
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" className="mb-3">
          <span className="floating-card-header">SQL Features Matrix</span>
          <Card className="my-3">
            <CardBody>
              <Button color="purple" block href="https://docs.harperdb.io/docs/index-7/features-matrix" target="_blank" rel="noopener noreferrer">
                HarperDB SQL Guides
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" className="mb-3">
          <span className="floating-card-header">Create A Support Ticket</span>
          <Card className="my-3">
            <CardBody>
              <Button color="purple" block href="https://harperdbhelp.zendesk.com/hc/en-us/requests/new" target="_blank" rel="noopener noreferrer">
                HarperDB Zendesk Portal
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </main>
  );
}

export default LinksIndex;
