import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import 'primereact/resources/themes/saga-blue/theme.css'; // or any other theme you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { MultiSelect } from 'primereact/multiselect';
import {Button} from 'primereact/button'
import { MdMarkEmailRead } from "react-icons/md";
import { Avatar } from 'primereact/avatar';
import { FaUserNurse } from "react-icons/fa";

const BatchDisplay=()=>{
    
    const params = useParams();
    const bId = params ? params.bId : null;
    const[name,setName]=useState("");
    const[batch,setBatch]=useState([]);   
    const[course,setCourse]=useState([]);
    const[teacher,setTeacher]=useState([]);
    const [selectedSkill, setSelectedSkills] = useState(null);
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
        <section className='batchDisplay'>
            <div className='container p-4'>
                <div className='row'>
                    <div className='col-12 col-md-6 col-sm-12 shadow py-5'>                        
                        <div className='row'>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <img className='w-100' src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg"></img>
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label><MdMarkEmailRead/> </label> &nbsp;
                                <small> ganeshs2987@gmail.com </small> <br/>
                                <label><FaUserNurse/></label> &nbsp;
                                <small>Ganesh Sakhare</small> <br/>                                                               
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
                                <label htmlFor="ms-cities">Select The Skills </label>
                                <FloatLabel className="w-full md:w-26rem custom-floatlabel-batch mt-1 form-control">                                
                                <MultiSelect value={selectedSkill} onChange={(e) => setSelectedSkills(e.value)} 
                                    options={skillSet} optionLabel="name" maxSelectedLabels={3} 
                                    panelClassName="custom-multiselect-panel-batch" style={{width:"auto"}} />                                
                                </FloatLabel>
                            </div>
                        </div>                        
                    </div>                    
                    <div className='col-12 col-md-6 col-sm-12 mt-2 shadow py-5'>
                        <div className='row'>                            
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <img className='w-100' src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg"></img>
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label><MdMarkEmailRead/> </label> &nbsp;
                                <small> ganeshs2987@gmail.com </small> <br/>
                                <label><FaUserNurse/></label> &nbsp;
                                <small>Ganesh Sakhare</small> <br/>                                                               
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">First Name</label>
                                <InputText id="username" readOnly="true" value='Ganesh' className='form-control'/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Last Name</label>
                                <InputText id="username" className='form-control' readOnly="true" value='Sakhare'/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Email</label>
                                <InputText id="username" className='form-control' readOnly="true" value='ganeshs2987@gmail.com'/>                                                                           
                            </div>
                            <div className='col-12 col-md-6 col-sm-12 mt-2'>
                                <label htmlFor="username">Contact</label>
                                <InputText id="username" className='form-control' readOnly="true" value='9595956150'/>                                                                           
                            </div>
                        </div>
                    </div>
                </div>                    
            </div>
        </section>                                     
    )
}
export default BatchDisplay