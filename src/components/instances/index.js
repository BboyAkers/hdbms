import React from 'react';
import { Row } from '@nio/ui-kit';
import useAsyncEffect from 'use-async-effect';

import TopNav from '../topnav';
import useInstanceAuth from '../../stores/instanceAuths';
import InstanceCard from './instanceCard';
import NewInstanceCard from './newInstanceCard';
import useLMS from '../../stores/lmsData';
import defaultLMSData from '../../util/state/defaultLMSData';
import getInstances from '../../api/lms/getInstances';
import getLicenses from '../../api/lms/getLicenses';
import getProducts from '../../api/lms/getProducts';

export default () => {
  const [instanceAuths, setInstanceAuths] = useInstanceAuth({});
  const [lmsData, setLMSData] = useLMS(defaultLMSData);

  useAsyncEffect(async () => {
    const instances = await getInstances({ auth: lmsData.auth });
    const licenses = await getLicenses({ auth: lmsData.auth });
    const products = await getProducts({ auth: lmsData.auth });
    setLMSData({ ...lmsData, instances, licenses, products });
  }, []);

  return (
    <>
      <TopNav />
      <Row>
        <NewInstanceCard />
        {lmsData.instances.map((i) => (
          <InstanceCard
            key={i.id}
            {...i}
            hasAuth={instanceAuths[i.id]}
            setAuth={({ id, user, pass }) => setInstanceAuths({ ...instanceAuths, [id]: user && pass ? { user, pass } : false })}
          />
        ))}
      </Row>
    </>
  );
};
