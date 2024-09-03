import { TabView, TabPanel } from 'primereact/tabview';   
import { NavLink } from 'react-router-dom';
import '../teacherComponent/css/Assignment.css'
import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { getAssignmentByBatchIdAPI } from '../../apis/assignment';
import Loader from '../Loader';
import { Accordion, AccordionTab } from 'primereact/accordion';
import AssignmentDescription from './AssignmentDescription';
import { useNavigate } from 'react-router-dom';
const Assignments=()=>{
    
    const[assignment,setAssignment]=useState([]);
    const navigate=useNavigate();
    const [activeIndex, setActiveIndex] = useState(0); // 0 is the index of the first tab

    const linkStyle = {
        margin: "40px 0px 0px -2px",
        padding: "0px 10px 20px 0px",  
        height:"600px",         
        
    };

    const { batchId } = useParams();
        

    // Function to open the second tab
    const openTab = (index,assignmentId) => {
      setActiveIndex(index);
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

    useEffect(()=>{
        console.log("BatchId "+batchId);
        console.log("Assignment");
        console.log(assignment);
        
    },[assignment]);

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
                                    <div style={submissionList}>
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
                <div className='col-12 col-sm-12 col-md-12 shadow assignment-card'>
                    <h2> Submission List </h2>
                </div>
            </div>
            </TabPanel>               
        </TabView>
        </div>
        </div>
    )
}

export default Assignments