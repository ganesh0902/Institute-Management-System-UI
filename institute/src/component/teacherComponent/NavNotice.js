import React from 'react'
 import { CiBellOn } from "react-icons/ci";
 import './css/Nav.css'

const NavNotice = () => {
  return (
    <li className='nav-item dropdown'>
        <a href='j' className='nav-link nav-icon' data-bs-toggle="dropdown">
            <i className='bi bi-bell text-black'> <CiBellOn/> </i>
            <span className='badge bg-primary badge-number'>4</span>
        </a>

        <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications'>
            <li className='dropdown-header'>
                You Have 4 new notifications
                <a href='#a'> 
                    <span className='badge rounded-pill bg-primary  p-2 ms-2'>  View All </span>                   
                </a>
            </li>
            <li>
                <hr className='dropdown-divider' />
            </li>
            <li className='message-item'>
                <a href='aa'>
                    <img src='' alt='Loading' className='rounded-circle'/>
                </a>    
                <div className=''>
                    <h4> John sinhs </h4>
                    <p> Thank you for visiting ....</p>    
                    <p> 4 Hours ago </p>
                </div>                
            </li>            
            <li>
                <hr className='dropdown-divider' />
            </li>

            <li className='notification-items'>
                <i className='bi bi-exclamation-circle next-warning'> </i>
            <div className=''>
                <h4> Lorem Ipsum</h4>
                <p> Some -----</p>
                <p>30  Min Ago</p>
            </div>   
            </li>
            <li>
                <hr className='dropdown-divider' />
            </li>
            <li className='notification-items'>
                <i className='bi bi-exclamation-circle next-warning'> </i>
            <div className=''>
                <h4> Lorem Ipsum</h4>
                <p> Some -----</p>
                <p>30  Min Ago</p>
            </div>   
            </li>
            <li>
                <hr className='dropdown-divider' />
            </li>
            <li className='notification-items'>
                <i className='bi bi-exclamation-circle next-warning'> </i>
            <div className=''>
                <h4> Lorem Ipsum</h4>
                <p> Some -----</p>
                <p>30  Min Ago</p>
            </div>   
            </li>
            <li>
                <hr className='dropdown-divider' />
            </li>

            <div className=''>
               <a href='#f'> Show All notifications</a>
            </div>  

        </ul>        
    </li>    
  )
}

export default NavNotice