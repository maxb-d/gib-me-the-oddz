import React from 'react'

import './tatooine.css'
import '../../isometrics.css'

const Tatooine = () => {
  return (
    <div className='tatooine-wrapper'>
      <div className="saturn">
        <div className="planet-dagoba"></div>
        <div className="up"></div>
      </div>
      <div className="tatooine-title">
        <div className="text-wrap">
          <p className='isometric-text' spellCheck="false">TATOOINE</p>
        </div>
      </div>
    </div>
  )
}

export default Tatooine