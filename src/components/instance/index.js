import React, { useEffect, useState } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { useStoreState } from 'pullstate';

import appState from '../../state/stores/appState';
import useInstanceAuth from '../../state/stores/instanceAuths';

import SubNav from './subnav';
import routes from './routes';
import buildActiveInstanceObject from '../../util/instance/buildActiveInstanceObject';
import instanceState from '../../state/stores/instanceState';
import Loader from '../shared/loader';

export default () => {
  const { compute_stack_id } = useParams();
  const [loadingInstance, setLoadingInstance] = useState(false);
  const [instanceAuths] = useInstanceAuth({});

  const { instances, products, regions } = useStoreState(appState, (s) => ({
    products: s.products,
    regions: s.regions,
    instances: s.instances,
  }));

  useEffect(() => {
    const cancelSub = instanceState.subscribe((s) => s.lastUpdate, async () => {
      if (instanceAuths && compute_stack_id && instanceAuths[compute_stack_id] && products && regions) {
        const auth = instanceAuths[compute_stack_id];
        const thisInstance = instances.find((i) => i.compute_stack_id === compute_stack_id);
        const compute = products[thisInstance.is_local ? 'localCompute' : 'cloudCompute'].find((p) => p.value === thisInstance.stripe_plan_id);
        const storage = thisInstance.is_local ? null : products.cloudStorage.find((p) => p.value === thisInstance.data_volume_size);
        const computeProducts = thisInstance.is_local ? products.localCompute : products.cloudCompute;
        const storageProducts = thisInstance.is_local ? false : products.cloudStorage;
        await buildActiveInstanceObject({ thisInstance, auth, compute, storage, computeProducts, storageProducts });
        setLoadingInstance(false);
      }
    });
    return () => cancelSub();
  }, []);

  useEffect(() => {
    setLoadingInstance(true);
    instanceState.update((s) => { s.lastUpdate = Date.now(); });
  }, [compute_stack_id]);

  return (
    <div id="instance">
      <SubNav routes={routes} loadingInstance={loadingInstance} />
      {loadingInstance ? (
        <Loader message="loading instance" />
      ) : (
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} component={route.component} />
          ))}
        </Switch>
      )}
    </div>
  );
};
