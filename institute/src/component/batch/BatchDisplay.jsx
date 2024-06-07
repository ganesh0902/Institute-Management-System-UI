import React from 'react'
import { Toast } from 'primereact/toast';
import { useState,useRef } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import 'primereact/resources/themes/saga-blue/theme.css'; // or any other theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Modal ,ModalBody, ModalHeader, Row,Col, Input} from "reactstrap"
import {Button} from 'primereact/button'
import { MdMarkEmailRead } from "react-icons/md";
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { FaUserNurse } from "react-icons/fa";
import 'primereact/resources/themes/saga-blue/theme.css';  // Import PrimeReact themes
import 'primereact/resources/primereact.min.css';          // Import PrimeReact CSS
import 'primeicons/primeicons.css';  
import axios from 'axios';

const BatchDisplay=()=>{
    
    const params = useParams();
    const bId = params ? params.bId : null;
    const[name,setName]=useState("");
    const[batch,setBatch]=useState([]);   
    const[course,setCourse]=useState([]);
    const[teacher,setTeacher]=useState([]);
    const [selectedSkill, setSelectedSkills] = useState(null);
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);

    const[batchTitle,setBatchTitle]=useState("");
    const[duration,setDuration]=useState("");
    const[startDate,setStartDate]=useState("");
    const[endDate,setEndDate]=useState("");
    const[status,setStatus]=useState("");
    const[location,setLocation]=useState("");
    const[courseId,setCourserId]=useState(0);
    const[teacherId,setTeacherId]=useState(0);     
    const[time,setTime]=useState("10:30 PM");  
    const[updateDialog,setUpdateDialog]=useState(false);
    
    useEffect(()=>{        
        fetch(`http://localhost:9002/batch/`+bId).then(async (result)=>{

            await result.json().then((response)=>{
                setBatch(response);    
                
                batch.map((result)=>{
                    setBatch(result.teacherId);
                    setCourserId(result.courseId);
                })
            })
        })

    },[bId]);

    useEffect(()=>{

    },[batch]);

    const skillSet = [
        { name: 'Java', id: 'NY' },
        { name: 'Spring boot', id: 'RM' },
        { name: 'Hibernate', id: 'LDN' },
        { name: 'Microservices', id: 'IST' },
        { name: 'Reactjs', id: 'PRS' }
    ];

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const teachers = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    useEffect(()=>{        
        const {course}=batch;
        setCourse(course);
        const {teacherDto}=batch;
        setTeacher(teacherDto);        
              
    },[batch]);
    if (!course) {
        return <div>Loading...</div>; // Return loading indicator if course is not available yet
      }

      const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };    

    const makeReadOnly = () => {
        setIsReadOnly(!isReadOnly);        
    };

    const load = () => {
        setLoading(true);
        //updateBatch();
        setTimeout(() => {
            setLoading(false);
            
        }, 2000);
    };

    const updateBatch=()=>{              

        const batchDto={bId,batchTitle, duration, startDate, endDate, status, location, teacherId, courseId};

        console.log(batchDto);
    }   

    return(        
        <section className='batchDisplay'>
            <div className='container p-4'>
                <div className='row'>                    
                    <div className='col-12 col-md-6 col-sm-12 mt-2 shadow pt-1'>
                        <div className='row'>                                                    
                            <div className='col-12 col-md-12 col-sm-12 mt-2 batch-profile-in-batchDisplay'>
                                <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../batch/${batch.image}`}/>
                            </div>                           
                            <div className='col-12 col-md-12 col-sm-12 mt-2 mb-3 text-center'>
                                <label><MdMarkEmailRead/> </label> &nbsp;
                                <small> {batch.batchTitle} </small>  &nbsp;&nbsp;
                                <i className="pi pi-pencil" onClick={()=>setUpdateDialog(!updateDialog)} style={{ fontSize: '1em',cursor:"pointer" }}></i>                                                                                           
                            </div>                            
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Batch Name : </label> &nbsp;
                                <small>{batch.batchTitle}</small>
                                <hr/>                                
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username"> Duration :</label> &nbsp;
                                <small>{batch.duration}</small>
                                <hr/>                                
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Start Date :</label> &nbsp;
                                <small>{batch.startDate}</small>
                                <hr/>                                
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">End Date :</label>&nbsp;
                                <small>{batch.endDate}</small>
                                <hr/>
                                
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Location :</label> &nbsp;
                                <small>{batch.location}</small>
                                <hr/>                                
                            </div>                                                                                
                            {/* <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Update File </label>
                                <FileUpload   
                                onUpload={onUpload}                                                                                           
                                className='fileUploaderBatch'                                 
                                />
                            </div>                             */}
                            {/* <div className='col-12 col-md-6 col-sm-12 mt-2 mb-4'>
                                <label htmlFor="username">Select Teacher</label><br/>
                                <Dropdown value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.value)} options={teachers} optionLabel="name" 
                                    placeholder="Select a City" style={{width:"100%"}} className="p-2"/>
                            </div> */}
                            {/* <div className='col-12 col-md-6 col-sm-12 mt-4'>
                                {   !isReadOnly &&
                                    <Button label="Submit" className='btn px-2 form-control updateBatchBtn'  icon="pi pi-check" loading={loading} onClick={()=>updateBatch()} />                            
                                }
                            </div> */}
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-sm-12 shadow '>                        
                        <div className='row m-3'>                            
                            <div className='col-12 col-md-12 col-sm-12 justify-content-center teacher-profile-in-batchDisplay'>
                                <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../teacher/${teacher.image}`}/>                                
                            </div>                            
                             <div className='col-12 col-md-12 col-sm-12 text-center'>
                                <label className='mt-2 mb-1'><MdMarkEmailRead/> </label> &nbsp;
                                <small className='text-bold'> {teacher.email} </small>                                
                            </div>  
                            <div className='col-12 col-md-6 col-sm-12 mt-4'>
                                <label htmlFor="username">First Name :</label> &nbsp;
                                <small>{teacher.firstName}</small>
                                <hr/>
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-4'>
                                <label htmlFor="username">First Name : </label> &nbsp;
                                <small>{teacher.lastName}</small>
                                <hr/>
                            </div>                          
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Education : </label>&nbsp;
                                <small>{teacher.education}</small>
                                <hr/>
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Contact : </label>&nbsp;
                                <small>{teacher.contact}</small>
                                <hr/>
                            </div>
                            <div className='col-12 col-md-8 col-sm-12 mt-2'>
                                <label htmlFor="username"> Email :</label>&nbsp;
                                <small>{teacher.email}</small>
                                <hr/>
                            </div>                                                       
                        </div>                        
                    </div>                    
                </div>                    
            </div>

            <Modal size="lg" isOpen={updateDialog} toggle={()=>setUpdateDialog(!updateDialog)} className="batchModal">
                <ModalHeader toggle={()=>setUpdateDialog(!updateDialog)} className="addBatchTitle"> Update Batch </ModalHeader>
                <ModalBody className="modals" style={{background: 'linear-gradient(to bottom, #94bbe9, #ffffff)'}}>
                <Row>
                    <Col lg={6} md={12}>
                        <label className='batchCl' htmlFor="batchTitle"> Enter Batch Title Name </label>
                        <input type="text" name="firstName" defaultValue={batch.batchTitle} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label className='batchCl' htmlFor="batchTitle"> Enter Batch Duration </label>
                        <input type="text" name="firstName" defaultValue={batch.duration} />
                    </Col>
                    <Col lg={6} md={12} className="mt-2">
                        <label className='batchCl' htmlFor="batchTitle"> Enter Batch Start Date </label>
                        <input type="date" name="firstName" className='form-control' defaultValue={batch.startDate} />
                    </Col>
                    <Col lg={6} md={12} className="mt-2">
                        <label className='batchCl' htmlFor="batchTitle"> Enter Batch End Date </label>
                        <input type="date" name="firstName" className='form-control' defaultValue={batch.endDate} />
                    </Col>
                    <Col lg={6} md={12} className="mt-2">
                        <label className='batchCl' htmlFor="batchTitle"> Enter Location </label>
                        <input type="text" name="firstName" defaultValue={batch.location} />
                    </Col>
                    <Col lg={6} md={12} className="mt-2">
                        <label className='batchCl' htmlFor="batchTitle"> Select Teacher </label>
                        <input type="text" name="firstName" defaultValue={batch.location} />
                    </Col>
                    <Col lg={6} md={12} className="mt-4">
                        <button className='btn btn-primary form-control'> Submit </button>
                    </Col>
                </Row>                                    
                </ModalBody>
            </Modal>    
        </section>                                     
    )
}
export default BatchDisplay