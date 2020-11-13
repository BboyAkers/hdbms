import React from 'react';
import { Button } from 'reactstrap';

const ActionConnectionClosed = ({ handleRemoveNode, showModal, loading }) => (
  <>
    <Button color="danger" className="round mr-1" title="Why isn't this instance clustering?" disabled={loading} onClick={showModal}>
      <i className="fa fa-exclamation" />
    </Button>
    <Button color="purple" className="round" title="Disconnect From This Instance" disabled={loading} onClick={handleRemoveNode}>
      <i className={`fa ${loading ? 'fa-spin fa-spinner' : 'fa-minus'} text-white`} />
    </Button>
  </>
);

export default ActionConnectionClosed;
