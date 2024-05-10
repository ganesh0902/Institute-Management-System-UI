import React from 'react'
import { useParams } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { useEffect } from 'react';
import { useState } from 'react';
const TeacherDetails=()=>{

    const param=useParams();
    const tId=param ? param.tId : null;  

    const[teacher,setTeacher]=useState([]);
    const[batches,setBatches]=useState([]);
    
    useEffect(()=>{
        
        fetch(`http://localhost:9003/teacher/`+tId).then((result)=>{
        result.json().then((response)=>{
            
            console.log(response);

            setTeacher(response);
            getBatches();
        })
        })
    },[])

    const getBatches=()=>{
        fetch(`http://localhost:9002/batch/teacherId/`+tId).then((result)=>{
             
            result.json().then((response)=>{
                setBatches(response);
            })
        })
    }

    return(
        <div className='teacherDetails'>
        <div className='row  m-3'>           
            <div className='col-12 col-md-4 col-sm-12'>
            <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../teacher/${teacher.image}`}/>                    
            </div>
            <div className='col-12 col-md-5 col-sm-12 mt-3'>
                <div className='row'>
                    <div className='col-12 col-md-6 col-sm-12'>
                        <FaUserNurse className='tIcons'/>
                        <small> {teacher.firstName} {teacher.lastName}</small>
                    </div>
                    <div className='col-12 col-md-6 col-sm-12'>
                        <MdOutlineCastForEducation className='tIcons' />
                        <small> {teacher.education}</small>
                    </div>
                    <div className='col-12 col-md-6 col-sm-12 mt-3'>
                        <FaPhone className='tIcons'/>
                        <small> {teacher.contact} </small>
                    </div>
                    <div className='col-12 col-md-6 col-sm-12 mt-3'>
                        <MdMarkEmailRead className='tIcons'/>
                        <small> {teacher.email} </small>
                    </div>
                </div>  
            </div>          
        </div>
        <div className='row m-3'>            
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