import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { ErrorBoundary } from 'react-error-boundary';
import { useStoreState } from 'pullstate';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import useInterval from 'use-interval';

import instanceState from '../../../../functions/state/instanceState';

import EntityManager from './EntityManager';
import CodeEditor from './CodeEditor';
import EmptyPrompt from '../../../shared/EmptyPrompt';
import ErrorFallback from '../../../shared/ErrorFallback';
import addError from '../../../../functions/api/lms/addError';

const ManageIndex = ({ refreshCustomFunctions, loading }) => {
  const { customer_id, project, file } = useParams();
  const history = useHistory();
  const compute_stack_id = useStoreState(instanceState, (s) => s.compute_stack_id);
  const custom_functions = useStoreState(instanceState, (s) => s.custom_functions);
  const restarting = useStoreState(instanceState, (s) => s.restarting_service === 'custom_functions');
  const cf_server_url = useStoreState(instanceState, (s) => `${s.url.split(':').slice(0, -1).join(':')}:${s.custom_functions?.port}`);
  const baseUrl = `/o/${customer_id}/i/${compute_stack_id}/functions`;

  useEffect(() => {
    const hasProjects = custom_functions?.endpoints && Object.keys(custom_functions?.endpoints).length;
    const projectIsInEndpoints = custom_functions?.endpoints && Object.keys(custom_functions?.endpoints).includes(project);

    if (hasProjects && project && !projectIsInEndpoints) {
      const firstProject = project && Object.keys(custom_functions?.endpoints)[0];
      history.push(`/o/${customer_id}/i/${compute_stack_id}/functions/${firstProject}`);
    } else if (hasProjects && project && !file) {
      const firstRouteFile = project && custom_functions?.endpoints[project]?.routes[0];
      const firstHelperFile = project && custom_functions?.endpoints[project]?.helpers[0];
      const defaultType = firstRouteFile ? 'routes' : 'helpers';
      history.push(`/o/${customer_id}/i/${compute_stack_id}/functions/${project}/${defaultType}/${firstRouteFile || firstHelperFile}`);
    } else if (hasProjects && !project) {
      const firstProject = Object.keys(custom_functions?.endpoints)[0];
      history.push(`/o/${customer_id}/i/${compute_stack_id}/functions/${firstProject}`);
    } else if (!hasProjects) {
      history.push(`/o/${customer_id}/i/${compute_stack_id}/functions`);
    }
  }, [custom_functions?.endpoints, customer_id, compute_stack_id, history, project, file]);

  useInterval(async () => {
    if (cf_server_url && restarting) {
      try {
        await fetch(cf_server_url);
        instanceState.update((s) => {
          s.restarting_service = false;
        });
      } catch (e) {
        // console.log(e);
      }
    }
  }, 1000);

  return (
    <>
      <Row id="clustering">
        <Col xl="3" lg="4" md="6" xs="12">
          <ErrorBoundary onError={(error, componentStack) => addError({ error: { message: error.message, componentStack } })} FallbackComponent={ErrorFallback}>
            <EntityManager itemType="projects" items={Object.keys(custom_functions?.endpoints) || []} activeItem={project} baseUrl={baseUrl} restarting={restarting} />
            {project && (
              <EntityManager
                itemType="routes"
                items={(project && custom_functions?.endpoints[project]?.routes) || []}
                project={project}
                activeItem={file}
                baseUrl={`${baseUrl}/${project}/routes`}
                restarting={restarting}
              />
            )}
            {project && (
              <EntityManager
                itemType="helpers"
                items={(project && custom_functions?.endpoints[project]?.helpers) || []}
                project={project}
                activeItem={file}
                baseUrl={`${baseUrl}/${project}/helpers`}
                restarting={restarting}
              />
            )}
          </ErrorBoundary>
        </Col>
        <Col xl="9" lg="8" md="6" xs="12">
          {project ? (
            <CodeEditor refreshCustomFunctions={refreshCustomFunctions} loading={loading} restarting={restarting} />
          ) : (
            <EmptyPrompt refreshCustomFunctions={refreshCustomFunctions} headline={`Please ${custom_functions.endpoints.length ? 'choose' : 'create'} a project at left.`} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ManageIndex;
