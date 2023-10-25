import React from 'react';
import { Card, CardTitle } from 'reactstrap';
import NameInput from './NameInput';
import { isValidProjectName } from './lib';

export default function NameProjectWindow({ active, onConfirm, onCancel }) {
  return !active ? null : (
    <Card className="name-project-window">
      <CardTitle className="name-project-window-title">Name Your Project</CardTitle> 
      <NameInput
        placeholder="Your new project name"
        validate={ isValidProjectName }
        onEnter={ onConfirm }
        onConfirm={ onConfirm }
        onCancel={ onCancel } />
    </Card>
  );
}
