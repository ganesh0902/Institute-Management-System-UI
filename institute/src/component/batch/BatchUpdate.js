import { useState } from "react"
import { Modal ,ModalBody, ModalHeader, Row,Col, Input} from "reactstrap"

const BatchUpdate=(props)=>{

    const[batchTitle]=useState("");
    const[batchDuration,setDuration]=useState("");
    const[startTime,setStartTime]=useState("");
    const[endTime,setEndTime]=useState("");
    const[status,setStatus]=useState("");
    const[location,setLocation]=useState("");
    const[time,setTime]=useState("");
    const[teacherId,setTeacherId]=useState("");
    const[batchId,setBatchId]=useState(0);

    const[batchDialog,setBatchDialog]=useState(false);

    return(
        <div>
            <Modal size="lg" isOpen={batchDialog} toggle={()=>setBatchDialog(!batchDialog)} className="batchModal">
            <ModalHeader toggle={()=>setBatchDialog(!batchDialog)} className="addBatchTitle"> Update Batch </ModalHeader>
            <ModalBody className="modals" style={{background: 'linear-gradient(to bottom, #94bbe9, #ffffff)'}}>

                <Row>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter batch Title </label>
                        <input type="text" name="firstName" defaultValue={props.batchTitle} onChange={(event)=>setFirstName(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter duration </label>
                        <input type="text" name="firstName" defaultValue={props.duration} onChange={(event)=>setLastName(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter start date</label>
                        <input type="text" name="firstName" defaultValue={props.startDate} onChange={(event)=>setPassoutYear(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter End date</label>
                        <input type="text" name="firstName" defaultValue={props.endDate} onChange={(event)=>setCourseName(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Select Status</label>
                        <input type="text" name="firstName" defaultValue={props.status} onChange={(event)=>setLastEducation(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter location</label>
                        <input type="text" name="firstName" defaultValue={props.location} onChange={(event)=>setLastEducation(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Select time</label>
                        <input type="text" name="firstName" defaultValue={props.time} onChange={(event)=>setLastEducation(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12} className="mt-4">
                        <button className="btn btn-info px-5" onClick={()=>studentUpdate()}>Edit</button>
                    </Col>
                </Row> 
            </ModalBody>
          </Modal>  
        </div>
    )
}
export default BatchUpdate