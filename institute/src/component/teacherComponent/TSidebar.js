import React from "react"
import styled from 'styled-components';
import { FaHome, FaUserAlt, FaCog } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

const SidebarItem = styled.div`
  width: 100%;
  padding: 15px 20px;
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
    top: 0,
    left: 0,
    width: '250px',    
    height: '100%',
    backgroundColor: '#134B70',
    color: 'white',
    padding: '20px',    
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",        
    backgroundColor: "#134B70",
    borderRadius: "5px",        
};

    return(<di> 
        <aside style={sidebarStyle}>
            <SidebarItem>
            <Icon><FaHome /></Icon>
              Home            
            </SidebarItem>              
            <SidebarItem>
            <Icon><FaUserAlt /></Icon>
            <NavLink to="/tHome" style={linkStyle}>Home</NavLink>            
            </SidebarItem>  
            <SidebarItem>
            <Icon><FaHome /></Icon>
             <NavLink style={linkStyle}> Category </NavLink>
            </SidebarItem>  
            <SidebarItem>
            <Icon><FaCog /></Icon>
              <NavLink to="" style={linkStyle}>  Student </NavLink>
            </SidebarItem>  
            <SidebarItem>
            <Icon><FaHome /></Icon>
            <NavLink to="" className="item" style={linkStyle}>  Profile </NavLink>
            </SidebarItem>            
        </aside>  
       
     </di>)
}
export default TSidebar