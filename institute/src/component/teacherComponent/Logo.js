import React from 'react'
import './css/Logo.css'
import {BsJustify}
 from 'react-icons/bs';
function Logo({setSidebarToggleTeacher}) {
       
  return (
    <div className='d-flex align-items-center justify-content-between'>
        <a href='h' className='logo d-flex align-items-center mr-5'>
            <span className='d-none d-lg-block font-2'>AdminDashboard </span>
        </a>
        {/* <i className='bi bi-list toggle-sidebar-btn' 
            onClick={handleToggleSidebar}>
        </i> */}
        <BsJustify className='pl-5 sidebar' onClick={setSidebarToggleTeacher}></BsJustify>
    </div>
  )
}

export default Logo