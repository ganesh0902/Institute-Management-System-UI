import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import a from '..//..//images/back1.jpg';
import './css/BatchStudent.css'
import { NavLink } from "react-router-dom";
import Chatting from './Chatting'
import {getStudentByBatchId} from '../../apis/studentApis'
import Loader from "../Loader";
import { Editor } from "primereact/editor";
import { Modal ,ModalBody,ModalHeader,Row,Col} from "reactstrap"
const BatchStudent=()=>{

    const[students,setStudents]=useState([]);
    const[openDialog,setOpenDialog]=useState(false);
    const[load,setLoad]=useState(true);
    const [text, setText] = useState('');

    const linkStyle = {
        margin: "70px 0px 0px -30px",
        padding: "0px 10px 20px 20px",                 
        width:"100%",                
    };
    
    const params = useParams();
    const bId = params ? params.bId : null;
        
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
                            <button onClick={(()=>setOpenDialog(!openDialog))}> Add Assignment </button>
                        </div>                                 
                        <div className="col-12 col-sm-12 col-md-12 shadow scroll mt-3">                           
                        {
                        students.map((student,index)=>(
                            <NavLink to={`/batchChats/${student.stdId}`} className="navLink">
                                <div className="studentList">                                
                                    <div>
                                        <img src={a} alt=""/>
                                    </div>
                                    <div>
                                        <label> {student.firstName} &nbsp; {student.lastName} </label> <br/> 
                                        <small className="text-decoration-none"> Java Development Batch</small>                                  
                                    </div>                                
                                </div>    
                            </NavLink>                                                                                 
                            ))
                        }
                        </div>                         
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-8 shadow">
                    <Chatting/>  
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
                                <input type="input" className="form-control"  placeholder="Add Title"/>
                            </Col>
                            <Col>
                                <label> Add End Date </label>
                                <input type="date" className="form-control" placeholder="Add Time"/>
                            </Col>
                            <Col lg={12} sm={12}>
                                <label className="mt-3"> Add Description</label>                                
                                <div className="bg-dark">
                                    <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} className="bg-dark shadow mt-2"/>
                                </div>
                            </Col>
                            <Col lg={6} sm={12}>
                                <button type="submit"  className="btn mt-3 btn-primary pt-2 pb-2 pl-5 pr-5" > Add </button>
                            </Col>
                        </Row>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default BatchStudent