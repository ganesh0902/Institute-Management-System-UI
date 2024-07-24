import React from "react"
import { FaHome } from 'react-icons/fa';
import './css/THomePage.css'
const THomePage=()=>{

    const linkStyle = {
        margin: "70px 10px 0px 0px",
        padding: "0px 20px 20px 20px", 
        backgroundColor:"#F6F5F5"               
    };

    return(<div style={linkStyle}>
        <div className="tHomeCards">            
            <div className="tHomeCard" style={{backgroundColor:"#2378D0",color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> TOTAL STUDENT </p>
                    <p> 2000 </p>
                    <small> 80% increase </small>
                </div>
            </div>                                                                         
            <div className="tHomeCard" style={{backgroundColor:"#C26F04",color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> NEW JOINING </p>
                    <p> 2000 </p>
                    <small> 80% increase </small>
                </div>
            </div>                                                                         
            <div className="tHomeCard" style={{backgroundColor:"#464196",color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> TOTAL COURSES</p>
                    <p> 2000 </p>
                    <small> 80% increase </small>
                </div>
            </div>                                                                         
            <div className="tHomeCard" style={{backgroundColor:"#BA0101", color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> FEES COLLECTIONS</p>
                    <p> 2000 </p>
                    <small> 80% increase </small>
                </div>
            </div>                                                                         
            <div className="tHomeCard" style={{backgroundColor:"#BA0101", color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> FEES COLLECTIONS</p>
                    <p> 2000 </p>
                    <small> 80% increase </small>
                </div>
            </div>                                                                         
            <div className="tHomeCard" style={{backgroundColor:"#BA0101", color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> FEES COLLECTIONS</p>
                    <p> 2000 </p>
                    <small> 80% increase </small>
                </div>
            </div>                                                                         
        </div>        
    </div>)
}
export default THomePage