import queryInstance from '../queryInstance';

export default async ({ auth, url, project, file }) => 
  queryInstance({
    operation: {
      operation: 'drop_component_file',
      project,
      file
    },
    auth,
    url,
  });
