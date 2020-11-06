import React from 'react';
import { useStoreState } from 'pullstate';
import { Button } from 'reactstrap';

import instanceState from '../../functions/state/instanceState';

const StructureReloader = ({ label = 'instance', centerText = false }) => {
  const loading = useStoreState(instanceState, (s) => s.loading);

  const refresh = () =>
    instanceState.update((s) => {
      s.lastUpdate = Date.now();
      s.loading = true;
    });

  return (
    <span className={`structure-reloader ${centerText ? 'd-block text-center' : ''}`}>
      <Button color="link" onClick={refresh}>
        <i title="Refresh Structure" className={`fa mr-2 ${loading ? 'fa-spinner fa-spin' : 'fa-refresh'}`} />
        {label}
      </Button>
    </span>
  );
};

export default StructureReloader;
