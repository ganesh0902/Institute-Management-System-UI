import React from "react"
import a from '..//..//images/back1.jpg';
import './css/BatchStudent.css'
import { NavLink } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { VscMenu } from "react-icons/vsc";
import { IoSendOutline } from "react-icons/io5";
const BatchStudent=()=>{

    const linkStyle = {
        margin: "70px 0px 0px -30px",
        padding: "0px 10px 20px 20px",                 
        width:"100%",        
    };
    return(
        <div style={linkStyle}>
            <div id="batchStudent" className="row">                
                <div className="col-12 col-sm-12 col-md-4 ">                
                    <div className="row">
                        <div className="col-6 col-sm-6 col-md-6">
                            <label> Student List</label>
                        </div>                   
                        <div className="col-6 col-sm-6 col-md-6">
                            <button> Add Assignment </button>
                        </div>         
                        <div className="col-12 col-sm-12 col-md-12 shadow scroll mt-3">
                            <NavLink to="" className="naLink">
                            <div className="studentList">                                
                                <div>
                                    <img src={a} alt=""></img>                                
                                </div>
                                <div>
                                    <label> Ganesh Sakhare </label> <br/> 
                                    <small className="text-decoration-none"> Java Development Batch</small>                                  
                                </div>                                
                            </div>    
                            </NavLink>
                            <div className="studentList">
                                <div>
                                    <img src={a} alt=""></img>                                
                                </div>
                                <div>
                                    <label> Ganesh Sakhare </label><br/>       
                                    <small> Java Development Batch</small>                             
                                </div>
                            </div>    
                            <div className="studentList">
                                <div>
                                    <img src={a} alt=""></img>                                
                                </div>
                                <div>
                                    <label> Ganesh Sakhare </label><br/>    
                                    <small> Java Development Batch</small>                                
                                </div>
                            </div>    
                            <div className="studentList">
                                <div>
                                    <img src={a} alt=""></img>                                
                                </div>
                                <div>
                                    <label> Ganesh Sakhare </label><br/>   
                                    <small> Java Development Batch</small>                                 
                                </div>
                            </div>    
                            <div className="studentList">
                                <div>
                                    <img src={a} alt=""></img>                                
                                </div>
                                <div>
                                    <label> Ganesh Sakhare </label><br/>   
                                    <small> Java Development Batch</small>                                 
                                </div>
                            </div>    
                            <div className="studentList">
                                <div>
                                    <img src={a} alt=""></img>                                
                                </div>
                                <div>
                                    <label> Ganesh Sakhare </label><br/> 
                                    <small> Java Development Batch</small>                                   
                                </div>
                            </div>    
                            <div className="studentList">
                                <div>
                                    <img src={a} alt=""></img>                                
                                </div>
                                <div>
                                    <label> Ganesh Sakhare </label><br/> 
                                    <small> Java Development Batch</small>                                   
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-8 shadow">
                    <div className="chatContainer">                                                    
                        <div className="title shadow">
                            <img src={a} alt="" />
                            <label> Ganesh Sakhare </label>                             
                            <div className="media">
                                <label className="call"> <IoCallOutline/> </label>
                                <label className="video"> <CiVideoOn/> </label>
                                <label className="menu"> <VscMenu/> </label>                                
                            </div>                            
                        </div>
                    </div>
                    <div className="chat-context">
                        <label> Chats</label><br/><br/> <br/> <br/>
                        <label> Chats</label><br/><br/> <br/> <br/>                      
                        <label> Chats</label><br/><br/> <br/> <br/>
                        <label> Chats</label><br/><br/> <br/> <br/>
                        <label> Chats</label><br/><br/> <br/> <br/>    
                        <label> Chats</label><br/><br/> <br/> <br/>    
                        <label> Chats</label><br/><br/> <br/> <br/>                                             
                    </div>
                    <div className="chat">
                        <input type="text" className="form-control" />
                        <label className="send"><IoSendOutline/></label>
                    </div>   
                </div>
            </div>           
        </div>
    )
}
export default BatchStudent