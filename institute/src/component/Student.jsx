import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Modal ,ModalBody,ModalHeader,Row,Col, Input} from "reactstrap"
import {useFormik} from 'formik'
import axios from 'axios';
import * as Yup from 'yup';
const Student=() =>{

  const [formData, setFormData] = useState({
    studentName: '',
    courseName: '',
    status: ''  
  });
  const[stdId,setId]=useState(1);
  const[student,setStudent]=useState([]);
  const[addStudent,setAddStudent]=useState(false);

  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const[passoutYear,setPassoutYear]=useState("");
  const[lastEducation,setLastEducation]=useState("");
  const[courseName,setCourseName]=useState("");
  const[batchId,setBatchId]=useState('');
  const[batchTitleAndDate,setBatchTitleAndDate]=useState([]);
  const[image,setImage]=useState("");

  const save_student="http://localhost:9004/student/";  

  const studentSchema=Yup.object().shape({    
    firstName:Yup.string().required("First Name is mandatory"),
    lastName:Yup.string().required("LastName is mandatory"),
    passoutYear:Yup.string().required("LastPass Out Year is mandatory"),
    lastEducation:Yup.string().required("Last Education is mandatory"),     
    batchId:Yup.string().required("Batch is mandatory"),
    image: Yup.mixed().nullable()    
});

const initialValues={
  firstName:"",
  lastName:"",
  passoutYear:"",  
  lastEducation:"",  
  batchId:"" 
}
const studentSave=()=>{

  const data={firstName, lastName, passoutYear, lastEducation, batchId, image};
  const response=axios.post(`${save_student}`,data);   
  console.log(data);
  alert("Student Save Successfully");
  setAddStudent(!addStudent);
}
const {values,handleBlur,handleChange,handleSubmit,errors} = useFormik({
  initialValues,
  validationSchema:studentSchema,
  onSubmit:(value=>{
      studentSave(value);      
  }),
});

  const search = () => {        
    if(formData.studentName!="")
    {
      fetch(`http://localhost:9004/student/filter/`+formData.studentName).then((result)=>{
        result.json().then((response)=>{
          setStudent([]);
          setStudent(response);
        })        
      },[])    
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
    fetch("http://localhost:9004/student/").then((result)=>{
      result.json().then((response)=>{
        setStudent(response);
      })
    })    
  },[]);

  useEffect(()=>{    
    getBatchTitleAndDate();
    fetch("http://localhost:9004/student/").then((result)=>{
      result.json().then((response)=>{
        setStudent(response);
      })
    })    
  },[addStudent]);

  const getBatchTitleAndDate=(()=>{    
    fetch("http://localhost:9002/batch/batchTitleAndDate").then((result)=>{
    result.json().then((response)=>{

      console.log(response);
      setBatchTitleAndDate(response);
    })
    })
  })

  const saveImage=async (event)=>{

    const formData=new FormData();    
    formData.append("file",event.target.files[0]);

    try{
      const response= await axios.post(`http://localhost:9004/student/image`, formData ,{
          headers:{
              'Content-Type': 'multipart/form-data'
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
                <div className=''>                   
                   <img class="card-img-top rounded teacher-image-in-teacher-list" src={`../student/${student.image}`} alt="Card image cap" />
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
          <ModalHeader toggle={()=>setAddStudent(!addStudent)} className="addBatchTitle"> Add New Batch </ModalHeader>
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
                                 className='batchStatus form-control pt-2 pb-2' >
                                <option value=''> Select Batch </option>
                                {
                                  batchTitleAndDate.map((batch,index)=>(
                                    <option key={index} value={batch.bid}> {batch.batchTitle} {batch.startDate} </option>
                                  ))
                                }                                                                
                            </select>
                            <small>{errors.batchId && errors.batchId}</small>
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
export default Student