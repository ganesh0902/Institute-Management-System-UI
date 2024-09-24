import { TabView, TabPanel } from 'primereact/tabview';   
import '../teacherComponent/css/Assignment.css'
import {useEffect, useState} from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { getAssignmentByBatchIdAPI } from '../../apis/assignment';
import Loader from '../Loader';
import { Accordion, AccordionTab } from 'primereact/accordion';
import AssignmentDescription from './AssignmentDescription';
import { getStudentByAssignmentIdAPI,changeSubmissionStatus} from '../../apis/studentApis';
const Assignments=()=>{
    
    const[assignment,setAssignment]=useState([]);    
    const [activeIndex, setActiveIndex] = useState(0); // 0 is the index of the first tab
    const[assignmentId,setAssignmentId]=useState(0);
    const[students,setStudents]=useState([]);
    const[selectedStdId,setSelectedStdId]=useState(0);
    const { batchId } = useParams();   

    const linkStyle = {
        margin: "40px 0px 0px -2px",
        padding: "0px 10px 20px 0px",  
        height:"600px",         
        
    };
    
        
    // Function to open the second tab
    const openTab = (index,assignmentId) => {
      setActiveIndex(index);
      setAssignmentId(assignmentId);
      getStudentByAssignment(assignmentId); //call get student list
      console.log("Assignment Id is "+assignmentId);
    };    

    useEffect(()=>{

        getAssignment();
    },[]);

    const getAssignment=async ()=>{
        try
        {
            const response  = await getAssignmentByBatchIdAPI(batchId);
            setAssignment(response);

        }   
        catch(error)
        {
            console.log(error);
        }
    }

    const getStudentByAssignment=async (assignmentId)=>{
        try
        {
        const data = await getStudentByAssignmentIdAPI(assignmentId);
        setStudents(data);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        console.log("BatchId "+batchId);
        console.log("Assignment");
        console.log(assignment);
        console.log("student list");
        console.log(students);
        
    },[assignment,students,selectedStdId]);

    const filterAssignmentPending    = assignment.filter(assignment=> assignment.status ==="pending");
    const filterAssignmentCompleted  = assignment.filter(assignment=> assignment.status ==="completed");
    const filterAssignmentActive     = assignment.filter(assignment=> assignment.status === "active");

    if(!assignment)
    {
        return(<Loader/>)
    }
    

    const assignmentListCss={
        padding: '15px 15px 15px 0px', 
        marginTop: '10px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    }    
    const submissionList={
        width:"98%",        
        display:"flex",
        justifyContent:"right",
        pointer:"cursor", 
        marginTop:"10px",
        border:"none"         
    }
    const navLink={
        backgroundColor:"white",   
        color:"black",     
        padding:"5px 20px 5px 20px", 
        borderRadius:"20px",                 
        border:"none"
    }    

    const selectedStudent=(studentId)=>{
        
        setSelectedStdId(studentId);
        console.log("selected Student Id "+studentId);
    }    

    const statusChange=async (status,submissionId)=>{

        console.log("Status is "+status);
        console.log("selected Student Id is "+selectedStdId);
        console.log("selected submission Id is "+submissionId);
        const response  = await changeSubmissionStatus(status,submissionId,selectedStdId);

        alert(response);

    }
    return(
        <div style={linkStyle}> 
        <div className='mt-3'>
        <TabView className="fixed-tab-view-for-batches" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}> 
        <TabPanel header="Active Assignment" className="batch-in-teacher-header px-4 text-5" leftIcon="pi pi-user mr-2">
            <div className='row'>                
                <div className='col-12 col-sm-12 col-md-12 shadow assignment-card'>
                {
                    filterAssignmentActive.length ===0 && <div className='text-center'> No Active Assignment Found </div>
                }                       
                    <div className='assignment-list'>
                    {
                        assignment.filter(assignment=> assignment.status ==='active').map((assignment,index)=>(
                        <Accordion activeIndex={-1}>
                        <AccordionTab header={
                            <div style={assignmentListCss}>
                                <span style={{marginTop:"-7px"}}>{assignment.title}</span>
                                <small>{assignment.startDate}</small>
                            </div>
                            }>
                            <div> 
                                <div style={submissionList}>
                                    <button onClick={()=>openTab(3,assignment.taskId)} className="shadow" style={navLink}> Submission List </button>
                                </div>
                                <AssignmentDescription description={assignment.description}/> 
                            </div> 
                            </AccordionTab>
                        </Accordion>
                        ))
                    }     
                    </div>   
                </div>                                                                                                                           
            </div>
            </TabPanel>     
            <TabPanel header="Pending Assignment" className="batch-in-teacher-header px-4 text-5" leftIcon="pi pi-user mr-2">                                
                <div className='row'>                  
                    <div className='col-12 col-sm-12 col-md-12 shadow assignment-card'>
                    {
                        filterAssignmentPending.length ===0 && <div className='text-center'> No Pending Assignment Found </div>
                    }                       
                        <div className='assignment-list'>
                        {
                            assignment.filter(assignment=> assignment.status ==='pending').map((assignment,index)=>(
                            <Accordion activeIndex={-1}>
                            <AccordionTab header={
                                <div style={assignmentListCss}>
                                    <span style={{marginTop:"-7px"}}>{assignment.title}</span>
                                    <small>{assignment.startDate}</small>
                                </div>
                                }>
                                <div> 
                                    <div style={submissionList}>
                                        <button onClick={()=>openTab(3,assignment.taskId)} className="shadow" style={navLink}> Submission List </button>
                                    </div>
                                    <AssignmentDescription description={assignment.description}/> 
                                </div> 
                                </AccordionTab>
                            </Accordion>
                            ))
                        }     
                        </div>   
                    </div>                                                                                                                           
                </div>
            </TabPanel>                  
            <TabPanel header="Completed Assignment" className="batch-in-teacher-header px-4 text-5" leftIcon="pi pi-user mr-2">
                <div className='row'>                  
                    <div className='col-12 col-sm-12 col-md-12 shadow assignment-card'>
                    {
                        filterAssignmentCompleted.length ===0 && <div className='text-center'> No Completed Assignment Found </div>
                    }                       
                        <div className='assignment-list'>
                        {
                            assignment.filter(assignment=> assignment.status ==='completed').map((assignment,index)=>(
                            <Accordion activeIndex={-1}>
                            <AccordionTab header={
                                <div style={assignmentListCss}>
                                    <span style={{marginTop:"-7px"}}>{assignment.title}</span>
                                    <small>{assignment.startDate}</small>
                                </div>
                                }>
                                <div> 
                                    <div>
                                     <button onClick={()=>openTab(3)} className="shadow" style={navLink}> Submission List </button>
                                    </div>
                                    <AssignmentDescription description={assignment.description}/> 
                                </div> 
                                </AccordionTab>
                            </Accordion>
                            ))
                        }     
                        </div>   
                    </div>                                                                                                                           
                </div>                        
            </TabPanel>   
            <TabPanel header="Submission List" className="batch-in-teacher-header px-4 text-5" leftIcon="pi pi-user mr-2">                                
            <div className='row'>                  
                <div className='col-12 col-sm-12 col-md-4 shadow assignment-card'>
                <div id='image-label-container'>
                    {
                        students.length === 0 && <div className='text-center'> No Student Found Yet </div>
                    }
                    {
                        students.map((student,index)=>(
                            <div className='image-label'>
                                <NavLink to="#" onClick={()=>selectedStudent(student.stdId, student.assignmentId)}>                                
                                <img class="card-img-top rounded teacher-image-in-teacher-list" src={`../student/${student.image}`} alt="Card image cap" />
                                <label>{student.firstName} &nbsp; {student.lastName}</label>
                                </NavLink>
                            </div>  
                        ))
                    }                                       
                    </div>
                </div>
                <div className='col-12 col-sm-12 col-md-8 shadow assignment-card'>
                    <h2> 
                    {
                    students.filter(student => student.stdId === selectedStdId).length === 0 
                        ? <div className='text-center'> No Student Submission Yet </div> 
                        : students.filter(student => student.stdId === selectedStdId).map(student => (

                            <div key={student.stdId} className='row'>
                             <div className='col-12 col-sm-12 col-md-6 pt-4'>                                
                            <small className='text-small'>
                              Submission Date : {student.date ? new Date(student.date).toLocaleString() : 'No submission date'}
                            </small>                        
                            </div>   
                            <div className='col-12 col-sm-12 col-md-6 assignmentStatusContainer mb-2'>
                            <label> Select Status </label>
                                <select style={{float:"right"}}  disabled={student.status === "Approved"} className='form-control' onChange={((e)=>statusChange(e.target.value,student.submissionId))}>                                    
                                    <option value="Reject" style={{display:student.status ==="Approved" ? 'block':"none"}}> Approved </option>
                                    <option value="Reject"> Reject </option>
                                    <option value="Approved"> Approved </option>
                                </select>
                            </div>
                            <hr/>
                            <div className='col-12 col-sm-12 col-md-12'>
                                 <p className='m-3'>Solution: {student.solution}</p>                            
                            </div>

                        </div>
                        
                        ))
                    }
                    </h2>
                </div>
            </div>
            </TabPanel>               
        </TabView>
        </div>
        </div>
    )
}

export default Assignments