import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

import FileBrowser from './FileBrowser';
import FileMenu, { AddFileButton, AddFolderButton, DeleteFolderButton, DeleteFileButton } from './FileMenu';
import EditorMenu, { SaveButton } from './EditorMenu';
import Editor from './Editor'; 
import EditorWindow from './EditorWindow';
import NameInput from './NameInput';

function WebIDE({ fileTree, onSave, onUpdate, onAddFile, onAddFolder, onFileSelect, onFileRename, onFolderRename, onDeleteFile, onDeleteFolder }) {

  const [ selectedFolder, setSelectedFolder ] = useState(null);
  const [ selectedFile, setSelectedFile ] = useState(null); // selectedFile = { content, path, project }
  const [ editingFileName, setEditingFileName ] = useState(false); 
  const [ editingFolderName, setEditingFolderName ] = useState(false); 
  const [ renamingFile, setRenamingFile ] = useState(false); 
  const [ renamingFolder, setRenamingFolder ] = useState(false); 

  const hasProjects = fileTree?.entries?.length > 0;

  // determines which buttons are available in the file menu 
  const canAddFile = Boolean(hasProjects && selectedFolder);  // can only add a file if a target folder is selected
  const canDeleteFolder = Boolean(hasProjects && selectedFolder);  // can only add a file if a target folder is selected

  // deteremines which panes show
  const namingFile = editingFileName || editingFolderName || renamingFile || renamingFolder; // active editing state shows name input

  // updates current in memory code
  function updateInMemoryCodeFile(updatedCode, selectedFile) {

    setSelectedFile({
      ...selectedFile,
      content: updatedCode
    });

  }

  function resetEditingInputs() {

    setEditingFileName(false);
    setEditingFolderName(false);
    setRenamingFile(false);
    setRenamingFolder(false);

  }

  /*
   * api doesnt support this yet.
  function enableRenameFolderInput(e) {

    resetEditingInputs();
    setRenamingFolder(true);

  }
  */

  function enableRenameFileInput(e) {

    resetEditingInputs();
    setRenamingFile(true);

  }

  function enableFileNameInput(e) {

    resetEditingInputs();
    setEditingFileName(true);

  }

  function enableFolderNameInput() {

    resetEditingInputs();
    setEditingFolderName(true);

  }

  function NoFileSelected({ active }) {
    return !active ? null : (
      <div>
        No file selected. Please select or create ( <i className="fas fa-plus" /> ) a file using the menu on the left. 
      </div>
    )
  }

  function FilenameDialog({ active }) {

    if (!active)
       return null;

    return (
      <div className="filename-dialog">
        <NameInput
          label={`Please Choose a New Filename for '${selectedFile?.name}'`}
          value={selectedFile?.name}
          onBlur={resetEditingInputs}
          onConfirm={
            (newName) => {
              onFileRename(newName, selectedFile);
              resetEditingInputs();
            }
          }
          enabled={renamingFile}
          onCancel={resetEditingInputs} />
        <NameInput
          label={`Please Choose a New Folder Name for 'this'`}
          value={selectedFolder?.name}
          onConfirm={ 
            (newName) => {
              onFolderRename(newName, selectedFolder)
              resetEditingInputs();
            }
          }
          enabled={renamingFolder}
          onBlur={resetEditingInputs}
          onCancel={resetEditingInputs} />
        <NameInput
          label="New File Name"
          onConfirm={
            (newFilename) => {
              onAddFile(newFilename, selectedFolder);
              resetEditingInputs();
            }
          }
          onCancel={resetEditingInputs}
          onBlur={resetEditingInputs}
          enabled={editingFileName} 
        />
        <NameInput
          label="New Folder Name"
          onConfirm={
            (newFolderName) => {
              resetEditingInputs();
              onAddFolder(newFolderName, selectedFolder)
            }
          }
          onCancel={resetEditingInputs}
          onBlur={resetEditingInputs}
          enabled={editingFolderName} 
        />
      </div>
    )
  }

  return (
    <Row className="web-ide">
      <Col md="3" className="file-browser-container">
        <FileMenu>
          <AddFolderButton onAddFolder={ enableFolderNameInput } />
          <DeleteFolderButton
            disabled={ !canDeleteFolder }
            onDeleteFolder={
              () => {
                onDeleteFolder(selectedFolder);
                setSelectedFile(null);
                setSelectedFolder(null);
                resetEditingInputs();
              }
            } />
          <AddFileButton
            onAddFile={ enableFileNameInput }
            disabled={ !canAddFile } /> 
          <DeleteFileButton
            disabled={ !selectedFile?.path }
            onDeleteFile={
              (e) => {
                // bug here? is selectedFile reset when i think it is? 
                onDeleteFile(selectedFile);
                setSelectedFile(null);
                setSelectedFolder(null);
                resetEditingInputs();
              }
            } />
        </FileMenu>
        <FileBrowser
          files={ fileTree }
          root={ fileTree.path }
          selectedFile={selectedFile?.path}
          selectedFolder={selectedFolder}
          onFolderRename={
            () => {
              console.log('folder rename not available in 4.2');
            }
          }
          onFileRename={enableRenameFileInput}
          onFolderSelect={setSelectedFolder}
          onFileSelect={
            async (entry) => {
              const { content } = await onFileSelect(entry);
              setSelectedFile({
                ...entry,
                content
              });
            } 
          } />
      </Col>
      <Col className="code-editor-container">
        <EditorMenu
          onSave={
            async () => {
              await onSave(selectedFile)
            }
          }
          SaveButton={ 
            () => ( 
              <SaveButton
                disabled={ !selectedFile }
                onSave={
                  () => onSave(selectedFile)
                } />
            )
          }
        />
        <EditorWindow>
          <Editor
            active={selectedFile && !namingFile}
            file={selectedFile}
            onChange={
              (updatedCode) => {
                updateInMemoryCodeFile(updatedCode, selectedFile);
              }
            } />
          <FilenameDialog active={namingFile} />
          <NoFileSelected active={!selectedFile && !namingFile} /> 
        </EditorWindow>
      </Col>
    </Row>
  );
}


export default WebIDE;
