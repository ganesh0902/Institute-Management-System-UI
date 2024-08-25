import React from 'react'
import { useParams } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";
import { FaInstagram,FaGithub  } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { useEffect } from 'react';
import { useState } from 'react';
import {updateTeacher, getTeacherById} from '../../apis/teacherApis'
import {getBatchesByTeacherId} from '../../apis/batchApis'
import userEvent from '@testing-library/user-event';

const TeacherDetails=()=>{

    const param=useParams();
    const tId=param ? param.tId : null;  

    const[teacher,setTeacher]=useState([]);
    const[batches,setBatches]=useState([]);

    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[contact,setContact]=useState("");
    const[education,setEducation]=useState("");
    const[reloadPage,setReloadPage]=useState(false);
    
    const API_GET_TEACHER ="http://localhost:8999/teacher/";

    const token=localStorage.getItem("authToken");
    useEffect(()=>{
        
        getTeacher();
        
         getBatches();            
    },[tId]);

    const getTeacher=async ()=>{
        const response  = await getTeacherById(tId);
        
        setTeacher(response);
    }

    const getBatches=async ()=>{
       
        const response = await getBatchesByTeacherId(tId);        
        setBatches(response);
    }
                     
    const saveTeacher=async ()=>{

        
        const teacher={tId,firstName,lastName,contact,education};
        console.log("Teacher record ",teacher);
         await updateTeacher(tId,teacher);         
         alert("Teacher Updated Successfully");         
         setReloadPage(!reloadPage);
    }

    if(batches==null)
    {
        return<div> Loading...</div>
    }
    return( 
        <div className='teacherDetails'>
        <div className='row  m-3'>   
            <div className='col-12 col-sm-12 col-md-4 shadow bg-white'>
                <div className='col-12 col-sm-12 col-md-12 teacher-profile-in-teacher-details my-2'>
                    <img className='' loading='lazy' alt='uploading' src={`../teacher/${teacher.image}`}/>                    
                </div>
                <div className='col-12 col-sm-12 col-md-12 text-center content'>
                    <label> {teacher.firstName} &nbsp; {teacher.lastName} </label><br/>
                    <small> Full Stack Developer </small> <br/>
                </div>
                <div className='col-12 col-sm-12 col-md-12 text-center content p-4'>                
                    <button className="btn btn-primary"> Follow</button> &nbsp;
                    <button className="btn btn-secondary hover"> Message </button>                                            
                </div>
                <div className='col-12 col-sm-12 col-md-12 social-media-icon'>                
                    <label className=""><FaPhone className='icon whatsapp'/> Whatsapp</label>
                    <hr/>
                    <label className=""><FaInstagram className='icon instagram'/>Instagram </label>
                    <hr/>
                    <label><CiTwitter className='icon twitter'/>Twitter</label>
                    <hr/>
                    <label className=""><FaGithub className='icon github'/>Github</label>
                    <hr/>
                </div>
            </div>
            <div className='col-12 col-sm-12 col-md-7 shadow bg-white' style={{marginLeft:"30px"}}>                
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 shadow pb-2 mb-1'>
                         <label className=''> Teacher Details </label>   
                    </div>
                    <div className='col-12 col-sm-12 col-md-6'>
                        <label> First Name</label>
                        <input className='form-control' defaultValue={teacher.firstName} onChange={(event)=>setFirstName(event.target.value)} placeholder='Enter First Name' />
                    </div>
                    <div className='col-12 col-sm-12 col-md-6'>
                        <label> Last Name</label>
                        <input className='form-control' defaultValue={teacher.lastName} onChange={(event)=>setLastName(event.target.value)} placeholder='Enter Last Name' />
                    </div>
                    <div className='col-12 col-sm-12 col-md-6'>
                        <label> Education</label>
                        <input className='form-control' defaultValue={teacher.education} onChange={(event)=>setEducation(event.target.value)} placeholder='Enter Education' />
                    </div>
                    <div className='col-12 col-sm-12 col-md-6'>
                        <label> Contact No.</label>
                        <input className='form-control' defaultValue={teacher.contact} onChange={(event)=>setTeacher(event.target.value)} placeholder='Enter Contact No.' />
                    </div>
                    <div className='col-12 col-sm-12 col-md-6'>
                        <label> Email Id</label>
                        <input className='form-control' defaultValue={teacher.email} readOnly placeholder='Enter Email' />
                    </div>
                    <div className='col-12 col-sm-12 col-md-6'>
                            <label className='' style={{color:"white"}}> save</label>
                        <button className='btn btn-primary form-control' onClick={()=>saveTeacher()}> Save Changes</button>
                    </div>
                </div>
            </div>                              
        </div>
        <div className='row m-3'>   
        <hr/>
        <div>            
        </div>        
        {
            batches.map((batch,index)=>(                      
            <div className='col-12 col-md-4 col-sm-12 mt-2'>
                <div className='card bg-white'>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-12 col-md-12 col-sm-12'>
                            <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../batch/${batch.image}`}/>                  
                            </div>                            
                                <div className='col-12 col-md-12 col-sm-12'>
                                    <div className='row'>
                                            <div className='col-12 col-md-6 co-sm-12'>
                                                <label> {batch.batchTitle}</label>
                                            </div>
                                            <div className='col-12 col-md-6 co-sm-12'>                                        
                                                <label> Duration &nbsp;{batch.duration} </label>
                                            </div>
                                            <div className='col-12 col-md-6 co-sm-12'>
                                                <label> Date  &nbsp;</label>
                                                <label> {batch.startDate} </label>
                                            </div>
                                            <div className='col-12 col-md-6 co-sm-12'>                                                 
                                                <label> {batch.endDate} </label>
                                            </div>
                                            <div className='col-12 col-md-6 co-sm-12'>                                        
                                                <label> Status : {batch.status} </label>
                                                <select className='dropdown'>
                                                    <option className='item'> Status</option>
                                                    <option className='item'> Pending</option>
                                                    <option className='item'> End</option>
                                                    <option className='item'> Cancel</option>
                                                </select>
                                            </div>
                                            <div className='col-12 col-md-6 co-sm-12'>                                        
                                                <label> Loc : Pune </label>
                                            </div>                                    
                                        </div>
                                    </div>                                                      
                                </div>
                            </div>
                        </div>
                    </div>     
                    ))
                }                                 
                </div>
            </div>
    )
}
export default TeacherDetails