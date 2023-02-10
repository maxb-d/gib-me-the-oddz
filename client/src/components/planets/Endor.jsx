import React from 'react'

import './endor.css'

const Endor = () => {
  return (
    <div className="endor-wrapper">
        <div className="planets-container">
            
            <div className="sun"></div>
            
            <div className="planet-index first-planet-index">
                <div className="route">
                    <div className="planet-endor-container first-planet-endor-container">
                        <div className="planet-endor first-planet"></div>
                    </div>
                </div>
            </div>

            <div className="planet-index second-planet-index">
                <div className="route">
                    <div className="planet-endor-container second-planet-endor-container">
                        <div className="planet-endor second-planet"></div>
                    </div>
                </div>
            </div>

            <div className="planet-index third-planet-index">
                <div className="route">
                    <div className="planet-endor-container third-planet-endor-container">
                        <div className="planet-endor third-planet"></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="endor-title">
            <div className="text-wrap">
                <p className='isometric-text' spellCheck="false">ENDOR</p>
            </div>
        </div>
    </div>
  )
}

export default Endor