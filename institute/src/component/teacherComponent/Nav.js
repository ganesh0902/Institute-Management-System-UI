import './css/Nav.css'
import React from 'react'
// import NavAvatar from './NavAvatar'
import NavMessage from './NavMessage'
import NavNotice from './NavNotice'

function Nav() {
  return (
    <div className='header-nav ms-auto'>
        <ul className='d-flex align-items-center'>
            <NavNotice/>            
            <NavMessage/>            
            {/* <NavAvatar/> */}
        </ul>
    </div>
  )
}

export default Nav