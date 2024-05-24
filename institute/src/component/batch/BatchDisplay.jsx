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
import { MultiSelect } from 'primereact/multiselect';
import { RiLockPasswordFill } from "react-icons/ri";
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

        // const save_batch="http://localhost:9002/batch/";
        //       const response=axios.post(`${save_batch}`,batchDto);              
        //       alert("Batch Updated Successfully");
        //       console.log(response.data);
        //       console.log(batch);           
    }

    return(        
        <section className='batchDisplay'>
            <div className='container p-4'>
                <div className='row'>                    
                    <div className='col-12 col-md-6 col-sm-12 mt-2 shadow pt-1'>
                        <div className='row'>                                                    
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../batch/${batch.image}`}/>
                            </div>                           
                            <div className='col-12 col-md-6 col-sm-12 mt-2 text-center'>
                                <label><MdMarkEmailRead/> </label> &nbsp;
                                <small> {batch.batchTitle} </small>  &nbsp;&nbsp;
                                <i className="pi pi-pencil" onClick={()=>makeReadOnly()} style={{ fontSize: '1em',cursor:"pointer" }}></i>                                                                                           
                            </div>                            
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Batch Name</label>
                                <InputText id="username" readOnly={isReadOnly} value={batch.batchTitle}  onChange={(even)=>setBatchTitle(even.target.value)} className='form-control'/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username"> Duration </label>
                                <InputText id="username" className='form-control' readOnly={isReadOnly} defaultValue={batch.duration} onChange={(event)=>setDuration(event.target.value)}/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Start Date</label>
                                <InputText id="username" className='form-control' readOnly={isReadOnly} defaultValue={batch.startDate} onChange={(even)=>setStartDate(even.target.value)}/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">End Date</label>
                                <InputText id="username" className='form-control' readOnly={isReadOnly} defaultValue={batch.endDate} onChange={(event)=>setEndDate(event.target.value)}/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Location</label>
                                <InputText id="username" className='form-control' readOnly={isReadOnly} value={batch.location}/>                                                                           
                            </div>                                                        
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Update File </label>
                                <FileUpload   
                                onUpload={onUpload}                                                                                           
                                className='fileUploaderBatch'                                 
                                />
                            </div>                            
                            <div className='col-12 col-md-6 col-sm-12 mt-2 mb-4'>
                                <label htmlFor="username">Select Teacher</label><br/>
                                <Dropdown value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.value)} options={teachers} optionLabel="name" 
                                    placeholder="Select a City" style={{width:"100%"}} className="p-2"/>
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-4'>
                                {   !isReadOnly &&
                                    <Button label="Submit" className='btn px-2 form-control updateBatchBtn'  icon="pi pi-check" loading={loading} onClick={()=>updateBatch()} />                            
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-sm-12 shadow pt-1'>                        
                        <div className='row'>                            
                            <div className='col-12 col-md-6 col-sm-12 mt-3'>
                                <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../teacher/${teacher.image}`}/>                                
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label><MdMarkEmailRead/> </label> &nbsp;
                                <small> {teacher.email} </small> <br/>
                                <label><FaUserNurse/></label> &nbsp;
                                <small>{teacher.firstName} &nbsp; {teacher.lastName}</small>                                                                                              
                            </div>                            
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Education</label>
                                <InputText id="username" className='form-control' readOnly="true" value={teacher.education}/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username"> Contact </label>
                                <InputText id="username" className='form-control' readOnly="true" value={teacher.contact}/> 
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username"> Email </label>
                                <InputText id="fees" variant="filled" className='form-control' readOnly="true" value={teacher.email}/> 
                            </div>                           
                            {/* <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="ms-cities">Select The Skills </label>
                                <FloatLabel className="w-full md:w-26rem custom-floatlabel-batch mt-1 form-control">                                
                                <MultiSelect value={selectedSkill} onChange={(e) => setSelectedSkills(e.value)} 
                                    options={skillSet} optionLabel="name" maxSelectedLabels={3} 
                                    panelClassName="custom-multiselect-panel-batch" style={{width:"auto"}} />                                
                                </FloatLabel>
                            </div>                             */}
                        </div>                        
                    </div>                    
                </div>                    
            </div>
        </section>                                     
    )
}
export default BatchDisplay