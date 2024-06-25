import { useState,useEffect } from 'react';
import axios from 'axios';
import { Modal ,ModalBody,ModalHeader,Row,Col, Input} from "reactstrap"
import {Formik,Form,Field,ErrorMessage, useFormik} from 'formik'
import * as Yup from 'yup';
import e from 'cors';
import DataTable from 'react-data-table-component';
import { BsPencil, BsTrash, BsEye } from 'react-icons/bs';
import Swal from 'sweetalert2'
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import { MultiSelect } from 'primereact/multiselect';
import { FloatLabel } from 'primereact/floatlabel';                
import {Button} from 'primereact/button'
import {getAllCoursesRecord, saveCourseRecord} from '../apis//courseApis';

const CourseSchema =Yup.object().shape({
    courseName:Yup.string().required("course Name is Mandatory"),
    description:Yup.string().required("Description is mandatory"),
    skills:Yup.string().required("Skills is mandatory"),
    fees:Yup.string().required("Fees is Mandatory")
});

const Course =()=>{

    const [loading, setLoading] = useState(false);
    const[fDate,setFDate]=useState("");
    const[tDate,setToDate]=useState("");
    const[course,setCourse]=useState("");
    const[click,setClick]=useState(0);
    const[addCourse,setNewCourse]=useState(false);
    
    const[courseName,setCourseName]=useState("");
    const[description,setDescription]=useState("");
    const[skills,setSkills]=useState("");
    const[fees,setFees]=useState(0);    
    const[updateToggle,setUpdateToggle]=useState(false);        
   const[allCourses,setAllCourses]=useState([]);
    const API_SAVE_COURSE="http://localhost:8999/course/";
    const[apiError,setApiError]=useState("");        
    const[courseNames,setCourseNames]=useState("");    
    const [selectedSkill, setSelectedSkills] = useState(null);
    const[updatedCourse,setUpdatedCourse]=useState(null);    
    
    const skillSet = [
        { name: 'Java', id: 'NY' },
        { name: 'Spring boot', id: 'RM' },
        { name: 'Hibernate', id: 'LDN' },
        { name: 'Microservices', id: 'IST' },
        { name: 'Reactjs', id: 'PRS' }
    ];

    const initialValues = {
        courseName: '',
        description: '',
        skills: '',
        fees:""
      };

    useEffect(()=>{
 
        const getAllCourse=async ()=>{
                      
            const response  = await getAllCoursesRecord();
            setAllCourses(response);
        }
        getAllCourse();
    },[]);
        
    useEffect(() => {
        const getAllCourse=async ()=>{
                      
            const response  = await getAllCoursesRecord();
            setAllCourses(response);
        }
        getAllCourse();
      }, [addCourse]);

      const submit = () => {
        
        
    };
    const saveCourse=async (course)=>{        
      
        try{
            const response= await saveCourseRecord(course);            
            console.log("Course Save Successfully");
            alert("Course Save Successfully");
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
    
      const {values,handleBlur,handleChange,handleSubmit,errors} = useFormik({
        initialValues,
        validationSchema:CourseSchema,
        onSubmit:(value=>{
            saveCourse(value);
        }),
      });
  
      const search=async ()=>{     
         if(courseNames!="")
         {
        await fetch(`http://localhost:8999/course/getCourseByName/`+courseNames).then((result)=>{

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
            setUpdatedCourse(json);                
            setUpdateToggle(!updateToggle);               
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
        const newData=allCourses.filter(row=>{
            return row.courseName.toLowerCase().includes(event.target.value.toLowerCase());
        })
        setAllCourses(newData);
      }      
    
      const load = () => {  //   load method will be call when submit button is click
        setLoading(true);        
        var allSkills=selectedSkill.map(skills=> skills.name);
        const skills=allSkills.join(",");                
        const cid=updatedCourse.cid;
        var course={cid, courseName, description, fees, skills};                                        
        saveCourse(course);
        setNewCourse(false);
        setUpdateToggle(false);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
       
    //   }
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
        <Modal size='lg' isOpen={updateToggle} toggle={()=>setUpdateToggle(!updateToggle)} className="batchModal">
            <ModalHeader toggle={()=>setUpdateToggle(!updateToggle)} className="addBatchTitle"> Update Course</ModalHeader>                
            <Row className='m-1'>
                <Col lg={6} md={12} className="mb-sm-2">
                    <label> Enter Course Name  </label>                                        
                    <InputText type="text" variant="filled" name="courseName" placeholder="Course" defaultValue={updatedCourse && updatedCourse.courseName} onChange={(even)=>setCourseName(even.target.value)} className='p-inputtext-xl text-dark'/>                    
                </Col>
                <Col lg={6} md={12} className="mb-sm-2">
                    <label className='text-2'> Enter Course Description  </label>
                    <InputText type="text" variant="filled"  placeholder="First Name" defaultValue={updatedCourse && updatedCourse.description} onChange={(even)=>setDescription(even.target.value)} className='p-inputtext-xl text-dark'/>                    
                </Col>
                <Col lg={6} md={12} className="mb-sm-2 mt-2">
                    <label className='text-2'> Skills </label>
                    <InputText type="text" variant="filled"  placeholder="Select Skills"  defaultValue={updatedCourse && updatedCourse.skills} onChange={(even)=>setSkills(even.target.value)} className='p-inputtext-xl text-dark'/>                    
                </Col>                
                <Col lg={6} md={12} className="mb-sm-2 mt-2">
                    <label className='text-2'> Fees </label>
                    <InputText type="text" variant="filled"  placeholder="Enter Fees" defaultValue={updatedCourse && updatedCourse.fees} onChange={(even)=>setFees(even.target.value)} className='p-inputtext-xl text-dark'/>                    
                </Col>
                <Col lg={12} md={12} className="mb-sm-2 mt-4">               
                    <FloatLabel className="w-full md:w-26rem custom-floatlabel">
                    <MultiSelect value={selectedSkill} onChange={(e) => setSelectedSkills(e.value)} 
                        options={skillSet} optionLabel="name" maxSelectedLabels={3} 
                        panelClassName="custom-multiselect-panel" className="w-full" />
                    <label htmlFor="ms-cities">Select Skills</label>
                    </FloatLabel>
                </Col>
                <Col lg={12} md={12} className="mb-sm-2 mt-4">               
                    <Button label="Submit" className='primeButton' icon="pi pi-check"  loading={loading} onClick={load} />
                </Col>
            </Row>
        </Modal>                                       
        </main>
    )
}
export default Course