import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons'

import React from 'react'

import './fileItem.css'

const FileItem = ({ uploadedFile, removeFile }) => {
  return (
    <div className='file-item'>
        <FontAwesomeIcon className='file-icon' icon={faFileAlt} />
        <p className='file-name'>{uploadedFile.name}</p>
        <div className='actions'>
            <FontAwesomeIcon 
                icon={faTrash}
                onClick={removeFile}
            />
        </div>
    </div>
  )
}

export default FileItem