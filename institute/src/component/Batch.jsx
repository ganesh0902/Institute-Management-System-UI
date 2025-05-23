import { useState,useEffect, Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Modal ,ModalBody,ModalHeader,Row,Col, Input} from "reactstrap"
import Loader from './Loader';
import {saveBatchRecord,get_findByBatchTitleRecord,getBatchByInstitute,getTeacherIdAndNameByIdentityService} from '../apis/batchApis'
import {getCourseIdAndNameRecord} from '../apis/courseApis';

const token = localStorage.getItem('authToken');

const Batch=({instituteId})=>{

    const[fDate,setFDate]=useState("");
    const[tDate,setToDate]=useState("");    
    const[allBatches,setAllBatches]=useState([]);
    const[toggle,setToggle]=useState(false);
    const[pageLoad,setPageLoad]=useState(false);
    
    const[coursesIdAndName,setCoursesIdAndName]=useState([]);
    const[teacherIdAndName,setTeacherIdAndName]=useState([]);
    const[batchTitle,setBatchTitle]=useState("");
    const[duration,setDuration]=useState("");
    const[startDate,setStartDate]=useState("");
    const[endDate,setEndDate]=useState("");
    const[status,setStatus]=useState("");
    const[location,setLocation]=useState("");
    const[courseId,setCourserId]=useState(0);
    const[teacherId,setTeacherId]=useState(0);     
    const[time,setTime]=useState("10:30 PM");  
    const[searchByBatchTitle,setSearchByBatchTitle]=useState("");
    const [image, setImage] = useState("");
    const[loader,setLoader]=useState(false);      

    const saveBatch=async (batch)=>{        
         
        console.log("Batch is ",batch);
        await saveBatchRecord(batch);
        setToggle(!toggle)
        setPageLoad(!pageLoad);          
    }
        
      const saveImage = async (e) => {                        

        setLoader(true);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

    try {
        const response = await axios.post('http://localhost:8999/batch/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, 
        }
      });
      alert('File uploaded successfully.');      
      setImage(response.data);
    } catch (error) {
      alert('Failed to upload file.');
      console.error(error);      
    }
    finally{
        setLoader(false);
    }
      };

    useEffect(()=>{
        const getAllBatch=async ()=>{
                      
            allCourseIdAndName();
            //allTeacherIdAndName();       
            getTeacherIdAndNameByIdentityService();                 
            const response  = await getBatchByInstitute(instituteId);
            setAllBatches(response);           
        }
        getAllBatch();

        console.log("Institute Id is in Batch ",instituteId);
    },[])

    useEffect(()=>{
        const getAllBatch=async ()=>{
                                  
            const response  = await getBatchByInstitute(instituteId);
            setAllBatches(response);
        }
        getAllBatch();
    },[pageLoad])

    const allCourseIdAndName=async ()=>{

        const response = await getCourseIdAndNameRecord(instituteId);        
        setCoursesIdAndName(response);
    }

    const allTeacherIdAndName=async ()=>{
                
        const response  = await getTeacherIdAndNameByIdentityService(instituteId);
        setTeacherIdAndName(response);                
    }

    useEffect(()=>{
        console.log("Teacher Information");
        console.log(teacherIdAndName);
    },[teacherIdAndName])

    const findByBatch=async ()=>{
        if(searchByBatchTitle!="")
        {            
            const response  = await get_findByBatchTitleRecord();
            setAllBatches([]);
            setAllBatches(response);                       
    }
}
    const submit=()=>{

        const batch={batchTitle, duration, startDate, endDate, status, location,image, courseId, teacherId,time,instituteId};
        console.log(batch);        
        saveBatch(batch);
    }
    return(
        <Suspense fallback={<Loader/>}>
        <main className='main-container'>
            <div className="b-main-component">
                <div className="row course-header">
                    <div className="col-12 col-md-6 col-sm-12">
                        <input type="date" name="fDate" className="form-control mb-sm-2" placeholder="From Date" onChange={(event)=>setFDate(event.target.value)} />
                    </div>
                    <div className="col-12 col-md-6 col-sm-12">
                    <input type="date" name="tDate" className="form-control" placeholder="To Date" onChange={(event)=>setToDate(event.target.value)}/>
                    </div>
                    <div className="col-12 col-md-6 mt-2 col-sm-12">
                    <input type="text" name="name" className="form-control" onChange={(event)=>setSearchByBatchTitle(event.target.value)} placeholder="Enter Course Name"/>
                    </div>
                    <div className="col-12 col-md-6 mt-2 col-sm-12">
                        <button type="submit" name="Submit" className="btn btn-primary form-control" onClick={()=>findByBatch()}> Submit </button>
                    </div>
                    <NavLink to="" className="addNewCourse" onClick={()=>setToggle(!toggle)}>
                            Add New Batch
                    </NavLink>
                </div> 
                <div className='row w-100'>                                  
                {
                        allBatches.map((batch,index)=>(
                            <div className='col-12 col-md-4 col-sm-12 mb-2 mt-1'>                    
                            
                                <div className='card bg-white batchSubContainer'>
                                    <div className='card-body'>
                                        <div className=''>
                                        <NavLink to={`/bDetails/${batch.bid}`} className="batchCardLink"> 
                                            <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={`../batch/${batch.image}`}/>
                                        </NavLink>
                                        </div>
                                        <div className=''>
                                            <p className='bold mt-2 text-center'> {batch.batchTitle} </p>
                                            <div className=' mb-2'>
                                                <small className='pt-2 pb-2'> This is Course for Student Developer</small>
                                            </div>
                                            <div className='dateContainer'>
                                                <div className=''>
                                                    <p> Start Date</p>
                                                    <small> {batch.startDate}</small>
                                                </div>
                                                <div>
                                                    <p> End Date</p>
                                                    <small> {batch.endDate}</small>
                                                </div>
                                            </div>
                                            <div className='dateContainer mt-2'>
                                                <div>
                                                    <label>Status : {batch.status}</label>
                                                </div>
                                                <div>
                                                    <label>Duration : {batch.duration}</label>
                                                </div>
                                            </div>
                                            <div className='mt-2'>
                                                <span className='mt-3'> Change Status </span>
                                                <select className='form-control mt-2'>
                                                    <option value='1'> Select </option>
                                                    <option value='2'> Start </option>
                                                    <option value='3'> Cancel </option>
                                                    <option value='4'> Reschedule </option>
                                                    <option value='5'> Soon </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                                        
                            </div>                         
                        ))
                    }     
                </div>
            </div>
            <Modal size="lg" isOpen={toggle} toggle={()=>setToggle(!toggle)} className="batchModal">
                <ModalHeader toggle={()=>setToggle(!toggle)} className="addBatchTitle"> Add New Batch </ModalHeader>
                <ModalBody className="modals" style={{background: 'linear-gradient(to bottom, #94bbe9, #ffffff)'}}>                
                    <Row>
                        <Col lg={6} md={12} className=" mb-sm-2">
                            <label className='batchCl' htmlFor="batchTitle"> Enter Batch Title Name </label>
                            <input type="text" name="batchTitle" 
                            onChange={(event)=>setBatchTitle(event.target.value)} 
                            className='form-control' placeholder='Enter Batch Title Name'/>                            
                        </Col>
                        <Col lg={6} md={12} className=" batchCl mb-2">
                            <label className='batchCl' htmlFor="batchDuration"> Enter Batch Duration</label>
                            <input type="text" name="duration"                                                     
                            onChange={(event)=>setDuration(event.target.value)}
                            className='form-control' placeholder='Enter Batch Duration'/>                            
                        </Col>
                        <Col lg={6} md={12} className="batchCl mb-sm-2">
                            <label className='batchCl' htmlFor="startDate"> Select Start Date</label>
                            <input type="date" name="startDate"                             
                            onChange={(event)=>setStartDate(event.target.value)}
                            className='form-control'/>                            
                        </Col>
                        <Col lg={6} md={12} className=" batchCl mb-2">
                            <label className='batchCl' htmlFor="endDate"> Select End Date</label>
                            <input type="date" name="endDate"                            
                            onChange={(event)=>setEndDate(event.target.value)}
                            className='form-control'/>                            
                        </Col>        
                        <Col lg={6} md={12} className="batchCl mb-sm-2">
                            <label className='batchCl' htmlFor="status">Select  Status</label><br/>
                            <select name='status'                                
                                onChange={(event)=>setStatus(event.target.value)} 
                                 className='batchStatus form-control pt-2 pb-2' >
                                <option> Select </option>
                                <option> Pending </option>
                                <option> Started </option>
                                <option> Start Very Soon </option>                                
                            </select>                            
                        </Col>      
                        <Col lg={6} md={12} className="batchCl mb-3 mb-sm-2">
                            <label className='batchCl' htmlFor="course Name"> Location Name </label>
                            <input type="text" name="location"                                                        
                            onChange={(Event)=>setLocation(Event.target.value)}
                            className='form-control' placeholder='Enter Location Name '/>                            
                        </Col>  
                        <Col lg={6} md={12} className="batchCl mb-sm-2">
                            <label htmlFor="image"> Select Image for Batch </label>
                            <input type="file" required name="batchImage" className='form-control'  onChange={saveImage}/>                            
                                <div className='loader-loading'>
                                    {
                                    loader && <Loader/>
                                    }
                                </div>                            
                        </Col>
                        <Col lg={6} md={12} className="mb-3 mb-sm-2">
                            <label className='batchCl' htmlFor="teacher"> Select Teacher For Batch</label>
                            <select className='form-control pt-2 pb-2'                                
                                    name="teacherId"                                    
                                    onChange={(event)=>setTeacherId(event.target.value)}>
                                <option value='1'> Select </option>
                                {
                                    teacherIdAndName.map((result)=>(
                                        <option value={result.tid}>{result.firstName} {result.lastName} </option>
                                    ))
                                }
                            </select>                                                     
                        </Col>           
                        <Col lg={6} md={12} className="mb-sm-2">
                            <label  htmlFor="course"> Select Course For Batch </label>
                            <select className='form-control pt-2 pb-2'                                                                 
                                name="courseId"                                
                                onChange={(event)=>setCourserId(event.target.value)}
                                >
                                <option value="0"> Select </option>                                
                               {
                                coursesIdAndName.map((course,index)=>(
                                    <option value={course.courseId}> {course.courseName} </option>
                                ))
                               }
                            </select>                                       
                        </Col> 
                        <Col lg={6} md={12} className="batchCl  mb-sm-2">   
                            <label className='batchCl'> Select Time</label>                    
                            <input type="time" name="time"onChange={(event)=>setTime(event.target.value)} className='form-control'/>                            
                        </Col>                                             
                        <Col lg={6} md={12} className="batchCl mt-4 mb-sm-2">                        
                            <button type="submit" className='form-control btn btn-primary' onClick={()=>submit()}> Submit </button>
                        </Col>                                        
                    </Row>                    
                </ModalBody>
            </Modal>                   
        </main>
        </Suspense>
    )
}

export default Batch