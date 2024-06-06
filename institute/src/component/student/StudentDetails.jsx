import { useState, useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { FaInstagram,FaGithub  } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { IoMdTime } from 'react-icons/io';
import { TabView, TabPanel } from 'primereact/tabview';        
import { getStudentDetails, updateStudent } from "../../apis/studentApis";
import { Modal ,ModalBody, ModalHeader, Row,Col, Input} from "reactstrap"
import Loader from "../Loader";
import TeacherUpdate from "../teachers/TeacherUpdate";

const StudentDetails=()=>{
    const param=useParams();
    
    const[batches,setBatches]=useState([]);
    const[student,setStudent]=useState([]);
    const[teacherDialog,setTeacherDialog]=useState(false);
    
    const stdId=param ? param.stdId :null;        
    const [studentDetails, setStudentDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const[studentDialog,setStudentDialog]=useState(false);    

    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[passoutYear,setPassoutYear]=useState("");
    const[lastEducation,setLastEducation]=useState("");
    const[courseName,setCourseName]=useState("");  
    const[updateComponent,setUpdateComponent] = useState(false);
    const childRef = useRef();

    const  fetchStudentDetails=async ()=>{
        const data= await getStudentDetails(stdId);
        setStudentDetails(data);                             
        setLoading(false);                     
    }        

    useEffect(()=>{
       
        const  fetchStudentDetails=async ()=>{
            const data= await getStudentDetails(stdId);
            setStudentDetails(data);                             
            setLoading(false);                     
        }        
        fetchStudentDetails();
    },[]);       
   
    const studentUpdate=async ()=>{

        const studentObject={stdId,studentDetails ,firstName, lastName, passoutYear, lastEducation,courseName};
        
        if(firstName==="" || lastName ==="" || passoutYear=="" || lastEducation=="")
        {
            alert("All Field are mandatory");
        }
        else
        {   const response = await updateStudent(stdId,studentObject);
            setStudentDialog(!studentDialog);
            alert("Student Update Successfully"); 
            fetchStudentDetails();             
        }
    };    
      
    useEffect(()=>{        
        console.log(studentDetails);
    },[studentDetails]);

    useEffect(()=>{


    },[updateComponent]);
    const componentUpdate=()=>
    {
        fetchStudentDetails()
    }
       
    if (loading) return <div>Loading...</div>;
    if (!studentDetails) return <div>Loading1...</div>;
    if (error) return <div>Error: {error.message}</div>;              

    if (!studentDetails) return <p>No data to display</p>;

    return(
        <div className="stdDetailsContainer">
            <div className="stdInfo m-3">
                <div className="row m-2">
                    <div className="col-12 col-sm-12 col-md-12 ">
                    <TabView>
                        <TabPanel header="Student" className="student-text-in-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
                            <p className="m-0">
                                <div className="row">
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
                                            <label className="whatsapp"><FaPhone/></label>&nbsp;&nbsp; <label> Whatsapp</label>
                                        </div>
                                        <hr/>
                                        <div className="col-12 col-md-6 col-12 mt-4">
                                            <label className="instagram"><FaInstagram/></label>&nbsp;&nbsp; <label> Instagram </label>
                                        </div>
                                        <hr/> 
                                        <div className="col-12 col-md-6 col-12 mt-4">
                                            <label className="twitter"><CiTwitter/></label>&nbsp;&nbsp; <label> Twitter</label>
                                        </div>
                                        <hr/>
                                        <div className="col-12 col-md-6 col-12 mt-4">
                                            <label className="github"><FaGithub/></label>&nbsp;&nbsp; <label> Github</label>
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
                                        <button className="btn btn-info px-5" onClick={()=>setStudentDialog(!studentDialog)}>Edit</button>
                                    </div>                                                     
                                </div>                    
                                </div>
                            </p>
                        </TabPanel>
                        <TabPanel header="Teacher" className="px-4 py-2" rightIcon="pi pi-user ml-2">
                        <p className="m-0">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-4 stdDetails shadow p-5">                        
                                        <div className="student-profile">
                                            <img class="text-center shadow-4-strong" alt="avatar2" src={`../teacher/${studentDetails.teacherDto.image}`} />
                                        </div>
                                        <div className="student-content">
                                            <h4 className="student-username"> {studentDetails.teacherDto.firstName} &nbsp; {studentDetails.teacherDto.lastName}</h4>
                                            <span className="student-courseName">{studentDetails.courseName}</span><br/>
                                            <div className="btn-group mt-2">
                                                <button className="btn btn-primary"> Follow</button> &nbsp;
                                                <button className="btn btn-secondary hover"> Message </button>
                                            </div>
                                        </div>                        
                                        <div className="col-12 col-md-6 col-12 mt-4">
                                            <label className="whatsapp"><FaPhone/></label>&nbsp;&nbsp; <label> Whatsapp</label>
                                        </div>
                                        <hr/>
                                        <div className="col-12 col-md-6 col-12 mt-4">
                                            <label className="instagram"><FaInstagram/></label>&nbsp;&nbsp; <label> Instagram </label>
                                        </div>
                                        <hr/> 
                                        <div className="col-12 col-md-6 col-12 mt-4">
                                            <label className="twitter"><CiTwitter/></label>&nbsp;&nbsp; <label> Twitter</label>
                                        </div>
                                        <hr/>
                                        <div className="col-12 col-md-6 col-12 mt-4">
                                            <label className="github"><FaGithub/></label>&nbsp;&nbsp; <label> Github</label>
                                        </div>
                                        <hr/>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-7 shadow p-5 std-subDetails">
                                    <div className="">
                                        <b>Std Id</b>
                                        <span> {studentDetails.teacherDto.tid} </span>
                                    </div>
                                    <hr/>
                                    <div className="stdItem">
                                        <b>First Name</b>
                                        <span> {studentDetails.teacherDto.firstName}  </span>
                                    </div>
                                    <hr/>
                                    <div className="stdItem">
                                        <b>Last Name</b>
                                        <span> {studentDetails.teacherDto.lastName} </span>
                                    </div>
                                    <hr/>
                                    <div className="stdItem">
                                        <b>Last Education </b>
                                        <span> {studentDetails.teacherDto.education} </span>
                                    </div>
                                    <hr/>
                                    <div className="stdItem">
                                        <b>Contact Number</b>
                                        <span> {studentDetails.teacherDto.contact} </span>
                                    </div>
                                    <hr/>
                                    <div className="stdItem">
                                        <b>Email</b>
                                        <span> {studentDetails.teacherDto.email} </span>
                                    </div>                   
                                    <hr/>
                                    <div className="stdItem">
                                        <button className="btn btn-info px-5" onClick={()=>setTeacherDialog(!teacherDialog)}>Edit</button>
                                    </div>                                                     
                                </div>                    
                                </div>
                            </p>
                        </TabPanel>
                        <TabPanel header="Batch" className="px-4 py-2" rightIcon="pi pi-cog ml-2">
                        <p className="m-0">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-4 stdDetails shadow p-5">                        
                                        <div className="student-profile">
                                            <img class="text-center shadow-4-strong" alt="avatar2" src={`../batch/${studentDetails.batchDto.image}`} />
                                        </div>
                                        <div className="student-content">
                                            <h4 className="student-username"> {studentDetails.batchDto.batchTitle}</h4>
                                            <span className="student-courseName">{studentDetails.batchDto.duration}</span><br/>
                                            <span className="student-courseName"><IoMdTime/> {studentDetails.batchDto.time}</span><br/>
                                            <div className="btn-group mt-2">
                                                <button className="btn btn-primary"> Follow</button> &nbsp;
                                                <button className="btn btn-secondary hover"> Message </button>
                                            </div>
                                        </div>                        
                                        <hr/>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-7 shadow p-5 std-batch">
                                    <div className="">
                                        <b>Batch Id</b>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span> {studentDetails.batchDto.bid} </span>
                                    </div>
                                    <hr/>
                                    <div className="stdItem">
                                        <b>Duration </b>&nbsp;&nbsp;
                                        <span> {studentDetails.batchDto.duration}  </span>
                                    </div>
                                    <hr/>
                                    <div className="stdItem">
                                        <b>Start Date </b>
                                        <span> {studentDetails.batchDto.startDate} </span>
                                    </div>
                                    <hr/>
                                    <div className="stdItem">
                                        <b>End Date </b>&nbsp;&nbsp;
                                        <span> {studentDetails.batchDto.endDate} </span>
                                    </div>
                                    <hr/>                                   
                                    <div className="stdItem">
                                        <b>Status</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span> {studentDetails.batchDto.status} </span>
                                    </div>                   
                                    <hr/>
                                    <div className="stdItem">
                                        <b>Location</b>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span> {studentDetails.batchDto.location} </span>
                                    </div>                   
                                    <hr/>
                                    <div className="stdItem">
                                        <b>Batch Time</b>
                                        <span> {studentDetails.batchDto.time} </span>
                                    </div>                   
                                    <hr/>
                                    <div className="stdItem">
                                        <button className="btn btn-info px-5">Edit</button>
                                    </div>                                                     
                                </div>                    
                                </div>
                            </p>
                        
                        </TabPanel>
                    </TabView>  
                    </div>                                       
                </div>                
            </div>
            <Modal size="lg" isOpen={studentDialog} toggle={()=>setStudentDialog(!studentDetails)} className="batchModal">
            <ModalHeader toggle={()=>setStudentDialog(!studentDialog)} className="addBatchTitle"> Update Student </ModalHeader>
            <ModalBody className="modals" style={{background: 'linear-gradient(to bottom, #94bbe9, #ffffff)'}}>

                <Row>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter First Name </label>
                        <input type="text" name="firstName" defaultValue={studentDetails.firstName} onChange={(event)=>setFirstName(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter Last Name </label>
                        <input type="text" name="firstName" defaultValue={studentDetails.lastName} onChange={(event)=>setLastName(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter PassOut Year</label>
                        <input type="text" name="firstName" defaultValue={studentDetails.passoutYear} onChange={(event)=>setPassoutYear(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter Course Name</label>
                        <input type="text" name="firstName" defaultValue={studentDetails.courseName} onChange={(event)=>setCourseName(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter Last Education</label>
                        <input type="text" name="firstName" defaultValue={studentDetails.lastEducation} onChange={(event)=>setLastEducation(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12} className="mt-4">
                        <button className="btn btn-info px-5" onClick={()=>studentUpdate()}>Edit</button>
                    </Col>
                </Row> 
            </ModalBody>
          </Modal>          
        {
            teacherDialog && <TeacherUpdate componentUpdate={componentUpdate} tId={studentDetails.teacherDto.tid} status={teacherDialog} firstName={studentDetails.teacherDto.firstName} lastName={studentDetails.teacherDto.lastName} education={studentDetails.teacherDto.education} contact={studentDetails.teacherDto.contact} email={studentDetails.teacherDto.email}/>
        }
        </div>
    )
}
export default StudentDetails