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
import { Avatar } from 'primereact/avatar';
import { FileUpload } from 'primereact/fileupload';
import { FaUserNurse } from "react-icons/fa";
import 'primereact/resources/themes/saga-blue/theme.css';  // Import PrimeReact themes
import 'primereact/resources/primereact.min.css';          // Import PrimeReact CSS
import 'primeicons/primeicons.css';  

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
    useEffect(()=>{
        
        fetch(`http://localhost:9002/batch/`+bId).then(async (result)=>{

            await result.json().then((response)=>{
                setBatch(response);                                                      
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

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    return(        
        <section className='batchDisplay'>
            <div className='container p-4'>
                <div className='row'>                    
                    <div className='col-12 col-md-6 col-sm-12 mt-2 shadow pt-1'>
                        <div className='row'>                            
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../batch/${batch.image}`}/>
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label><MdMarkEmailRead/> </label> &nbsp;
                                <small> {batch.batchTitle} </small> <br/>
                                <label><FaUserNurse/></label> &nbsp; 
                                <small>{batch.time} </small> &nbsp;&nbsp;&nbsp;
                                <label><FaUserNurse/></label> &nbsp;
                                <small>02:50 </small> <br/>                                                                
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Batch Name</label>
                                <InputText id="username" readOnly="true" value={batch.batchTitle} className='form-control'/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username"> Duration </label>
                                <InputText id="username" className='form-control' readOnly="true" value={batch.duration}/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">STart Date</label>
                                <InputText id="username" className='form-control' readOnly="true" value={batch.time}/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">End Date</label>
                                <InputText id="username" className='form-control' readOnly="true" value='02:30'/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Location</label>
                                <InputText id="username" className='form-control' readOnly="true" value={batch.location}/>                                                                           
                            </div>                                                        
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Update File </label>
                                <FileUpload   
                                onUpload={onUpload}                                                                                           
                                className='fileUploaderBatch'                                 
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-sm-12 shadow pt-1'>                        
                        <div className='row'>                            
                            <div className='col-12 col-md-6 col-sm-12 mt-3'>
                                <img className='w-100' src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg"></img>
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label><MdMarkEmailRead/> </label> &nbsp;
                                <small> ganeshs2987@gmail.com </small> <br/>
                                <label><FaUserNurse/></label> &nbsp;
                                <small>Ganesh Sakhare</small>                                                                                              
                            </div>                            
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Course Name</label>
                                <InputText id="username" className='form-control' readOnly="true" value='Java Development'/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username"> Description </label>
                                <InputText id="username" className='form-control' readOnly="true" value='This course is for Java Developer'/> 
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username"> Fees </label>
                                <InputText id="fees" variant="filled" className='form-control' readOnly="true" value='Rs 2000'/> 
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Select Teacher</label><br/>
                                <Dropdown value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.value)} options={teachers} optionLabel="name" 
                                    placeholder="Select a City" style={{width:"100%"}} className="p-2"/>
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="ms-cities">Select The Skills </label>
                                <FloatLabel className="w-full md:w-26rem custom-floatlabel-batch mt-1 form-control">                                
                                <MultiSelect value={selectedSkill} onChange={(e) => setSelectedSkills(e.value)} 
                                    options={skillSet} optionLabel="name" maxSelectedLabels={3} 
                                    panelClassName="custom-multiselect-panel-batch" style={{width:"auto"}} />                                
                                </FloatLabel>
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-4'>
                                <Button label="Submit" className='btn px-2 form-control updateBatchBtn'  icon="pi pi-check" loading={loading} onClick={load} 
                                />
                            </div>
                        </div>                        
                    </div>                    
                </div>                    
            </div>
        </section>                                     
    )
}
export default BatchDisplay