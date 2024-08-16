import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import a from '..//..//images/back1.jpg';
import './css/BatchStudent.css'
import { NavLink } from "react-router-dom";
import Chatting from './Chatting'
import {getStudentByBatchId} from '../../apis/studentApis'
import Loader from "../Loader";

const BatchStudent=()=>{

    const[students,setStudents]=useState([]);
    const[load,setLoad]=useState(true);
    const linkStyle = {
        margin: "70px 0px 0px -30px",
        padding: "0px 10px 20px 20px",                 
        width:"100%",        
    };
    
    const params = useParams();
    const bId = params ? params.bId : null;
        
    useEffect(()=>{

        const getStudents=async ()=>{            
        try
        {         
            const data =  await getStudentByBatchId(bId);
            console.log(data);
            setStudents(data);
        }   
        catch(error)
        {
            console.log("Something went wrong while fetching student by batchId");
        }
        finally{
            setLoad(false);
        }
        }
        getStudents();
    },[])

    if(load)
    {
        return(<Loader/>)
    }

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
                            {
                                students.map((student,index)=>(
                                <NavLink to="" className="navLink">
                                    <div className="studentList">                                
                                        <div>
                                            <img src={a} alt=""></img>                                
                                        </div>
                                        <div>
                                            <label> {student.firstName} &nbsp; {student.lastName} </label> <br/> 
                                            <small className="text-decoration-none"> Java Development Batch</small>                                  
                                        </div>                                
                                    </div>    
                                </NavLink>                            
                                ))
                            }                          
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-8 shadow">
                      <Chatting/>  
                </div>
            </div>           
        </div>
    )
}
export default BatchStudent