import React from 'react'

import {BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill,  BsListCheck}
   from 'react-icons/bs'
import { NavLink } from 'react-router-dom';
function Sidebar({openSidebarToggle,openSidebar}) {
  
  return (
       <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand text-white'>
                     Admin
                </div>
                <span className='icon close-icon' onClick={openSidebar}>X</span>
            </div>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                     <NavLink className='icon' to="/">  <BsGrid1X2Fill className='elementsIcon1'/> Home </NavLink>
                </li>
                <li className='sidebar-list-item'>
                     <NavLink className='icon' to="/course">  <BsGrid1X2Fill className='elementsIcon1'/> Course </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink className='icon' to="/batch"> <BsFillArchiveFill className='elementsIcon1'/>Batch </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink className='icon' to="/student"> <BsFillGrid3X3GapFill className='elementsIcon'/> Student </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink className='icon' to="/teacher"> <BsListCheck className='elementsIcon'/> Teacher </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink className='icon' to="/teacher"> <BsListCheck className='elementsIcon'/> City </NavLink>                    
                </li>
                <li className='sidebar-list-item'>                    
                    <NavLink className='icon' to="/teacher"> <BsListCheck className='elementsIcon'/> Setting </NavLink>                    
                </li>
            </ul>
       </aside>
  )
}

export default Sidebar