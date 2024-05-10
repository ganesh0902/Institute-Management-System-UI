import { useState,useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {saveCourse} from '../apis/apiServices'
import axios from 'axios';
import { Modal ,ModalBody,ModalHeader,Row,Col, Input} from "reactstrap"
import {Formik,Form,Field,ErrorMessage, useFormik} from 'formik'
import * as Yup from 'yup';
import e from 'cors';

const CourseSchema =Yup.object().shape({
    courseName:Yup.string().required("course Name is Mandatory"),
    description:Yup.string().required("Description is mandatory"),
    skills:Yup.string().required("Skills is mandatory"),
    fees:Yup.string().required("Fees is Mandatory")
});

const Course =()=>{

    const[fDate,setFDate]=useState("");
    const[tDate,setToDate]=useState("");
    const[course,setCourse]=useState("");
    const[click,setClick]=useState(0);
    const[addCourse,setNewCourse]=useState(false);
    
    const[courseName,setCourseName]=useState("");
    const[description,setDescription]=useState("");
    const[skills,setSkills]=useState("");
    const[fees,setFees]=useState(0);
        
   const[allCourses,setAllCourses]=useState([]);
    const API_SAVE_COURSE="http://localhost:9001/course/";
    const[apiError,setApiError]=useState("");    

    const[courseNames,setCourseNames]=useState("");

    const initialValues = {
        courseName: '',
        description: '',
        skills: '',
        fees:""
      };

    useEffect(()=>{
 
        const getAllCourse=()=>{
                      
            fetch(`http://localhost:9001/course/`).then((result)=>{

            result.json().then((resp)=>{
                console.log("Course response is ",resp);
                setAllCourses(resp);
                
            })
            })
        }
        getAllCourse();
    },[]);

    useEffect(() => {
        const getAllCourse=()=>{
                      
            fetch(`http://localhost:9001/course/`).then((result)=>{

            result.json().then((resp)=>{
                console.log("Course response is ",resp);
                setAllCourses(resp);
                
            })
            })
        }
        getAllCourse();
      }, [addCourse]);

      const submit = () => {
        
        setClick(click+1);
    };
    const saveCourse=async (course)=>{        
      
        try{
            const response= await axios.post(`${API_SAVE_COURSE}`,course);            
            console.log("Course Save Successfully");
            alert("Course Save Successfully");
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
    
      const {values,handleBlur,handleChange,handleSubmit,errors} = useFormik({
        initialValues,
        validationSchema:CourseSchema,
        onSubmit:(value=>{
            saveCourse(value);
        }),
      });
  
      const search=()=>{     
         if(courseNames!="")
         {
        fetch(`http://localhost:9001/course/getCourseByName/`+courseNames).then((result)=>{

        result.json().then((response)=>{

            setAllCourses([]);            
            setAllCourses(response);                     
        })
        })
        }   
        else{
            setNewCourse(!addCourse);
        }
      }
    return(
        <main className='main-container'>
            <div className="c-main-component ">
                <div className="row course-header">
                    <div className="col-12 col-md-6 col-sm-12 mb-2">
                        <input type="date" name="fDate" className="form-control" placeholder="From Date" onChange={(event)=>setFDate(event.target.value)} />
                    </div>
                    <div className="col-12 col-md-6 col-sm-12">
                        <input type="date" name="tDate" className="form-control" placeholder="To Date" onChange={(event)=>setToDate(event.target.value)}/>
                    </div>
                    <div className="col-12 col-md-6 mt-2 col-sm-12">
                        <input type="text" name="courseName" className="form-control" placeholder="Enter Course Name" onChange={(event)=>setCourseNames(event.target.value)} />
                    </div>
                    <div className="col-12 col-md-6 mt-2 col-sm-12">
                        <button type="submit" name="Submit" className="btn btn-primary form-control" onClick={()=>search()}> Submit </button>
                    </div>
                   <NavLink to="" className="addNewCourse" onClick={()=>setNewCourse(!addCourse)}>
                        Add New Course
                   </NavLink>
                </div>   
                <div className="row mt-4" >                    
                {
                    allCourses.map((course,index)=>(
                        <div className="col-12 col-md-3 mb-2" key={index}>                   
                            <Link to={`/cDetails/${course.cid}`} className="navLink">
                                <div className="card  bg-white shadow mt-2" onClick={()=>submit()}>                        
                                    <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img(20).webp" alt="Card image cap" />
                                        <div className="card-body card-container">
                                        <div className='cHeading'>
                                            <h6 class="card-title mt-2">{course.courseName}</h6>                                                                                                                                                                                  
                                            <small className='text-end date'>{course.lastUpdatedDate}</small>                                                                                        
                                        </div>       
                                        <div>
                                            <small> {course.description} </small>
                                        </div>                                     
                                    </div>                        
                                </div>
                            </Link>
                        </div> 
                    ))
                }                                                                   
                </div>
            </div>
            <Modal size="lg" isOpen={addCourse} toggle={()=>setNewCourse(!addCourse)} className="batchModal">
                <ModalHeader toggle={()=>setNewCourse(!addCourse)} className="addBatchTitle"> Add New Batch </ModalHeader>
                <ModalBody className="modals" style={{background: 'linear-gradient(to bottom, #94bbe9, #ffffff)'}}>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={6} md={12} className="mb-sm-2">
                            <label htmlFor="Course Name" >Course Name </label>
                            <input type="text"
                                className="form-control bg-white"
                                name='courseName'
                                placeholder="Enter Course Name" 
                                value={values.courseName} onBlur={handleBlur} 
                                onChange={handleChange}/>  
                             <small> {errors.courseName && errors.courseName} </small>
                        </Col>
                        <Col lg={6} md={12} className="mb-sm-2">
                            <label htmlFor='Description'>Description {errors.description && <span className='text-danger text-medium'> * </span>}</label>
                            <input type="text"
                                className="form-control bg-white"
                                name="description"
                                placeholder='Enter Course Description'
                                value={values.description} onBlur={handleBlur} 
                                    onChange={handleChange} />
                                <small> {errors.description && errors.description} </small> 
                        </Col>
                        <Col lg={6} md={12} className="mb-sm-2">
                            <label htmlFor='Skills '>Skills {errors.skills && <span className='text-danger text-medium'> * </span>} </label>
                            <input type="text"
                                className="form-control bg-white"
                                name='skills'
                                placeholder='Enter Skills Separated By comma'
                                value={values.skills} onBlur={handleBlur} 
                                    onChange={handleChange}/>
                                <small> {errors.skills && errors.skills} </small>  
                        </Col>
                        <Col lg={6} md={12} className="mb-sm-2">
                        <label htmlFor='Fees'>Fees {errors.fees && <span className='text-danger text-medium'> * </span>}</label>
                            <input type="text"
                                name='fees'
                                className="form-control bg-white"
                                placeholder='Enter Fees' 
                                value={values.fees} onBlur={handleBlur} 
                                    onChange={handleChange}/>
                                <small> {errors.fees && errors.fees} </small>
                        </Col>
                        <Col lg={6} md={12} className="mb-sm-2 mt-2">
                            <button className='form-control btn btn-primary'> Submit </button>
                        </Col>
                    </Row>
                </form>
                </ModalBody>
            </Modal>                            
        </main>
    )
}
export default Course