import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BatchDisplay=()=>{
    
    const params = useParams();
    const bId = params ? params.bId : null;
    const[name,setName]=useState("");
    const[batch,setBatch]=useState([]);   
    const[course,setCourse]=useState([]);
    const[teacher,setTeacher]=useState([]);
    useEffect(()=>{
        
        fetch(`http://localhost:9002/batch/`+bId).then(async (result)=>{

            await result.json().then((response)=>{
                setBatch(response);                                                      
            })
        })

    },[bId]);

    useEffect(()=>{        
        const {course}=batch;
        setCourse(course);
        const {teacherDto}=batch;
        setTeacher(teacherDto);        
              
    },[batch]);
    if (!course) {
        return <div>Loading...</div>; // Return loading indicator if course is not available yet
      }
    
    return(
        <div className='batchDisplay'>
            <div className='row teacher_data'>
                <div className='col-12 col-md-6 col-sm-12'>
                    <div>
                    <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../teacher/${teacher.image}`}/>                  
                    </div> 
                </div>            
                <div className='col-12 col-md-6 col-sm-12'>
                    <div className='row'>
                        <div className='col-4 col-md-4 col-sm-12 batchCourse_data'>
                          <label> First Name </label> <be/>
                          <small className='mt-2'> {teacher.firstName}  </small>
                        </div>
                        <div className='col-4 col-md-4 col-sm-12 batchCourse_data'>
                            <label> Last Name </label><be/>
                            <small className='mt-2'> {teacher.lastName} </small>
                        </div>
                        <div className='col-4 col-md-4 col-sm-12 batchCourse_data'>
                            <label> Education </label><be/>
                            <small className='mt-2'> {teacher.education} </small>
                        </div>
                        <div className='col-4 col-md-4 col-sm-12 batchCourse_data mt-3'>
                            <label> Contact </label><be/>
                            <small className='mt-2'> {teacher.contact} </small>
                        </div>
                        <div className='col-4 col-md-4 col-sm-12 batchCourse_data mt-3'>
                            <label> Email </label><be/>
                            <small className='mt-2'> {teacher.email} </small>
                        </div>
                        <div className='col-4 col-md-4 col-sm-12 batchCourse_data mt-3'>
                            <label> Status </label><be/>
                            <small className='mt-2'> Working </small>
                        </div>
                    </div>
                </div>
            </div>
        
            <div className='row m-2'>
                <div className='col-12 col-md-6 col-sm-12'>
                    <div className=''>
                        <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../batch/${batch.image}`}/>                  
                    </div>                    
                </div>
                <div className='col-12 col-md-6 col-sm-12'>
                    <div className='batchTitle text-center mt-4'>
                         <h2> {batch.batchTitle} </h2>
                    </div>                    
                    <div className='row mt-4'>
                        <div className='col-4'>
                            <label> Start Date </label><br/>
                            <small className='mt-2'>{batch.startDate}</small>
                        </div>
                        <div className='col-4'>
                            <label> End Date </label><br/>
                            <small className='mt-2'>{batch.endDate}</small>
                        </div>
                        <div className='col-4'>
                            <label> Duration </label><br/>
                            <small className='mt-2'> {batch.duration} Months </small>
                        </div>                        
                        <div className='col-4 mt-3'>
                            <label> Status </label><br/>
                            <small className='mt-2'> {batch.duration} </small>
                        </div> 
                        <div className='col-4 mt-3'>
                            <label> Location </label><br/>
                            <small className='mt-2'> {batch.location} </small>
                        </div> 
                        <div className='col-4 mt-3'>
                            <label> Time </label><br/>
                            <small className='mt-2'> {batch.time} </small>
                        </div> 
                    </div>
                    <div className='row'>
                        <div className='card batchCourseContainer'>
                            <div className='card-body'>
                        
                                <div className='col-12 batchCourse_data'>
                                    <label> course Name </label>    
                                    <small> {course.courseName} </small>
                                </div>
                                <div className='col-12 batchCourse_data mt-2'>
                                    <label> course Description  </label>    
                                    <small> {course.description} </small>
                                </div>
                                <div className='col-12 batchCourse_data mt-2'>
                                    <label> Skills </label>    
                                    <small> {course.skills} </small>
                                </div>
                                <div className='col-12 batchCourse_data mt-2'>
                                    <label> Fees  </label>    
                                    <small> {course.fees} Rupees </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                        
        </div>
    )
}
export default BatchDisplay