import { useState,useEffect, Suspense } from 'react';
import { Modal ,ModalBody,ModalHeader,Row,Col, Input} from "reactstrap"
import * as Yup from 'yup';
import e from 'cors';
import DataTable from 'react-data-table-component';
import { BsPencil, BsTrash, BsEye } from 'react-icons/bs';
import Swal from 'sweetalert2'
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
import {Button} from 'primereact/button'
import { Editor } from "primereact/editor";
import {getAllCoursesRecord, saveCourseRecord} from '../apis//courseApis';
import Loader from './Loader';

const CourseContent =({instituteId})=>{
    
    const[addCourse,setNewCourse]=useState(false);    
    const[courseName,setCourseName]=useState("");
    const[courseId,setCourseId]=useState(0);
    const[fees,setFees]=useState(0);    

    const[updateToggle,setUpdateToggle]=useState(false);        
   const[allCourses,setAllCourses]=useState([]);    
    const[apiError,setApiError]=useState("");            
    
    const[updatedCourse,setUpdatedCourse]=useState(null);       
    const [topics, setTopics] = useState([{ topicName: '', content: '' }]);
    
    const skillSet = [
        { name: 'Java', id: 'NY' },
        { name: 'Spring boot', id: 'RM' },
        { name: 'Hibernate', id: 'LDN' },
        { name: 'Microservices', id: 'IST' },
        { name: 'Reactjs', id: 'PRS' }
    ];
   

    const handleTopicChange = (index, event) => {
        const { name, value } = event.target;
        const newTopics = [...topics];
        newTopics[index][name] = value;
        setTopics(newTopics);
    };

    const addTopic = () => {
        setTopics([...topics, { topicName: '', content: '' }]);
    };
      
    useEffect(()=>{
 
        const getAllCourse=async ()=>{                         
            const response  = await getAllCoursesRecord(instituteId);
            console.log("Course Response is ",response);
            setAllCourses(response);     
            console.log("Institute Id is in course ",instituteId);
        }
        getAllCourse();
    },[]);
        
    useEffect(() => {
        const getAllCourse=async ()=>{
                      
            const response  = await getAllCoursesRecord(instituteId);
            setAllCourses(response);
        }
        getAllCourse();
      }, [addCourse]);
      
    const saveCourse=async (course)=>{        
      
        try{
            const response= await saveCourseRecord(course);            
            console.log("Course Save Successfully");
            alert("Course Save Successfully");
            console.log(response);
            setNewCourse(false);
            setUpdatedCourse(false);
            setNewCourse(!addCourse);
        }
        catch(error)
        {
            if(error.response)
            {
                console.error('Server Error:', error.response.data);
                setApiError(error.response.data);
            }
            else if(error.request)
            {
                console.error('No response received:', error.request);
                setApiError(error.request);
            }
            else{
                console.error('Error:', error.message);
                setApiError(error.message);
            }
        }                           
    }               

      const column=[
        {
            name:"Course Name",
            selector:row=>row.courseName,
            sortable:true
            
        },
        {
            name:"Description",            
            selector:row=>row.description,
            sortable:true
        },
        {
            name:"Skills",            
            selector:row=>row.skills,
            sortable:true
        },
        {
            name:"Fees",            
            selector:row=>row.fees,
            sortable:true,
            width:'100px'
        },
        {
            name:"Last Updated Date",
            selector:row=>row.lastUpdatedDate,
            sortable:true,
            width:'110px'
        },  
        {
            name:"Institute Id",
            selector:row=>row.instituteId,
            sortable:true,
            width:'110px'
        },        
        {
            name: 'Action',
            cell: row =>(
                <div className='courseButtons' >
                    <BsPencil className="courseUpdate" onClick={() => updateCourse(row)} />
                    <BsTrash className="courseDelete" onClick={() => deleteRecord(row)} />
                    <BsEye className="courseView" onClick={() => updateCourse(row)} />
                </div>
            ),            
            button: true,
            width:'280px'
          },
      ];
     
      const updateCourse = (json) => {                               
        setCourseName(json.courseName);
        setCourseId(json.cid);
        setFees(json.fees);
        setTopics(json.topics || [{ topicName: '', content: '' }]); // Set existing topics
        setUpdatedCourse(json);                
        setUpdateToggle(true);               
        console.log(JSON.stringify(json));
        console.log(topics);
    };

     const deleteRecord=(row)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your record has been deleted.",
                icon: "success"
              });
            }
          });
     } 

      const handleFilter=(event)=>{
        const newData=allCourses.filter(row=>{
            return row.courseName.toLowerCase().includes(event.target.value.toLowerCase());
        })
        setAllCourses(newData);
      }               

    const handleSubmit1 = () => {
        const courseData = {
            // courseName: document.querySelector('input[name="courseName"]').value,
            // fees: document.querySelector('input[name="fees"]').value,
            courseName: courseName,
            fees: fees,

            instituteId: instituteId, // received instituteId By props
            topics: topics.map(topic => ({
                topicName: topic.topicName,
                content: topic.content
            }))
        };        
        saveCourse(courseData);
    }

    const handleUpdateSubmit = () => {
        const updatedCourseData = {
            courseName: courseName,
            cid:courseId,
            fees: fees,
            instituteId: instituteId, 
            topics: topics.map(topic => ({
                topicName: topic.topicName,
                content: topic.content
            }))
        };
        
        saveCourse(updatedCourseData);
        setUpdateToggle(false);  // Close the modal after successful update
    };
               
    return(
        <main className='main-container-course'>
            <div className="c-main-component ">                               
            <div className='containers' style={{paddingTop:"10px"}}>                
                <div style={{float:"right"}}> <input type="text" placeholder='Enter Course Name' onChange={handleFilter}></input> </div>
                <div style={{float:"right"}}> <button className="btn btn-primary p-2 pl-3 mt-1" onClick={()=>setNewCourse(!addCourse)}> Add new Course </button></div>          
                <DataTable 
                    columns={column} 
                    data={allCourses}
                    fixedHeader
                    >                    
                </DataTable>      
           
            </div>                                
            </div>
            <Modal size="xl" isOpen={addCourse} toggle={()=>setNewCourse(!addCourse)} className="batchModal">
                <ModalHeader toggle={()=>setNewCourse(!addCourse)} className="addBatchTitle"> Add New Course </ModalHeader>
                <ModalBody className="modals" style={{background: 'linear-gradient(to bottom, #94bbe9, #ffffff)'}}>
                
                    <Row>
                        <Col lg={4} md={12} className="mb-sm-2">
                            <label htmlFor="Course Name" >Enter Course Name </label>
                            <input type="text"
                                className="form-control bg-white"
                                name='courseName'
                                placeholder="Enter Course Name" 
                                onChange={(e)=>setCourseName(e.target.value)}
                                required
                                />                               
                        </Col>                        
                       
                        <Col lg={4} md={12} className="mb-sm-2">
                        <label htmlFor="Course Name" >Enter Course Fees  </label>
                            <input type="text"
                                name='fees'
                                className="form-control bg-white"
                                placeholder='Enter Fees' required
                                onChange={(e)=>setFees(e.target.value)}
                                />                                
                        </Col>
                        <Col lg={4} md={12} className="mb-sm-2 mt-4">
                            <button className='form-control btn btn-primary' onClick={()=>handleSubmit1()} > Submit </button>
                        </Col>                        
                        <>
                        {topics.map((topic, index) => (
                            <div key={index}>
                                <Col lg={12} sm={12}>
                                    <label className="mt-3">Add Topic Name</label>                                
                                    <div className="bg-dark">
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Enter Topic Name'
                                            name="topicName"
                                            value={topic.topicName}
                                            onChange={(event) => handleTopicChange(index, event)}
                                            required
                                        />
                                    </div>
                                </Col>

                                <Col lg={12} sm={12}>
                                    <label className="mt-3">Add Description</label>                                
                                    <div className="bg-dark">
                                        <Editor
                                            value={topic.content}
                                            name="content"
                                            style={{ height: '320px' }}
                                            className="bg-dark shadow mt-2"
                                            onTextChange={(e) => handleTopicChange(index, { target: { name: 'content', value: e.htmlValue } })} // Use the correct method for the editor
                                            required
                                        />
                                    </div>
                                </Col>
                            </div>
                        ))}
                        <Col lg={12} md={12} className="mb-sm-2 mt-2 text-center">
                            <button className='btn btn-primary w-5' onClick={addTopic}>Add New Topic</button>
                        </Col>
                    </>
                    </Row>                
                </ModalBody>
            </Modal>   

    <Modal size='xl' isOpen={updateToggle} toggle={() => setUpdateToggle(!updateToggle)} className="batchModal">
    <ModalHeader toggle={() => setUpdateToggle(!updateToggle)} className="addBatchTitle"> Update Course</ModalHeader>                
    <Row className='m-1'>
        <Col lg={6} md={12} className="mb-sm-2">
            <label> Course Name  </label>                                        
            <InputText 
                type="text" 
                name="courseName" 
                placeholder="Course" 
                value={courseName} 
                onChange={(e) => setCourseName(e.target.value)} 
                className='p-inputtext-xl text-dark' 
            />                    
        </Col>
        <Col lg={6} md={12} className="mb-sm-2 ">
            <label className='text-2'> Fees  </label>
            <InputText 
                type="text" 
                name="fees" 
                placeholder="Enter Fees" 
                value={fees} 
                onChange={(e) => setFees(e.target.value)} 
                className='p-inputtext-xl text-dark' 
            />                    
        </Col>                                  
    
    {topics.map((topic, index) => (
        <div key={index} className="d-flex justify-content-center align-items-center flex-column">
            <Col lg={10} sm={12}>
                <label className="mt-3">Topic Name</label>                                
                <div className="bg-dark">
                    <InputText
                        type='text'
                        className='form-control'
                        placeholder='Enter Topic Name'
                        name="topicName"
                        value={topic.topicName}
                        onChange={(event) => handleTopicChange(index, event)}
                    />
                </div>
            </Col>
            <Col lg={10} sm={12} >
                <label className="mt-4">Topic Content</label>                                
                <div className="bg-dark ">
                    <Editor
                        value={topic.content}
                        name="content"
                        style={{ height: '320px'}}
                        className="bg-dark shadow mt-2"
                        onTextChange={(e) => handleTopicChange(index, { target: { name: 'content', value: e.htmlValue } })}
                    />
                </div>
            </Col>
        </div>
        ))}    
    <Col lg={12} md={12} className="mb-sm-2 mt-2 text-center">
        <Button label="Submit" className='primeButton' icon="pi pi-check" onClick={handleUpdateSubmit} />
    </Col>
    </Row>
    </Modal>
</main>
    )
}

const Course=({instituteId})=>{

    return (
        <Suspense fallback={<Loader />}>
          <CourseContent instituteId={instituteId} />
        </Suspense>
      );
}

export default Course