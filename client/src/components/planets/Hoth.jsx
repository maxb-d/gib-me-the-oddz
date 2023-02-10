import React from 'react'

import './hoth.css'
import '../../isometrics.css'
const Hoth = () => {
  return (
      <div className="planet-wraper planet-shadow">
          <div className="planet-hoth">
              <div className="crater"></div>
              <div className="crater"></div>
              <div className="crater"></div>
              <div className="crater"></div>
              <div className="crater"></div>
          </div>
          <div className="hoth-title">
            <div className="text-wrap">
              <p className='isometric-text' spellCheck="false">HOTH</p>
            </div>
          </div>
      </div>
  )
}

export default Hoth