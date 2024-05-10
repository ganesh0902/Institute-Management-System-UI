import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
const CourseDetails=()=>{

    const params = useParams();
    const cId = params ? params.cId : null;

    const[course,setCourse]=useState([]);

    useEffect(()=>{

        fetch(`http://localhost:9001/course/`+cId).then((result)=>{
            
            result.json().then((response)=>{
                console.log("Course is ",response);
                setCourse(response);
            })
        })
    },[])

    return(
        <main className='main-container'>
            <div className='row shadow p-3'>
                <div className='col-12 col-md-4 col-sm-12'>
                    <div>
                        <img class="card-img-top rounded" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img(20).webp" alt="Card image cap" />
                    </div>                
                </div>
                <div className='col-12 col-md-6 col-sm-12 courseDetails mt-3'>
                    <div>
                        <label> Course Name </label><br/>
                        <small>{course.courseName} </small>
                    </div>                
                    <div>
                        <label htmlFor="">Description</label><br/>
                        <small> {course.description}</small>
                    </div>                   
                    <div>
                        <label> Skills</label><br/>
                        <small>{course.skills} </small>
                    </div>
                    <div>
                        <label htmlFor="fees"> Fees </label><br/>
                        <small> {course.fees} Rupees</small>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default CourseDetails