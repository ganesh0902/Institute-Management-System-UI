import { NavLink } from 'react-router-dom';
import logo from '../..//images/logo.svg'
import menu from '../..//images/menu.png'
import { FaTimes } from "react-icons/fa";
import '..//..//style.css';
import { useState } from 'react';

const NavigationBar=(props)=>{

    const[toggle,setToggle]=useState(false);

    var dynamicRight=-200;
    var dynamicLeft=0;
   
    const { modalAction } = props;

    const addToggle=(status)=>{

        if(status==0)
        {
            setToggle(false)
            console.log("Close ");
        }
        else{
            setToggle(true);
            console.log("Open ");
        }
    }
    const open = {
        position: 'absolute',
        right: `${dynamicRight}px`, 
      };  
      const show = {
        position: 'absolute',
        right: `${dynamicLeft}px`, 
      };     
      
      const[modal,setModal]=useState(false);
       
      const modalHandle = (status) => {
        modalAction();
      };
    return(
       <nav>
            <img src={logo} alt="image"></img> 
            <div className='navigationForDesktop'>
                <ul className='nav-list'>                    
                    <li><NavLink className="NavLink" onClick={() => modalHandle()}> Login </NavLink></li>
                    <li><NavLink className="NavLink"> Home </NavLink></li>
                    <li><NavLink className="NavLink"> About </NavLink></li>
                    <li><NavLink className="NavLink"> Blog </NavLink></li>
                    <li><NavLink className="NavLink"> Courses </NavLink></li>
                    <li><NavLink className="NavLink"> Contact </NavLink></li>
                </ul>
            </div>                                              
            <div className='navigation'>                                                        
                <ul style={toggle ? show : open}>
                    <li> <FaTimes id='menu-close' onClick={()=>addToggle(0)}/> </li>
                    <li><NavLink className="NavLink" onClick={()=>modalHandle()}> Login </NavLink> </li>
                    <li><NavLink className="NavLink"> Home </NavLink> </li>
                    <li><NavLink className="NavLink"> about </NavLink> </li>
                    <li><NavLink className="NavLink"> blog </NavLink> </li>
                    <li><NavLink className="NavLink"> courses </NavLink> </li>
                    <li><NavLink className="NavLink"> contact </NavLink></li>
                </ul>
                <img src={menu} className="menu-btn" onClick={()=>addToggle(1)}></img>
            </div>
       </nav>
    )
}
export default NavigationBar