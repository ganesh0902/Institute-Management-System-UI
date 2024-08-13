import React, { useEffect, useState } from "react"
import a from '..//..//images/back1.jpg';
import './css/BatchStudent.css'
import { NavLink } from "react-router-dom";
import Chatting from './Chatting'
import {getStudentByBatchId} from '../../apis/studentApis'
const BatchStudent=({batchId})=>{

    const[students,setStudents]=useState([]);
    const linkStyle = {
        margin: "70px 0px 0px -30px",
        padding: "0px 10px 20px 20px",                 
        width:"100%",        
    };
        
    useEffect(()=>{

        const getStudents=async ()=>{
            console.log("batch id is "+batchId);

            const data =  await getStudentByBatchId(batchId);
            setStudents(data);
        }
        getStudents();
    },[])

    useEffect(()=>{

        console.log("Students");
        console.log(students);
    },[students]);

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
                            <NavLink to="" className="navLink">
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