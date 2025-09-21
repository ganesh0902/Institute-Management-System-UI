import React, { useEffect, useState } from "react"
import a from '..//..//images/back1.jpg';
import './css/BatchStudent.css'
import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { VscMenu } from "react-icons/vsc";
import { IoSendOutline } from "react-icons/io5";
import { getStudent } from "../../apis/studentApis";
import Loader from "../Loader";

const Chatting=({stdId})=>{

    const[student,setStudent]=useState([]);
    
    useEffect(()=>{

        const getStudentDetails=( async()=>{
            
            const data = await getStudent(stdId);            
            setStudent(data);
        })
        getStudentDetails();
        console.log("Student Id is in chat");
        console.log(stdId);
        
    },[stdId]);

    useEffect(()=>{

        console.log("Student Details");
        console.log(student);
    },[student]);

    if(!student==null)
    {
        return(<Loader/>)
    }
    return( 
            <div className="">
            <div className="chatContainer">     
                <div className="">
                    <div className="title shadow">
                        <img src={a} alt="" />
                        <label> {student.firstName} &nbsp; {student.lastName} </label>                             
                        <div className="media">
                            <label className="call"> <IoCallOutline/> </label>
                            <label className="video"> <CiVideoOn/> </label>
                            <label className="menu"> <VscMenu/> </label>                                
                        </div>                            
                    </div>
                </div>
                <div className="chat-context">                                                               
                    <div className="client-context">
                        <img src={a} alt="" className="client-dp"/>
                        <label className="client"> Hello React How are you </label>
                        <small> 02:25pm</small>
                    </div>                                             
                    <div className="owner-context">
                        <img src={a} alt="" className="owner-dp"/>
                        <label className="owner"> Hello I am very well <small> 02:25pm</small></label>                            
                    </div>  
                    <div className="client-context">
                        <img src={a} alt="" className="client-dp"/>
                        <label className="client"> How's your work going on</label>
                        <small> 02:25pm</small>
                    </div>    
                    <div className="owner-context">
                        <img src={a} alt="" className="owner-dp"/>
                        <label className="owner"> My work is going well as usually <small> 02:25pm</small></label>
                    </div>
                    <div className="client-context">
                        <img src={a} alt="" className="client-dp"/>
                        <label className="client"> Ok, It's great  </label>
                        <small> 02:25pm</small>
                    </div> 
                    <div className="owner-context">
                        <img src={a} alt="" className="owner-dp"/>
                        <label className="owner"> Yes, What's about you how your work going on <small> 02:25pm</small></label>
                    </div>    
                    <div className="client-context">
                        <img src={a} alt="" className="client-dp"/>
                        <label className="client"> My work also going well   </label>
                        <small> 02:25pm</small>
                    </div>  
                    <div className="owner-context">
                        <img src={a} alt="" className="owner-dp"/>
                        <label className="owner"> Okay, Keep working hark <small> 02:25pm</small></label>
                    </div>  
                    <div className="client-context">
                        <img src={a} alt="" className="client-dp"/>
                        <label className="client"> Yes, Thank You  </label>
                        <small> 02:25pm</small>
                    </div>                                          
                </div>                                        
                <div className="chat">
                    <input type="text" className="form-control" />
                    <button className="send"><IoSendOutline/></button>
                </div> 
                </div>                                               
            </div>                                                            
    )
}
export default Chatting