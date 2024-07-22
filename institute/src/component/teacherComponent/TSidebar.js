import React from "react"
import styled from 'styled-components';
import { FaHome, FaUserAlt, FaCog } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  position: fixed;  
  left:0px; 
  transition: transform 0.3s ease-in-out;
  @media (max-width: 768px) {
    transform: translateX(-100%); // Hide the sidebar by shifting it to the left
    
  }
`;

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
    backgroundColor: '#111',
    color: 'white',
    padding: '20px',
  };

    return(<di> 
        <aside style={sidebarStyle}>
            <SidebarItem>
            <Icon><FaHome /></Icon>
              Home
            </SidebarItem>  
            <SidebarItem>
            <Icon><FaUserAlt /></Icon>
              Profile
            </SidebarItem>  
            <SidebarItem>
            <Icon><FaHome /></Icon>
              Category
            </SidebarItem>  
            <SidebarItem>
            <Icon><FaCog /></Icon>
              Student
            </SidebarItem>  
            <SidebarItem>
            <Icon><FaHome /></Icon>
              Home
            </SidebarItem>            
        </aside>  
       
     </di>)
}
export default TSidebar