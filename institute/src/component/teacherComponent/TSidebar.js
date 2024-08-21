import React from "react"
import styled from 'styled-components';
import { FaHome, FaCog, FaUserGraduate } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

const SidebarItem = styled.div`
  width: 100%;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;
  transition: background-color 0.3s;   

  &:hover {
    background-color: #34495e;
  }

   @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Icon = styled.div`
  margin-right: 10px;
`;

const TSidebar=({toggle})=>{

  const sidebarStyle = {
    transform: toggle ? 'translateX(0%)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
    position: 'fixed',
    top: 60,
    left: 0,
    width: '220px',    
    height: '100%',
    backgroundColor: '#134B70',
    color: 'white',
    padding: '20px', 
    zindex:'900px'
               
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",        
    backgroundColor: "#134B70",
    borderRadius: "5px",        
};

    return( 
        <aside style={sidebarStyle}>            
            <SidebarItem>
            <Icon><FaHome /></Icon>
            <NavLink to="/tHome" style={linkStyle}>Home</NavLink>            
            </SidebarItem>  
            <SidebarItem>
            <Icon><FaUserGraduate /></Icon>
              <NavLink to="" style={linkStyle}>  Student </NavLink>
            </SidebarItem>  
            <SidebarItem>
            <Icon><FaCog /></Icon>
              <NavLink to="/tBatch" style={linkStyle}>  Batches </NavLink>
            </SidebarItem>  
            <SidebarItem>
            <Icon><FaHome /></Icon>
             <NavLink style={linkStyle}>Assignment List </NavLink>
            </SidebarItem>              
            <SidebarItem>
            <Icon><FaHome /></Icon>
            <NavLink to="" className="item" style={linkStyle}>  Profile </NavLink>
            </SidebarItem>            
        </aside>  
       
     )
}
export default TSidebar