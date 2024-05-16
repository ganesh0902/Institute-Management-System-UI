import { useState,useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {saveCourse} from '../apis/apiServices'
import axios from 'axios';
import { Modal ,ModalBody,ModalHeader,Row,Col, Input} from "reactstrap"
import {Formik,Form,Field,ErrorMessage, useFormik} from 'formik'
import * as Yup from 'yup';
import e from 'cors';
import DataTable from 'react-data-table-component';

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
            sortable:true
        },
        {
            name:"Last Updated Date",
            selector:row=>row.lastUpdatedDate,
            sortable:true
        },
        {
            name:"Action",
            selector:row=>row.Action,
            sortable:true
        }
      ]

      const data=[
        {
            courseName:"python Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002",            
        },
        {
            courseName:"sql Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"android Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"power BI Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        },
        {
            courseName:"Java Development",
            description:"This is course for Java Development",
            skills:"Java, Spring boot, Hibernate",
            fees:"2000",
            lastUpdatedDate:"02/09/2002"
        }
                

      ]

      const[records,setRecords]=useState(data);

      const handleFilter=(event)=>{
        const newData=data.filter(row=>{
            return row.courseName.toLowerCase().includes(event.target.value.toLowerCase());
        })
        setRecords(newData);
      }
    return(
        <main className='main-container-course'>
            <div className="c-main-component ">                               
            <div className='containers' style={{paddingTop:"10px"}}>
                <div>
                <div style={{float:"right"}}> <input type="text" placeholder='Enter Course Name' onChange={handleFilter}></input> </div>
                <DataTable columns={column}
                            data={data}
                            selectableRows                            
                            fixedHeader   
                            pagination
                            paginationPerPage={5} // items per page
                            paginationRowsPerPageOptions={[5, 10, 15]} // available per page options                                                                                                 
                            ></DataTable>
                </div>
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