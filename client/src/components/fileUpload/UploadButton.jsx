import React from 'react'

import { BiRocket } from 'react-icons/bi'

import './uploadButton.css'

const UploadButton = ({ setUploadedFile, setOdds }) => {

  const uploadHandler = async (event) => {
    const file = event.target.files[0]
    event.target.value = ''
    if(!file) return
    setUploadedFile(file)
    setOdds(999)
  }

  return (
    <div className="upload-button--wrapper">
        <BiRocket size={30}/>
        <input 
            type="file"
            accept='.json'
            onChange={uploadHandler}
        />
    </div>
  )
}

export default UploadButton