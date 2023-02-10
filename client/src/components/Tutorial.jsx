import React from 'react'

import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

import './tutorial.css'

const Tutorial = ({ handleTutReset }) => {

  return (
    <div className="tutorial">
        <BsFillArrowLeftCircleFill className='arrow' onClick={handleTutReset} size={40}/>
        <div className="tutorial-text">
            <div class="a-long-time-ago">
                A long time ago, in a galaxy far,<br/> far away..
            </div>

            <div class="crawl">
                <div>
                    <p>
                        The Death Star - the Empire's ultimate weapon - is almost operational 
                        and is currently approaching the Endor planet. The countdown has started.
                    </p>
                    <p></p>
                    <p>
                        Han Solo, Chewbacca, Leia and C3PO are currently on Tatooine boarding on the
                        Millennium Falcon. They must reach Endor to join the Rebel fleet and destroy
                        the Death Star before it annihilates the planet.
                    </p>
                    <p></p>
                    <p>The Empire has hired the best bounty hunters in the galaxy to capture the 
                        Millennium Falcon and stop it from joining the rebel fleet...
                    </p>
                    <p></p>
                    <p className='title'>
                        Your Mission if you'll accept it
                    </p>
                    <p></p>
                    <p>
                        Your mission is to interact with the UI in order to upload a file representing the intercepted data,
                        do this thanks to the little button up left. C3PO WILL COMPUTE THE ODDS OF GETTING CAUGHT FOR YOU !
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tutorial