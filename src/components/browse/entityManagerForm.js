import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Button, Input, Form } from '@nio/ui-kit';
import { useHistory } from 'react-router';

import { HarperDBContext } from '../../providers/harperdb';

export default ({ items, itemType, activeSchema, toggleDropItem, toggleCreate, baseUrl, update }) => {
  const { queryHarperDB } = useContext(HarperDBContext);
  const history = useHistory();

  const [entityName, setEntityName] = useState(false);
  const [nameError, toggleNameError] = useState(false);
  const [hashAttribute, setHashAttribute] = useState(false);
  const [hashError, toggleHashError] = useState(false);

  const createItem = async (e) => {
    e.preventDefault();
    let error = false;

    if (!entityName || items.includes(entityName)) {
      toggleNameError(true);
      error = true;
    }

    if (itemType === 'table' && !hashAttribute) {
      error = true;
      toggleHashError(true);
    }

    if (error) return false;

    const operation = { operation: `create_${itemType}` };

    if (itemType === 'table') {
      operation.schema = activeSchema;
      operation.table = entityName;
      operation.hash_attribute = hashAttribute;
    } else {
      operation.schema = entityName;
    }

    await queryHarperDB(operation);
    setEntityName();
    setHashAttribute();
    toggleNameError();
    toggleHashError();
    update(Date.now());
    return setTimeout(() => history.push(`${baseUrl}/${entityName}`), 100);
  };

  useEffect(() => toggleDropItem(), []);

  return (
    <Form onSubmit={createItem}>
      <Row className="item-row form">
        <Col className="input-holder">
          <Input
            invalid={nameError}
            onChange={(e) => { toggleNameError(false); setEntityName(e.target.value); }}
            type="text"
            name="name"
            placeholder="name"
          />
        </Col>
        { itemType === 'table' && (
          <Col className="input-holder">
            <Input
              invalid={hashError}
              onChange={(e) => { toggleHashError(false); setHashAttribute(e.target.value); }}
              type="test"
              name="hash_attribute"
              placeholder="hash attr."
            />
          </Col>
        )}
        <Col className="item-action text-right pt-1">
          <Button
            color="success"
            className="round mr-1"
          >
            <i className="fa fa-check text-white" />
          </Button>
          <Button
            color="grey"
            className="round"
            onClick={() => toggleCreate(false)}
          >
            <i className="fa fa-times text-white" />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
