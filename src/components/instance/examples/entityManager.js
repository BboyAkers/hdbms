import React, { useEffect, useState } from 'react';
import { Card, CardBody } from '@nio/ui-kit';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useStoreState } from 'pullstate';

import appState from '../../../state/appState';

import EntityManagerRow from './entityManagerRow';

import generateFolderLinks from '../../../methods/examples/generateFolderLinks';
import generateMethodLinks from '../../../methods/examples/generateMethodLinks';

export default ({ type }) => {
  const history = useHistory();
  const { customer_id, compute_stack_id, folder, method } = useParams();
  const postmanCollection = useStoreState(appState, (s) => s.postmanCollection);
  const [items, setItems] = useState([]);
  const activeItem = type === 'folder' ? folder : method;
  const baseUrl = type === 'folder' ? `/o/${customer_id}/i/${compute_stack_id}/examples` : `/o/${customer_id}/i/${compute_stack_id}/examples/${folder}`;

  useEffect(() => {
    if (postmanCollection && type === 'folder') {
      const newItems = generateFolderLinks(postmanCollection);
      setItems(newItems);
    }
  }, [postmanCollection]);

  useEffect(() => {
    if (postmanCollection && folder && type === 'method') {
      const newItems = generateMethodLinks(postmanCollection, folder);
      setItems(newItems);
      if (!method) {
        history.push(`${baseUrl}/${newItems[0]}`);
      }
    }
  }, [postmanCollection, folder]);

  return (
    <div className="entity-manager">
      <div className="floating-card-header">{type === 'folder' ? 'category' : 'operations'}</div>
      <Card className="mt-3 mb-4">
        <CardBody>{items && items.length ? items.map((item) => <EntityManagerRow key={item} item={item} baseUrl={baseUrl} isActive={activeItem === item} />) : null}</CardBody>
      </Card>
    </div>
  );
};
