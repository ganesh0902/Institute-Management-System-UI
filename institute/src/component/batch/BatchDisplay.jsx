import React from 'react'
import { Toast } from 'primereact/toast';
import { useState,useRef } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css'; // or any other theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Modal ,ModalBody, ModalHeader, Row,Col, Input} from "reactstrap"
import { MdMarkEmailRead } from "react-icons/md";
import 'primereact/resources/themes/saga-blue/theme.css';  // Import PrimeReact themes
import 'primereact/resources/primereact.min.css';          // Import PrimeReact CSS
import 'primeicons/primeicons.css';  
import {getTeachersNameAndIds} from '../../apis/teacherApis'
import {updateBatch} from '../../apis/batchApis'
import {getCourserNameAndId} from '../../apis/courseApis'

import { Dropdown } from 'primereact/dropdown';
import Loader from '../Loader';
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
    const [loadingTeacher, setLoadingTeacher] = useState(true);

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
    const[teachersName,setTeachersName]=useState([]);
    const[updateComponent,setUpdateComponent]=useState(false);

    useEffect(()=>{        
        fetch(`http://localhost:8999/batch/`+bId).then(async (result)=>{

            await result.json().then((response)=>{
                setBatch(response);                                   
            })
        })
        teacherName();        
    },[bId,updateComponent]);

    useEffect(()=>{        
        const {course}=batch;
        setCourse(course);
        const {teacherDto}=batch;
        setTeacher(teacherDto);                              
    },[batch,teachersName]);  
   
       
    const teacherName=async ()=>{

        setLoadingTeacher(true);
        try
        {
        const response = await getTeachersNameAndIds();        
        setTeachersName(response);        
        }
        catch(error)
        {
            console.log(error);
        }
        finally{
            setLoadingTeacher(false);
        }
    }

    const getCourserName=async ()=>{

        const response  = await getCourserNameAndId();
        console.log(response);
        setCourse(response);
    }
    
    const batchUpdate=async ()=>{              

        try
        {
            const batchDto={bId,batchTitle, duration,time, startDate, endDate, status, location, teacherId, courseId};
            console.log(batchDto);
            await updateBatch(bId,batchDto);
            alert("batch Updated Successfully");
            setUpdateDialog(!updateDialog);            
            setUpdateComponent(!updateComponent);
            // getBatch();
        }
        catch(error)
        {
            console.log("Something went wrong");
        }
    }   

    if(loadingTeacher)
    {
        return(<Loader/>)
    }
    if (!course) {
        return <Loader/>; // Return loading indicator if course is not available yet
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
                                <label htmlFor="username"> Time :</label> &nbsp;
                                <small>{batch.time}</small>
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
                        <input type="text" name="batchTitle" defaultValue={batch.batchTitle} onChange={(event)=>setBatchTitle(event.target.value)}/>
                    </Col>
                    <Col lg={6} md={12}>
                        <label className='batchCl' htmlFor="batchDuration"> Enter Batch Duration </label>
                        <input type="text" name="firstName" defaultValue={batch.duration} onChange={(event)=>setDuration(event.target.value)}/>
                    </Col>
                    <Col lg={6} md={12} className="mt-2">
                        <label className='batchCl' htmlFor="batchEndDate"> Enter Batch Start Date </label>
                        <input type="date" name="firstName" className='form-control' defaultValue={batch.startDate} onChange={(event)=>setStartDate(event.target.value)}/>
                    </Col>
                    <Col lg={6} md={12} className="mt-2">
                        <label className='batchCl' htmlFor="batchStartDate"> Enter Batch End Date </label>
                        <input type="date" name="firstName" className='form-control' defaultValue={batch.endDate} onChange={(event)=>setEndDate(event.target.value)}/>
                    </Col>
                    <Col lg={6} md={12} className="mt-2">
                        <label className='batchCl' htmlFor="batchLocation"> Enter Location </label>
                        <input type="text" name="firstName" defaultValue={batch.location}  onChange={(event)=>setLocation(event.target.value)}/>
                    </Col>       
                    <Col lg={6} md={12} className="mt-2">
                        <label className='batchCl' htmlFor="batchTime"> Select Time </label>
                        <input type="time" name="time" defaultChecked={batch.time}  onChange={(event)=>setTime(event.target.value)} className='form-control'/>                            
                    </Col>            
                    <Col lg={6} md={12} className="mt-2">
                        <label className='batchCl' htmlFor="batchStatus"> Enter Batch Status </label>
                        <input type="text" name="firstName" readOnly defaultValue={batch.status} onChange={(event)=>setStatus(event.target.value)}/>
                    </Col>                    
                    <Col lg={6} md={12} className="mt-2">
                        <label className='batchCl' htmlFor="teacherName"> Select Teacher </label>
                        <select className='form-control pt-2 pb-2' onChange={(event)=>setTeacherId(event.target.value)}>
                          <option value={batch.teacherId}>{batch.teacherDto.firstName}</option>  
                       {
                            teachersName.map((result)=>(
                                <option value={result.teacherId}>{result.teacherName} </option>
                            ))
                       }
                       </select>                                
                    </Col>
                    <Col lg={6} md={12} className="mt-4">
                        <button className='btn btn-primary form-control' onClick={()=>batchUpdate()}> Submit </button>
                    </Col>
                </Row>                                    
                </ModalBody>
            </Modal>    
        </section>                                     
    )
}
export default BatchDisplay