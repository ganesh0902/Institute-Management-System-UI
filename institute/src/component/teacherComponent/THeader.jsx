import React from "react"
import './css//Header.css'
import Logo from './Logo'
import SearchBar from "./SearchBar"
const THeader=()=>{
    return(
        <div id="header" className="header fixed-top d-flex align-items-center"> 
            <Logo/>
            <SearchBar/>
          </div>
    )
}
export default THeader