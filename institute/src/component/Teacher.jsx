import { Link, NavLink } from 'react-router-dom';
import { FaPhone } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { Modal ,ModalBody,ModalHeader,Row,Col, Input} from "reactstrap"
import { useState } from 'react';
import { ModalTitle } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import {saveTeacherRecord,getTeacherByInstitute,saveTeacher} from '../apis/teacherApis'

const Teacher=({instituteId})=>{

    const token = localStorage.getItem('authToken');

    const[addTeacher,setAddTeacher]=useState(false);    
    const[firstName,setFirstName]=useState('');
    const[lastName,setLastName]=useState('');
    const[contact,setContact]=useState('');
    const[email,setEmail]=useState('');
    const[education,setEducation]=useState('');
    const[teachers,setTeacher]=useState([]);
    const[image,setImage]=useState("");
   

    useEffect(()=>{
        
       const getTeacher=async ()=>{
        const response  = await getTeacherByInstitute(instituteId);
        setTeacher(response);
       }            
       getTeacher();
       
    },[])

    useEffect(()=>{
        
        const getTeacher=async ()=>{
            const response  = await getTeacherByInstitute(instituteId);
            setTeacher(response);
        }
        getTeacher();

    },[addTeacher])

    const submit=async  ()=>{
              
        const password="t123";
        const role="TEACHER";
        const name= firstName+lastName;
        const teacherCredential={name, email,password,role,instituteId};       
       
        const credentialId = await saveTeacher(teacherCredential);

        alert("Credential Id "+credentialId);
        const teacher={firstName,lastName,contact,email,education,image,instituteId,credentialId }; 
        await saveTeacherRecord(teacher);

        alert("Teacher Added Successfully");
        setAddTeacher(!addTeacher)        
    }    

    const saveImage=async (event)=>{

       const formData= new FormData();
       formData.append("file",event.target.files[0]);
       
       try{
            const response= await axios.post(`http://localhost:8999/teacher/image`, formData ,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization':`Bearer ${token}`
                }
            });
            alert('File uploaded successfully.'); 
            setImage(response.data);
            console.log(response.data); 
       }catch(e)
       {
        alert('Failed to upload file.');
        console.error(e);   
       }
    }
   
    return(
        <main className='main-container'>
            <div className='t-container shadow'>
                <div className='row'>
                    <div className='col-12 col-md-6 col-sm-12 field'>
                        <input type="text" name="teacher-name" className='form-control' placeholder='Enter Teacher Name'/>
                    </div>
                    <div className='col-12 col-md-6 col-sm-12 field'>
                        <input type="text" name="course-name" className='form-control' placeholder='Enter Course Name'/>
                    </div>                    
                    <div className='col-12 col-md-6 col-sm-12 mt-2 field'>
                        <button className='btn btn-primary form-control searchBtn'> Search </button>
                    </div>
                    <div className='col-12 col-md-6 col-sm-12 mt-2 field'>
                        <button className='btn text-white' onClick={()=>setAddTeacher(!addTeacher)}> Add new Teacher </button>
                    </div>
                </div>
            </div> 
            <div className='teacher-card-container mt-4'>
                <div className='row'>
                    {
                        teachers.map((teacher,index)=>(
                            <div className='col-12 col-md-4 col-sm-12 col-lg-4 tCard'>
                                <NavLink to={`/tDetails/${teacher.tid}`}>
                                <div className='card bg-white ' > 
                                    <div className=' tCard-body'>                                
                                    <div className='rounded'>
                                    {/* <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../uploader/${batch.image}`}/> */}
                                    <img class="card-img-top rounded teacher-image-in-teacher-list" src={`../teacher/${teacher.image}`} alt="Card image cap" />
                                    </div>
                                    <div className='mt-1 teacher-details'>
                                        <label className='tDetails '><FaUserNurse className='tIcon'/> Mr. {teacher.firstName} {teacher.lastName} </label> <br/>
                                        <label className='tDetails'> <MdOutlineCastForEducation className='tIcon'/> {teacher.education} </label> <br/>
                                        <label className='tDetails'><MdMarkEmailRead className='tIcon'/> {teacher.email} </label><br/>
                                        <label className='tDetails'> <FaPhone className='tIcon'/> {teacher.contact} </label>
                                    </div>                            
                                    </div>
                                </div>
                                </NavLink>
                            </div>
                        ))
                    }                    
                </div>
            </div>  
            <Modal size='lg' isOpen={addTeacher} toggle={()=>setAddTeacher(!addTeacher)} className="teacherModal">
                <ModalHeader toggle={()=>setAddTeacher(!addTeacher)} className="addTeacherTitle">
                    <ModalTitle className='tHeaderTitle'> Add New Teacher </ModalTitle>
                </ModalHeader>
                <ModalBody className='modals' style={{background: 'linear-gradient(to bottom, #94bbe9, #ffffff)'}}>                    
                        <Row>
                            <Col lg={6} md={12} className=" mb-sm-2">
                            <label> First Name </label>
                                <input type="text" className='form-control' name="firstName" placeholder='Enter First Name' onChange={(event)=>setFirstName(event.target.value)}/>
                            </Col>

                            <Col lg={6} md={12} className=" mb-sm-2">
                                <label> Last Name </label>
                                <input type="text" className='form-control' name="lastName" placeholder='Enter Last Name' onChange={(event)=>setLastName(event.target.value)}/>
                            </Col>  
                            <Col lg={6} md={12} className=" mb-sm-2">
                                <label> Last Education </label>
                                <input type="text" className='form-control' name="education" placeholder='Enter Last Education ' onChange={(event)=>setEducation(event.target.value)}/>
                            </Col>
                            <Col lg={6} md={12} className=" mb-sm-2">
                                <label> Contact Number </label>
                                <input type="text" className='form-control' name="contact" placeholder='Contact Number' onChange={(event)=>setContact(event.target.value)}/>
                            </Col>
                            <Col lg={6} md={12} className=" mb-sm-2">
                                <label> Enter Email </label>
                                <input type="text" className='form-control' name="email" placeholder='Email' onChange={(event)=>setEmail(event.target.value)}/>
                            </Col>
                            <Col lg={6} md={12} className=" mb-sm-2">
                                <label> Add Image </label>
                                <input type="file" className='form-control py-2' name="image" placeholder='add Image' onChange={saveImage}/>
                            </Col>
                            <Col lg={12} className="mt-2">                                
                                <button className='btn btn-primary form-control' onClick={submit}> Submit </button>                                
                            </Col>                            
                        </Row>                    
                </ModalBody>
            </Modal>        
        </main>
    )
}
export default Teacher