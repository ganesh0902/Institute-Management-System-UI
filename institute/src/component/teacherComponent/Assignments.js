import { TabView, TabPanel } from 'primereact/tabview';   
import { NavLink } from 'react-router-dom';
import '../teacherComponent/css/Assignment.css'
import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { getAssignmentByBatchIdAPI } from '../../apis/assignment';
import Loader from '../Loader';
import { Accordion, AccordionTab } from 'primereact/accordion';
const Assignments=()=>{
    
    const[assignment,setAssignment]=useState([]);

    const linkStyle = {
        margin: "40px 0px 0px -2px",
        padding: "0px 10px 20px 0px",  
        height:"600px",         
        
    };

    const { batchId } = useParams();

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
    return(
        <div style={linkStyle}> 
        <div className='mt-3'>
        <TabView className="fixed-tab-view-for-batches"> 
        <TabPanel header="Active Assignment" className="batch-in-teacher-header px-4 text-5" leftIcon="pi pi-user mr-2">
                    <div className='row'>
                        {
                            filterAssignmentActive.length ===0 && <div className='text-center'> No Active Assignment Found </div>
                        }                       
                        <div className='col-12 col-sm-12 col-md-12 shadow assignment-card'>
                        <div className='assignment-list'>
                        {
                            assignment.filter(assignment=> assignment.status ==='active').map((assignment,index)=>(
                            <Accordion activeIndex={-1}>
                            <AccordionTab header={
                                <div style={assignmentListCss}>
                                    <span>{assignment.title}</span>
                                    <small>09-02-2001</small>
                                </div>
                                }>
                                <div> Hello </div> 
                                </AccordionTab>
                            </Accordion>
                            ))
                        }     
                        </div>   
                        </div>                                                                                                                           
                    </div>
            </TabPanel>                  
            <TabPanel header="Pending Assignment" className="batch-in-teacher-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
                    <div className='row'>
                        {
                            filterAssignmentPending.length ===0 && <div className='text-center'> No Pending Assignment Found </div>
                        }
                        {
                            assignment.filter(assignment=> assignment.status === "pending").map((assignment,index)=>(
                            <div className='col-12 col-sm-12 col-md-3 shadow assignment-card'>
                                <NavLink to="">
                                <div className=''>
                                    <h4>{assignment.title}</h4>                               
                                    <p>Write a Java program that creates or appends to a log file, 
                                        adding a new entry each time the program is run. Each entry 
                                        should be timestamped with the current date and time.</p>
                                    <small>02-JUN-2024</small>    
                                </div>
                                </NavLink>
                            </div>                                                        
                            ))
                        }                        
                    </div>
            </TabPanel>                  
            <TabPanel header="Completed Assignment" className="batch-in-teacher-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
                    <div className='row'>
                        {
                            filterAssignmentCompleted.length === 0 && <div className='text-center'> No Completed Assignment Found </div>
                        }
                        {
                            assignment.filter(assignment=> assignment.title === "active").map((assignment,index)=>(
                            <div className='col-12 col-sm-12 col-md-3 shadow assignment-card'>
                                <NavLink to="">
                                <div className=''>
                                    <h4>Java File Handling</h4>                               
                                    <p>Write a Java program that creates or appends to a log file, 
                                        adding a new entry each time the program is run. Each entry 
                                        should be timestamped with the current date and time.</p>
                                    <small>02-JUN-2024</small>    
                                </div>
                                </NavLink>
                             </div>  
                            ))
                        }                                                                              
                    </div>
            </TabPanel>                  
        </TabView>
        </div>
        </div>
    )
}

export default Assignments