import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { TiLocation } from "react-icons/ti";
import { GiDuration } from "react-icons/gi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
const StudentDetails=()=>{

    const param=useParams();
    const[batchId,setBatchId]=useState(0);
    const[batches,setBatches]=useState([]);
    const[student,setStudent]=useState([]);
    const[teacherList,setTeacherList]=useState([]);
    const[teacherId,setTeacherId]=useState(0);
    const stdId=param ? param.stdId :null;
        

    useEffect(()=>{
          
        const getStudent=async ()=>{
            await fetch(`http://localhost:9004/student/`+stdId).then((result)=>{

            result.json().then((response)=>{                                
                  setBatchId(response.batchId);
                  setStudent(response);  
                  getBatch();                
            })
        })}
        getStudent();
    },[])
                       
        const getBatch=async ()=>{            
            await fetch(`http://localhost:9002/batch/single/`+stdId).then((result)=>{
            result.json().then((response)=>{
                setBatches(response);
                setTeacherId(response.teacherId);
                console.log("Student Batch",response); 
            })
            })
        }           
        useEffect(()=>{
                    
            const getTeacher=async ()=>{            
                await fetch(`http://localhost:9003/teacher/`+teacherId).then((result)=>{
                result.json().then((response)=>{
                    setTeacherList(response);
                    console.log("Teacher List is ",response); 
                })
                })
            }           
            getTeacher();
        },[teacherId]);

        if(batches==null || student ==null)
        {
            return(
                <div> <p> Loading </p> </div>
            )
        }
    return(
        <div className="stdDetailsContainer">
            <div className="stdInfo m-3">
                <div className="row m-2">
                    <div className="col-12 col-sm-12 col-md-4 shadow">
                        {/* <img class="stdInfoImage" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img(20).webp" alt="Card image cap" /> */}
                        <img class="card-img-top rounded teacher-image-in-teacher-list" src={`../student/${student.image}`} alt="Card image cap" />
                    </div>
                    <div className="col-12 col-sm-12 col-md-8">
                        <div className="username">
                            <small> {student.firstName} &nbsp; {student.lastName} </small>
                        </div>
                        <div className="stdDetails">                 
                            <label> Course Name :</label><small> {student.courseName}</small><br/>
                            <label> Last Education :</label><small> {student.lastEducation}</small><br/>     
                            <label>Pass Out Year :</label><small> {student.passoutYear}</small><br/>                                      
                        </div>
                    </div>
                </div>
                <div className="row stdInformation m-2 justify-content-center mt-4 mb-2 shadow p-3">
                    <div className="col-12 col-sm-12 col-md-4 mt-3 shadow">                       
                        <div className="">
                        <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../teacher/${teacherList.image}`}/>
                        </div> 
                        <div>
                            <h5 className="batchTitleInStudent"><FaUserNurse/> {teacherList.firstName} &nbsp; {teacherList.lastName}   </h5>
                            <div className="teacherInfoInBatch">
                                <label className="field"> <MdOutlineCastForEducation className="icon"/> {teacherList.education} </label><br/>
                                <label className="field"><FaPhone className="icon"/> {teacherList.contact} </label><br/>
                                <label className="field"><MdMarkEmailRead className="icon"/> {teacherList.email} </label><br/>

                            </div>
                        </div>                       
                    </div>                                                                              
                    <div className="col-12 col-sm-12 col-md-4 mt-2 shadow">                       
                        <div className="">
                        <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../batch/${batches.image}`}/>
                        </div> 
                        <div>
                            <h5 className="batchTitleInStudent"> {batches.batchTitle}  </h5>
                            <div className="batch">
                            <label className=""><BsCalendar2DateFill className="icons"/>{batches.startDate} </label>
                            <label className=""> {batches.endDate} </label>
                            <label className=""><GiDuration className="icons"/> {batches.duration}</label>
                            <label className="">Status:  {batches.status} </label>
                            <label className=""><TiLocation className="icons"/> {batches.location} </label>
                            <label className=""><MdOutlineWatchLater className="icons"/> {batches.time} </label>
                            </div>
                        </div>                       
                    </div>                                                                              
                </div>
            </div>
        </div>
    )
}
export default StudentDetails