import React from 'react'

import './navbar.css'

const Navbar = ({ setTutorial }) => {
    let logoUrl =
    "https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-3-1.png"
    
    const test = () => {
      setTutorial(true)
    }
  return (
    <nav className='nav-bar'>
        <img alt="Star Wars logo" className="header--logo" src={logoUrl} />
      <div>
        <button className='nav-bar--button' onClick={test}>Tutorial</button>
        
      </div>
    </nav>
  )
}

export default Navbar