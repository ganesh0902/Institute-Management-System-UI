import React from "react"
import './css//Header.css'
import Logo from './Logo'
import SearchBar from "./SearchBar"
import Nav from "./Nav"
const THeader=({setSidebarToggleTeacher})=>{
    return(
        <div id="header" className="tHeader shadow fixed-top d-flex align-items-center"> 
            <Logo setSidebarToggleTeacher={setSidebarToggleTeacher}/>
            <SearchBar/>
            <Nav/>
          </div>
    )
}
export default THeader