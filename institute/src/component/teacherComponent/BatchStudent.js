import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import a from '..//..//images/back1.jpg';
import './css/BatchStudent.css'
import Chatting from './Chatting'
import {getStudentByBatchId, saveAssignment} from '../../apis/studentApis'
import Loader from "../Loader";
import { Editor } from "primereact/editor";
import { Modal ,ModalBody,ModalHeader,Row,Col} from "reactstrap"

const BatchStudent=({teacherId})=>{

    const[students,setStudents]=useState([]);
    const[openDialog,setOpenDialog]=useState(false);
    const[load,setLoad]=useState(true);    
    const[Description,setDescription]=useState("");
    const[studentId,setStudentId]=useState("");

    const params = useParams();
    const bId = params ? params.bId : null;
    
    const[assignment,setAssignment]=useState({

        description:"",
        title:"",
        endDate:"",
        time:"",
        batchId:bId,
        teacherId:teacherId
    });

    const linkStyle = {
        margin: "50px 0px 0px -30px",
        padding: "0px 10px 00px 20px",                 
        width:"100%", 
                      
    };
               
    useEffect(()=>{

        const getStudents=async ()=>{            
        try
        {         
            const data =  await getStudentByBatchId(bId);
            console.log(data);
            setStudents(data);
        }   
        catch(error)
        {
            console.log("Something went wrong while fetching student by batchId");
        }
        finally{
            setLoad(false);
        }
        }
        getStudents();
    },[])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setAssignment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {        
        
        assignment.description=Description;   
        console.log(Description);     
        console.log("Assignment is ");        
        console.log(assignment);    

        alert(teacherId);
        await saveAssignment(assignment);

        alert("Record Save Successfully");
        setOpenDialog(false);
        setDescription("");
        resetAssignment();       
    };

    useEffect(()=>{

        console.log("Student Id is ");
        console.log(studentId);
    },[studentId]);


    const resetAssignment = () => {
        setAssignment({
            description: "",
            title: "",
            endDate: "",
            time: "",
            batchId: bId, 
            teacherId:teacherId
        });
    };

    
    if(load)
    {
        return(<Loader/>)
    }

    return(
        <div style={linkStyle}>
            <div id="batchStudent" className="row">                
                <div className="col-12 col-sm-12 col-md-4 ">                
                    <div className="row">
                        <div className="col-6 col-sm-6 col-md-6">
                            <label> Student List</label>
                        </div>                   
                        <div className="col-6 col-sm-6 col-md-6">
                            <button className="assignment" onClick={(()=>setOpenDialog(!openDialog))}> Add Assignment </button>
                        </div>                                 
                        <div className="col-12 col-sm-12 col-md-12 shadow scroll mt-3">                           
                        {
                        students.map((student,index)=>(                            
                            <div className="studentList">                                
                                <div>
                                    <img src={a} alt=""/>
                                </div>
                                <div>
                                     <button className="btn form-control chat-btn" onClick={()=>setStudentId(student.stdId)}> {student.firstName} &nbsp; {student.lastName} </button> <br/> 
                                    <small className="text-decoration-none"> Java Development Batch</small>                                  
                                </div>                                
                            </div>                                
                            ))
                        }
                        </div>                         
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-8 shadow">
                    
                    {
                        studentId && <Chatting stdId={studentId}/>
                    }                    
                                            
                </div>
            </div>    
            <Modal size="lg" isOpen={openDialog} toggle={()=>setOpenDialog(!openDialog)}>
                    <ModalHeader toggle={()=>setOpenDialog(!openDialog)} style={{backgroundColor:"#F5F7F8"}}>
                        Add Assignment
                    </ModalHeader>                    
                    <ModalBody className="modals" style={{backgroundColor:"#DDE6ED"}}>
                        <Row>
                            <Col lg={6} sm={12}>
                                <label> Add Title For Assignment</label>
                                <input type="input" className="form-control"  placeholder="Add Title" value={assignment.title} name="title" onChange={handleInputChange}/>
                            </Col>
                            <Col>
                                <label> Add End Date </label>
                                <input type="date" className="form-control" placeholder="Add Time" value={assignment.endDate} name="endDate" onChange={handleInputChange} />
                            </Col>
                            <Col>
                                <label> Add Time Date </label>
                                <input type="time" className="form-control" placeholder="Add End Time" value={assignment.time} name="time" onChange={handleInputChange} />
                            </Col>
                            <Col lg={12} sm={12}>
                                <label className="mt-3"> Add Description</label>                                
                                <div className="bg-dark">
                                    <Editor value={Description} name="description"  style={{ height: '320px' }} className="bg-dark shadow mt-2" onTextChange={(e)=> setDescription(e.htmlValue)}/>
                                </div>
                            </Col>
                            <Col lg={6} sm={12}>
                                <div className="btn-container">
                                    <button type="submit" className="btn btn-primary form-control mt-3" onClick={() => handleSubmit()}>Add</button>
                                </div>
                            </Col>
                        </Row>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default BatchStudent