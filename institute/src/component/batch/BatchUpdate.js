import { useEffect, useState } from "react"
import { Modal ,ModalBody, ModalHeader, Row,Col, Input} from "reactstrap"

const BatchUpdate=(props)=>{

    const[batchTitle,setBatchTitle]=useState("");
    const[batchDuration,setDuration]=useState("");
    const[startTime,setStartTime]=useState("");
    const[endTime,setEndTime]=useState("");
    const[status,setStatus]=useState("");
    const[location,setLocation]=useState("");
    const[time,setTime]=useState("");
    const[teacherId,setTeacherId]=useState("");
    const[batchId,setBatchId]=useState(0);
    const[batchDialog,setBatchDialog]=useState(false);

    useEffect(()=>{
        setBatchDialog(!batchDialog);
    },[props.status]);

    const batchUpdate=()=>
    {
        
    }
    return(
        <div>
            <Modal size="lg" isOpen={batchDialog} toggle={()=>setBatchDialog(!batchDialog)} className="batchModal">
            <ModalHeader toggle={()=>setBatchDialog(!batchDialog)} className="addBatchTitle"> Update Batch </ModalHeader>
            <ModalBody className="modals" style={{background: 'linear-gradient(to bottom, #94bbe9, #ffffff)'}}>

                <Row>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter batch Title </label>
                        <input type="text" name="firstName" defaultValue={props.batchTitle} onChange={(event)=>setBatchTitle(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter duration </label>
                        <input type="text" name="firstName" defaultValue={props.duration} onChange={(event)=>setDuration(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter start date</label>
                        <input type="text" name="firstName" defaultValue={props.startDate} onChange={(event)=>setStartTime(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter End date</label>
                        <input type="text" name="firstName" defaultValue={props.endDate} onChange={(event)=>setEndTime(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Select Status</label>
                        <input type="text" name="firstName" defaultValue={props.status} onChange={(event)=>setStatus(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Enter location</label>
                        <input type="text" name="firstName" defaultValue={props.location} onChange={(event)=>setLocation(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12}>
                        <label htmlFor="firstName">Select time</label>
                        <input type="text" name="firstName" defaultValue={props.time} onChange={(event)=>setTime(event.target.value)} />
                    </Col>
                    <Col lg={6} md={12} className="mt-4">
                        <button className="btn btn-info px-5" onClick={()=>batchUpdate()}>Edit</button>
                    </Col>
                </Row> 
            </ModalBody>
          </Modal>  
        </div>
    )
}
export default BatchUpdate