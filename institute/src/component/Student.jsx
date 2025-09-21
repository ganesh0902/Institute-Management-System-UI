import React, { Suspense } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Modal ,ModalBody,ModalHeader,Row,Col, Input} from "reactstrap"
import axios from 'axios';
import Loader from "../component/Loader"
import {saveStudent} from '../apis/studentApis'
import {searchStudent,getBatchTileAndDateRecord,getStudentRecordByInstitute} from '../apis/studentApis'

const StudentContent=({instituteId}) =>{

  const [formData, setFormData] = useState({
    studentName: '',
    courseName: '',
    status: ''  
  });
  
  const[student,setStudent]=useState([]);
  const[addStudent,setAddStudent]=useState(false);

  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const[passoutYear,setPassoutYear]=useState("");
  const[lastEducation,setLastEducation]=useState("");  
  const[batchId,setBatchId]=useState('');
  const[batchTitleAndDate,setBatchTitleAndDate]=useState([]);
  const[image,setImage]=useState("");

  const token = localStorage.getItem('authToken');

//const instituteId = localStorage.getItem("instituteId");

const studentSave=async ()=>{

  const data={firstName, lastName, passoutYear, lastEducation, batchId, image, instituteId};
  
  const response = await saveStudent(data);

  console.log(data);
  alert("Student Save Successfully");
  setAddStudent(!addStudent);
}

  const search = async () => {        
    if(formData.studentName!=="")
    {
      const filterResult = await searchStudent(formData);
      setStudent(filterResult);
    }
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(()=>{    
    getBatchTitleAndDate();
    
    const getStudent=async ()=>{
      
      if(instituteId===0)
      {
        return"Loading...";
      }
      const response  = await getStudentRecordByInstitute(instituteId);
      setStudent(response);
    }
    getStudent();

    console.log("Institute Id is in student ",instituteId);
    
  },[]);

  useEffect(()=>{

    getBatchTitleAndDate();
    
    const getStudent=async ()=>{
      
      if(instituteId===0)
      {
        return"Loading...";
      }
      const response  = await getStudentRecordByInstitute(instituteId);
      setStudent(response);
    }
    getStudent();

    console.log("Institute Id is in student ",instituteId);
  },[student]);

  useEffect(()=>{    
    getBatchTitleAndDate();
    
    const getStudent=async ()=>{
      if(instituteId===0)
      {
        return"Loading...";
      }
      const response  = await getStudentRecordByInstitute(instituteId);
      setStudent(response);
    }
    getStudent();
  },[addStudent]);

  const getBatchTitleAndDate=(async ()=>{    
    
    const response = await getBatchTileAndDateRecord(instituteId);
    console.log("Batch title and date ");
    console.log(response);
    setBatchTitleAndDate(response);
  });

  const saveImage=async (event)=>{

    const formData=new FormData();    
    formData.append("file",event.target.files[0]);

    try{
      const response= await axios.post(`http://localhost:8999/student/image`, formData ,{
          headers:{
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`, 
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

  return (
    <div className='container mt-2'>
      <div className='stdContainer'>
        <div className='row stdHeader m-2'>
          <div className='col-12 col-sm-12 col-md-4'>
            <div>
              <input type="text" name="courseName" className='form-control' 
                                placeholder='Enter Course Name' onChange={handleInputChange}  />
            </div>
          </div>
          <div className='col-12 col-sm-12 col-md-4 stdField'>
            <select className='dropdown p-2' name='status' onChange={handleInputChange} >
              <option className='item'> Status</option>
              <option className='item'> Completed</option>
              <option className='item'> On </option>
              <option className='item'> Cancel</option>              
            </select>
            </div>
          <div className='col-12 col-sm-12 col-md-4'>
            <input type="text" name="studentName" className='form-control stdField'
                               placeholder='Enter Student Name' onChange={handleInputChange}  />
          </div>        
          <div className='col-12 col-sm-12 col-md-4 mt-2'>
            <button type='button' className='btn btn-primary form-control' onClick={()=>setAddStudent(!addStudent)}> Add New Student </button>
          </div>
          <div className='col-12 col-sm-12 col-md-4 mt-2'>
            <button className='btn btn-primary form-control stdField' onClick={search}> Search</button>
          </div>
        </div>
        <div className='row m-2'>  
          {
            student.map((student,index)=>(
              <div className='col-12 col-sm-12 col-md-4 shadow mt-2'>
                <NavLink to={`/stdDetails/${student.stdId}`} className="stdNavLink">
                <div className='stdprofile'>                   
                   <img class="card-img-top rounded h-5" src={`../student/${student.image}`} alt="Card image cap" />
                </div>
                <div className='stdCard'>
                   <label> Username </label> <small> {student.firstName} &nbsp; {student.lastName} </small>                 
                   <label> Pass Out Year </label><small> {student.passoutYear} </small>
                   <label> Last Education </label><small> {student.lastEducation} </small>
                   <label> Course Name </label><small> {student.courseName}</small>
                </div>
                </NavLink>
              </div> 
              ))
            }                                                                 
        </div>
      </div>

      <Modal size="lg" isOpen={addStudent} toggle={()=>setAddStudent(!addStudent)} className="batchModal">
          <ModalHeader toggle={()=>setAddStudent(!addStudent)} className="addBatchTitle"> Add New Student </ModalHeader>
          <ModalBody className="modals" style={{background: 'linear-gradient(to bottom, #94bbe9, #ffffff)'}}>
          
                <Row>
                <Col lg={6} md={12} className="batchCl mb-sm-2">
                    <label  htmlFor="firstName"> Enter First Name </label>
                    <input type="text" name="firstName" 
                          onChange={(e)=>setFirstName(e.target.value)} 
                          className='form-control' placeholder='Enter First Name  Name'/>                          
                  </Col>
                  <Col lg={6} md={12} className="batchCl mb-sm-2">
                    <label  htmlFor="lastName"> Enter Last Name </label>
                    <input type="text" name="lastName" 
                          onChange={(event)=>setLastName(event.target.value)} 
                          className='form-control' placeholder='Enter Last  Name'/>                                                    
                  </Col>
                  <Col lg={6} md={12} className="batchCl mb-sm-2">
                    <label  htmlFor="passOutYear"> Enter Pass Out Year </label>
                    <input type="text" name="passoutYear" 
                          onChange={(event)=>setPassoutYear(event.target.value)} 
                          className='form-control' placeholder='Enter Pass Out year'/>                                              
                  </Col>
                  <Col lg={6} md={12} className="batchCl mb-sm-2">
                    <label  htmlFor="lastEducation"> Enter Last Education </label>
                    <input type="text" name="lastEducation"
                          onChange={(event)=>setLastEducation(event.target.value)} 
                          className='form-control' placeholder='Enter Last Education'/>                                              
                  </Col>
                  <Col lg={6} md={12} className="batchCl mb-sm-2">
                    <label  htmlFor="image"> Upload Image </label>                                                                                
                    <input type="file" className='form-control py-2' name="image" placeholder='add Image' onChange={saveImage}/>
                  </Col>
                  <Col lg={6} md={12} className="batchCl mb-sm-2">
                            <label  htmlFor="status">Select  Batch</label><br/>
                            <select name='batchId'                                
                                onChange={(event)=>setBatchId(event.target.value)} 
                                 className='batchStatus form-control pt-2 pb-2 text-black' >
                                <option value=''> Select Batch </option>
                                {
                                  batchTitleAndDate.map((batch,index)=>(
                                    <option key={index} value={batch.bid}> {batch.batchTitle} {batch.startDate} </option>
                                  ))
                                }                                                                
                            </select>                            
                  </Col>                       
                  <Col lg={6} md={12} className="batchCl mt-4 mb-sm-2">                        
                            <button type="submit" className='form-control btn btn-primary' onClick={studentSave}> Submit </button>
                  </Col>   
              </Row>                    
          </ModalBody>
      </Modal>
    </div>
  )
}


const Student=({instituteId})=>{

  return (
      <Suspense fallback={<Loader />}>
        <StudentContent instituteId={instituteId} />
      </Suspense>
    );
}

export default Student