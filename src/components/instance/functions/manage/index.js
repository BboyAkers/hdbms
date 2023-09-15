import React from 'react';
import { useStoreState } from 'pullstate';
import { useParams } from 'react-router';

import appState from '../../../../functions/state/appState';
import instanceState from '../../../../functions/state/instanceState';
import getComponentFile from '../../../../functions/api/instance/getComponentFile';
import setComponentFile from '../../../../functions/api/instance/setComponentFile';
import addComponent from '../../../../functions/api/instance/addComponent';
import dropComponent from '../../../../functions/api/instance/dropComponent';
import deployComponent from '../../../../functions/api/instance/deployComponent';
import restartInstance from '../../../../functions/api/instance/restartInstance';

import useInstanceAuth from '../../../../functions/state/instanceAuths';

import {default as ApplicationsIDE} from '../../../shared/webide/WebIDE';
import CustomFunctionsEditor from './CustomFunctionsEditor';

const auth = { user: 'alex', pass: 'alex' };
const applicationsAPIUrl = 'http://localhost:9925';

/*
 * Parse the relative path, which is what the components api expects.
 *
 * note: While 'components' root is not shown in the app,
 * the full path is components/<project name>/relative/path/to/file.js
 */

function getRelativeFilepath(absolutePath) {
  // for saving to server, which requires skipping root /components dir
  // and treating /components/projects dir as project name.
  // filepath is <project>/path/to/file.js

  return absolutePath.split('/').slice(2).join('/');

}


function ManageIndex({ refreshCustomFunctions, loading }) {
  const { compute_stack_id } = useParams();
  const registration = useStoreState(instanceState, (s) => s.registration);
  const { fileTree } = useStoreState(instanceState, (s) => s.custom_functions); 
  const [majorVersion, minorVersion] = (registration?.version || '').split('.');
  const supportsApplicationsAPI = parseFloat(`${majorVersion}.${minorVersion}`) >= 4.2;
  const instances = useStoreState(appState, (s) => s.instances);
  const [instanceAuths] = useInstanceAuth({});

  function getDeployTargets(instanceList, instanceAuthList, thisCsId) {

    return instanceList.filter(i => {

      // TODO: restore to exclude myself
      if (i['compute_stack_id'] === thisCsId) {
        return false;
      }

      const csId = i['compute_stack_id'];
      const deployTarget = instanceAuthList[csId];

      if (!deployTarget) {
        return false;
      }

      const [ major, minor, ...patchEtc ] = deployTarget.version.split('.'); 

      // exclude < 4.2
      return parseInt(major, 10) >= 4 && parseInt(minor, 10) >= 2; 

    });

  }


    // save file to instance
  async function saveCodeToInstance(selectedFile) {

    const filepathRelativeToProjectDir = selectedFile.path.split('/').slice(2).join('/'); 
    const payload = {
      auth,
      url: applicationsAPIUrl,
      project: selectedFile.project,
      file: filepathRelativeToProjectDir,
      payload: selectedFile.content
    };

    await setComponentFile(payload);

    await refreshCustomFunctions();

  }

  async function renameFolder(newFolderName, info) {

    // not supported by instance api yet.

    /*
    const fileContent = await getComponentFile({
      url: applicationsAPIUrl,
      auth,
      project: info.project,
      file: getRelativeFilepath(info.path)
    })
    */

  }

  async function renameFile(newFileName, info) {

    const { path, content, project } = info;
    const parentDir = getRelativeFilepath(path).split('/').slice(0, -1).join('/');
    const newFilenameRelativePath = parentDir ? `${parentDir}/${newFileName}` : newFileName;

    await dropComponent({
      auth,
      url: applicationsAPIUrl,
      project,
      file: getRelativeFilepath(path)
    });

    await setComponentFile({
      auth,
      url: applicationsAPIUrl,
      project,
      file: newFilenameRelativePath,
      payload: content
    })

    refreshCustomFunctions();

  }

  async function selectNewFile(selectedFile) {

    const { path, project, name } = selectedFile;
    const newFile = getRelativeFilepath(path);
    const { message: fileContent } = await getComponentFile({
      auth,
      url: applicationsAPIUrl,
      project,
      file: newFile
    });

    return {
      content: fileContent,
      path,
      project,
      name
    };

  }

  async function deleteFile(f) {

    await dropComponent({
      auth,
      url: applicationsAPIUrl,
      project: f.project,
      file: getRelativeFilepath(f.path)
    });

    await refreshCustomFunctions();

  }

  async function deleteFolder({ path, project }) {

    const targetDirpath = getRelativeFilepath(path);

    // if we're deleting as top-level directory, that's a project,
    // so don't pass a file. otherwise pass project name and file/dir
    // relative to project name as 'file'.
    if (targetDirpath.length > 0) {
      await dropComponent({
        auth,
        url: applicationsAPIUrl,
        project,
        file: targetDirpath
      });
    } else {
      await dropComponent({
        auth,
        url: applicationsAPIUrl,
        project
      });
    }

    await refreshCustomFunctions();

  }

  async function createNewProject(newProjectName) {

    await addComponent({
      auth,
      url: applicationsAPIUrl,
      project: newProjectName
    });

    await restartInstance({ auth, url: applicationsAPIUrl });
    //await refreshCustomFunctions();

  }

  async function createNewProjectFolder(newFolderName, parentFolder) {

    const { path, project } = parentFolder;
    const relativeDirpath = getRelativeFilepath(path);
    const relativeFilepath = relativeDirpath ? `${relativeDirpath}/${newFolderName}` : newFolderName;

    await setComponentFile({
      auth,
      url: applicationsAPIUrl,
      project,
      file: relativeFilepath
    })

    await refreshCustomFunctions();

  }

  async function onInstallPackage(projectName, packageUrl) {

    await deployComponent({
      auth,
      url: applicationsAPIUrl,
      project: projectName,
      packageUrl
    });

    await restartInstance({
      auth,
      url: applicationsAPIUrl
    });

    await refreshCustomFunctions();

  }

  async function createNewFile(newFilename, parentFolder) {

    const { path, project } = parentFolder;
    const relativeDirpath = getRelativeFilepath(path);
    const relativeFilepath = relativeDirpath ? `${relativeDirpath}/${newFilename}` : newFilename;
    const payload = '';

    // NOTE: to server, path is everything after '/components/project' in /components/project/path/to/file.js
    // in IDE land, path is full, aka, 'components/project/path/to/file.js'.

    await setComponentFile({
      auth,
      url: applicationsAPIUrl,
      project,
      file: relativeFilepath,
      payload
    });

    await refreshCustomFunctions();

    return {
      content: payload,
      path: [parentFolder.path, newFilename].join('/'),
      project,
    };

  }

  async function deployProject() {
  }

  return supportsApplicationsAPI ?

    <ApplicationsIDE
      fileTree={fileTree} 
      deployTargets={getDeployTargets}
      onSave={saveCodeToInstance}
      onUpdate={refreshCustomFunctions}
      onAddFile={createNewFile}
      onAddProject={createNewProject}
      onAddProjectFolder={createNewProjectFolder}
      onInstallPackage={onInstallPackage}
      onDeployProject={deployProject}
      onDeleteFile={deleteFile}
      onDeleteFolder={deleteFolder}
      onFileSelect={selectNewFile}
      onFileRename={renameFile}
      onFolderRename={renameFolder} /> :

    <CustomFunctionsEditor
      refreshCustomFunctions={refreshCustomFunctions}
      loading={loading} />

}

export default ManageIndex;
