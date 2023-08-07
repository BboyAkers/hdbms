import React, { useEffect, useState } from 'react';
import cn from 'classnames';

// TODO:
// keyboard events are buggy
// get rid of button outline
// proper filetype icons 
// theming
// test at greater scale

function directorySortComparator(a, b) {

  // directories first, then flat files sorted
  // ascending, alphanumerically
  const A = +Boolean(a.entries);
  const B = +Boolean(b.entries);

  return A === B ? a.name.localeCompare(b.name) : B - A;

}

function FolderIcon({ isOpen }) {
  const folderClassName = isOpen ? 'fa-folder-open' : 'fa-folder';
  return <i className={cn(`folder-icon fas ${folderClassName}`)} />;
}

function FiletypeIcon() {
  return <i className={ cn('file-icon fab fa-js') } />;
}

function File({ directoryEntry, selectedFile, onFileSelect, userOnSelect, toggleClosed, Icon }) {

  // file receives open/close toggle func from
  // parent. if it's a dir, calls toggle func on click
  // if it's a flat file, calls onFileSelect so 
  // parent can get file content.
  //
  const isDirectory = entry => Boolean(entry.entries);

  function noOp() {
    // TODO: figure out how to handle keyboard events properly.
    // for now, use this to avoid react a11y errors.
  }

  function handleFileSelection() {

    if (isDirectory(directoryEntry)) {
      toggleClosed();
    } else {
      onFileSelect(directoryEntry);
      userOnSelect(directoryEntry);
    }

  }

  const isSelected = !isDirectory(directoryEntry) && directoryEntry.path === selectedFile;

  return (
    <button
      className={ cn("file", { selected: isSelected }) }
      onClick={ handleFileSelection }
      onKeyDown={ noOp } >
        <Icon className="filename-icon" />
        <span className="filename-text">{ directoryEntry.name }</span>
    </button>
  )

}

function Directory({ directoryEntry, userOnSelect, onFileSelect, selectedFile }) {

  const [ open, setOpen ] = useState(true);

  const entries = [...(directoryEntry.entries || [])].sort(directorySortComparator);

  // FolderIcon is a func so we can give it open args now, but instantiate it later.
  const icon = directoryEntry.entries ?
     () => FolderIcon({ isOpen: open })
     : FiletypeIcon

  return (
    // ui:folder name
    <>
      <li key={directoryEntry.key} className="folder-container">
        <File
          Icon={ icon }
          selectedFile={selectedFile}
          directoryEntry={directoryEntry}
          onFileSelect={onFileSelect}
          userOnSelect={userOnSelect}
          toggleClosed={() => { 
            setOpen(!open);
          }} />
      </li>

      {
        entries.map((entry) => (
          <li key={entry.key}>
            <ul className={`folder folder-contents-${open ? 'open' : 'closed' }`}>
              <Directory
                selectedFile={selectedFile}
                directoryEntry={entry}
                onFileSelect={onFileSelect}
                userOnSelect={userOnSelect} />
            </ul>
          </li>
        ))
      }
    </>

  )

}

// recursive (for now) directory tree representation
// File component, Directory component, various Icon components
function FileBrowser({ files, userOnSelect, onFileSelect, selectedFile }) {

  if (!files) return null;

  return (
    <ul className="file-browser">
      <Directory
        selectedFile={selectedFile}
        onFileSelect={onFileSelect}
        userOnSelect={userOnSelect}
        directoryEntry={files} />
    </ul>
  )


}


export default FileBrowser
