import React from 'react'
 import { CiBellOn } from "react-icons/ci";
 import './css/Nav.css'
//import exclamation from '../..//images/exclamation-circle.svg'
const NavNotice = () => {
  return (
    <li className='nav-item dropdown'>
        <a href='j' className='nav-link nav-icon' data-bs-toggle="dropdown">
            <i className='bi bi-bell text-black'> <CiBellOn/>             
            </i>
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
                <div className='row p-3'>                    
                    <div className='col-9 col-sm-9 col-md-9'>
                        <h6> John sinhs </h6>
                        <label> Thank you for visiting ....</label>   <br/> 
                        <span> 4 Hours ago </span>
                    </div>
                    <hr className='dropdown-divider' />      
                    <div className='col-9 col-sm-9 col-md-9'>
                        <h6> John sinhs </h6>
                        <label> Thank you for visiting ....</label>   <br/> 
                        <span> 4 Hours ago </span>
                    </div>
                    <hr className='dropdown-divider' />      
                    <div className='col-9 col-sm-9 col-md-9'>
                        <h6> John sinhs </h6>
                        <label> Thank you for visiting ....</label>   <br/> 
                        <span> 4 Hours ago </span>
                    </div>
                    <hr className='dropdown-divider' />                                              
                </div>              
            </li>            
            <li>
                
            </li>
            <div className='m-2 text-decoration-none'>
               <a href='#f'> Show All notifications</a>
            </div>  

        </ul>        
    </li>    
  )
}

export default NavNotice