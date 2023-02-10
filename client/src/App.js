import Tatooine from "./components/planets/Tatooine";
import Hoth from "./components/planets/Hoth";
import Dagoba from "./components/planets/Dagoba";
import Endor from "./components/planets/Endor";
import Navbar from "./components/Navbar";
import PleaseUpload from "./components/PleaseUpload";
import UploadButton from "./components/fileUpload/UploadButton";
import FileItem from "./components/fileUpload/FileItem";
import Tutorial from "./components/Tutorial";

import { SpinningCircles } from 'react-loading-icons'

import { useState } from "react";

const API_BASE = 'http://localhost:3001'

function App() {
  const [uploadedFile, setUploadedFile] = useState()
  const [odds, setOdds] = useState(999)
  const [fetchError, setFetchError] = useState('')
  const [tutorial, setTutorial] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [route, setRoute] = useState([])
  const [calculating, setCalculating] = useState(false)

  const computeOdds = async () => {
    setIsLoading(true)
    const data = await fetch(API_BASE + '/process', {
      method: 'POST',
      body: uploadedFile,
      header : {
        'content-type': uploadedFile.type,
        'content-length': `${uploadedFile.size}`,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      if(data === 'unvalid'){
        setFetchError('Invalid file structure, try and upload another file ...')
      } else {
        setRoute(data.route)
        setOdds(data.proba)
        setFetchError('')
      }
    })
    .catch((err) => console.error(err))
    setIsLoading(false)
  }

  const removeFile = () => {
    setUploadedFile('')
  }

  const toggleTutorial = () => {
    setTutorial(!tutorial)
  }

  const handleTutReset = () => {
    setTutorial(!tutorial)
  }

  return (
    <div className="App">
      <Navbar setTutorial={setTutorial}/> 
      { !tutorial ? 
        <>
          <div className="lineTest"></div>
          <UploadButton 
            uploadedFile={uploadedFile} 
            setUploadedFile={setUploadedFile}
            removeFile={removeFile}
            setOdds={setOdds}
          />

          { uploadedFile ?
            <FileItem 
              uploadedFile={uploadedFile}
              removeFile={removeFile}
            />
            :
            ''
          }

          <div className="millenium-map">
            <Tatooine />
            <div className="wrap">
              <Hoth />
              <Dagoba />
            </div>
            <Endor />
          </div>
          <div className="displayodds">
            <div className="pusher"></div>
            { !uploadedFile ?
              <div className="foot-info">
                <PleaseUpload />
              </div> : 
              <div>
                <div className="foot-info">
                  <button 
                    className="calculate-proba" 
                    onClick={computeOdds}>Click to Calculate the Odds
                  </button>
                </div>
                { (fetchError !== '' || !uploadedFile) && <p className="chances">Invalid file structure provided, please upload another file </p> }
              </div>
            }
            
            { !isLoading ?
              <div className="container">
                { ((uploadedFile !== '') && (odds !== 999)) ? <p className="chances-top">You have</p> : ''}
                <svg className="svg-odds" viewBox="0 0 960 300">
                  <symbol id="s-text">
                    { ((uploadedFile !== '') && (odds !== 999)) ? <text textAnchor="middle" x="50%" y="80%">{odds} %</text> : '' }
                  </symbol>

                  <g className = "g-ants">
                    <use xlinkHref="#s-text" className="text-copy"></use>
                    <use xlinkHref="#s-text" className="text-copy"></use>
                    <use xlinkHref="#s-text" className="text-copy"></use>
                    <use xlinkHref="#s-text" className="text-copy"></use>
                    <use xlinkHref="#s-text" className="text-copy"></use>
                  </g>
                </svg>
                { ((uploadedFile !== '') && (odds !== 999)) ? <p className="chances-foot">Chances of getting to Endor safely</p> : ''}
              </div> : 
              <div className="loading-circle">
                <p className="chances-top">C3PO Calculating...</p>
                <div className="spinning-icon">
                  <SpinningCircles />
                </div>
              </div>
            } 
          </div> 
          </>:
            <Tutorial handleTutReset={handleTutReset}/> 
          }
    </div>
  );
}

export default App;
