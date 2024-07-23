import React from "react"
import { FaHome } from 'react-icons/fa';
import './css/THomePage.css'
const THomePage=()=>{

    const linkStyle = {
        margin: "70px 10px 0px 0px",
        padding: "20px", 
        backgroundColor:"#F6F5F5"               
    };

    return(<div style={linkStyle}>
        <div className="tHomeCards">
            <h2> Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots,</h2>
            <div className="tHomeCard">
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> Total Student</p>
                    <p> 2000 </p>
                    <small> 80% increase </small>
                </div>
            </div>                   
            <div className="tHomeCard">
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> Total Student</p>
                    <p> 2000 </p>
                    <small> 80% increase </small>
                </div>
            </div>                   
        </div>
    </div>)
}
export default THomePage