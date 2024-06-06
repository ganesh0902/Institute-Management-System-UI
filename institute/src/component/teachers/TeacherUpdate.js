import { Modal ,ModalBody, ModalHeader, Row,Col, Input} from "reactstrap"
import {updateTeacher} from '../../apis/teacherApis'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const TeacherUpdate=(props)=>{

    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[education,setEducation]=useState("");
    const[contact,setContact]=useState("");
    const[email,setEmail]=useState("");
    const[tId,setTid]=useState("");
    const[teacherDialog,setTeacherDialog]=useState(false);
 
    useEffect(()=>{

        setTeacherDialog(!teacherDialog);
        setTid(props.tId);
    },[props.status]);


    const updateTeacherDto=async ()=>{
        const teacher={tId,firstName, lastName, education, contact, email};

        await updateTeacher(tId,teacher);
        alert("Record Updated Successfully");
        setTeacherDialog(false);
        props.componentUpdate();
    };

    return(
        <div>
            <Modal size="lg" isOpen={teacherDialog} toggle={()=>setTeacherDialog(!teacherDialog)} className="batchModal">
            <ModalHeader toggle={()=>setTeacherDialog(!teacherDialog)} className="addBatchTitle"> Update Student </ModalHeader>
            <ModalBody className="modals" style={{background: 'linear-gradient(to bottom, #94bbe9, #ffffff)'}}>

                <Row>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter First Name </label>
                        <input type="text" name="firstName" defaultValue={props.firstName} onChange={(event)=>setFirstName(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter Last Name </label>
                        <input type="text" name="firstName" defaultValue={props.lastName} onChange={(event)=>setLastName(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12} className="mt-3">
                        <label htmlFor="firstName">Enter Education</label>
                        <input type="text" name="firstName" defaultValue={props.education} onChange={(event)=>setEducation(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12} className="mt-3">
                        <label htmlFor="firstName">Enter contact </label>
                        <input type="text" name="firstName" defaultValue={props.contact} onChange={(event)=>setContact(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12} className="mt-3">
                        <label htmlFor="firstName">Enter email</label>
                        <input type="text" name="firstName" defaultValue={props.email} onChange={(event)=>setEmail(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12} className="mt-3">
                    <label htmlFor="firstName"></label> <br/>
                        <button className="btn btn-info px-5" onClick={()=>updateTeacherDto()}>Edit</button>
                    </Col>
                </Row> 
            </ModalBody>
            </Modal>
        </div>
    )
}
export default TeacherUpdate