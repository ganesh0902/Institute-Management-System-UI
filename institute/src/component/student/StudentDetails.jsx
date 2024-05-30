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
import { getStudentDetails } from "../../apis/studentApis";
const StudentDetails=()=>{
    const param=useParams();
    const[batchId,setBatchId]=useState(0);
    const[batches,setBatches]=useState([]);
    const[student,setStudent]=useState([]);
    const[teacherList,setTeacherList]=useState([]);
    const[teacherId,setTeacherId]=useState(0);
    const stdId=param ? param.stdId :null;    
    
    const [studentDetails, setStudentDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{          
        const getStudent=async ()=>{
            await fetch(`http://localhost:9004/student/`+stdId).then((result)=>{

            result.json().then((response)=>{                                
                  setBatchId(response.batchId);
                  setStudent(response);  
                //   getBatch();                             
            })
        })}
        getStudent();
    },[])
                       
    useEffect(()=>{
       
        const  fetchStudentDetails=async ()=>{
            const data= await getStudentDetails(stdId);
            setStudentDetails(data);                             
            setLoading(false);
        }        
        fetchStudentDetails();
    },[]);

    useEffect(()=>{

        console.log("Student Details");
        console.log(studentDetails);
    },[studentDetails]);

    if (loading) return <div>Loading...</div>;
    if (!studentDetails) return <div>Loading1...</div>;
    if (error) return <div>Error: {error.message}</div>;

        // const getBatch=async ()=>{            
        //     await fetch(`http://localhost:9002/batch/single/`+stdId).then((result)=>{
        //     result.json().then((response)=>{
        //         setBatches(response);
        //         setTeacherId(response.teacherId);
        //         getTeacher();
        //     })
        //     })
        // }           
        // const getTeacher=async ()=>{            
        //     await fetch(`http://localhost:9003/teacher/`+teacherId).then((result)=>{
        //     result.json().then((response)=>{
        //         setTeacherList(response);
        //         console.log("Teacher List is ",response); 
        //     })
        //     })
        // }           

        if(batches==null || student ==null)
        {
            return(
                <div> <p> Loading </p> </div>
            )
        }

        if (!studentDetails) return <p>No data to display</p>;

    return(
        <div className="stdDetailsContainer">
            <div className="stdInfo m-3">
                <div className="row m-2">
                    {/* <div className="col-12 col-sm-12 col-md-4 shadow">                        
                        <img class="card-img-top rounded teacher-image-in-teacher-list" src={`../student/${student.image}`} alt="Card image cap" />
                    </div>
                    <div className="col-12 col-sm-12 col-md-8">
                        <div className="username">
                            <small>{studentDetails.firstName} &nbsp; {studentDetails.lastName}</small>                            
                        </div>
                        <div className="stdDetails">                 
                            <label> Course Name :</label><small> {studentDetails.courseName}</small><br/>
                            <label> Last Education :</label><small> {studentDetails.lastEducation}</small><br/>     
                            <label>Pass Out Year :</label><small> {studentDetails.passoutYear}</small><br/>                                      
                        </div>
                    </div> */}

                    <div className="col-12 col-sm-12 col-md-4 stdDetails shadow p-5">                        
                        <div className="student-profile">
                            <img class="text-center shadow-4-strong" alt="avatar2" src={`../student/${studentDetails.image}`} />
                        </div>
                        <div className="student-content">
                            <h4 className="student-username"> {studentDetails.firstName} &nbsp; {studentDetails.lastName}</h4>
                            <span className="student-courseName">{studentDetails.courseName}</span><br/>
                            <div className="btn-group mt-2">
                                <button className="btn btn-primary"> Follow</button> &nbsp;
                                <button className="btn btn-secondary hover"> Message </button>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-12 mt-4">
                            <label><FaPhone/></label>&nbsp;&nbsp; <label> Facebook</label>
                        </div>
                        <hr/>
                        <div className="col-12 col-md-6 col-12 mt-4">
                            <label><FaPhone/></label>&nbsp;&nbsp; <label> Whatsapp</label>
                        </div>
                        <hr/>
                        <div className="col-12 col-md-6 col-12 mt-4">
                            <label><FaPhone/></label>&nbsp;&nbsp; <label> Instagram </label>
                        </div>
                        <hr/>
                        <div className="col-12 col-md-6 col-12 mt-4">
                            <label><FaPhone/></label>&nbsp;&nbsp; <label> Twitter</label>
                        </div>
                        <hr/>
                    </div>
                    <div className="col-12 col-sm-12 col-md-7 shadow p-5 std-subDetails">
                        <div className="">
                            <b>Std Id</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span> {studentDetails.stdId} </span>
                        </div>
                        <hr/>
                        <div className="stdItem">
                            <b>First Name</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span> {studentDetails.firstName}  </span>
                        </div>
                        <hr/>
                        <div className="stdItem">
                            <b>Last Name</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span> {studentDetails.lastName} </span>
                        </div>
                        <hr/>
                        <div className="stdItem">
                            <b>Pass Out</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span> {studentDetails.passoutYear} </span>
                        </div>
                        <hr/>
                        <div className="stdItem">
                            <b>Last Education</b>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span> {studentDetails.lastEducation} </span>
                        </div>
                        <hr/>
                        <div className="stdItem">
                            <b>Course Name</b>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span> {studentDetails.courseName} </span>
                        </div>                   
                        <hr/>
                        <div className="stdItem">
                            <button className="btn btn-info px-5">Edit</button>
                        </div>                                                     
                    </div>                    
                </div>
                {/* <div className="row stdInformation m-2 justify-content-center mt-4 mb-2 shadow p-3">
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
                </div> */}
            </div>
        </div>
    )
}
export default StudentDetails