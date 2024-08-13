import React, { useEffect, useState } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';   
import {getBatchesByTeacher} from '..//..//apis/batchApis'
import a from '..//..//images/back1.jpg';
import './css/THomePage.css'
import { NavLink } from 'react-router-dom';
 const  Batches=({instituteId,teacherId})=> {

    const[batches,setBatches]=useState([]);        
     
    const linkStyle = {
        margin: "70px 0px 0px -30px",
        padding: "0px 10px 20px 20px", 
        backgroundColor:"#7FA1C3" ,
        color:"white",
        width:"100%",        
    };

    useEffect(()=>{
        
        const getBatches=async()=>{
            try
            {
                const data = await getBatchesByTeacher(teacherId);            
                setBatches(data);                        
            }
            catch(error){
                console.log("Error Fetching batch");
            }                        
        };
        getBatches();                
    },[teacherId]);

    const filteredBatches = batches.filter(batch => batch.status === "End");
    const filteredBatchStarted = batches.filter(batch => batch.status === "Started");
    const filteredBatchPending = batches.filter(batch => batch.status === "Pending");
  return (
    <div style={linkStyle}>
        <div className='mt-3'>
        <TabView className="fixed-tab-view-for-batches">            
            <TabPanel header="Current Batch" className="batch-in-teacher-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
            <div className='row'>   
              {
                filteredBatchStarted.length ===0 && 
                <div className='text-center'>No Batch Upcoming Found</div>
              }    
            {batches
                .filter(batch => batch.status === "Started").map((batch, index) => (            
                <div className='col-12 col-sm-12 col-md-3 shadow rounder'>
                    <NavLink to={`/batchStudent/:${batch.bid}`} className="navLink">
                    <div className='image'>
                        <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={a}/>
                    </div>
                    <div className='batchDetails'>                            
                        <div className='title'>
                            <label className='text-left text-dark'> {batch.batchTitle} </label>   
                        </div>
                        <div className='batchInfo'>
                            <span> {batch.startDate}</span>
                            <span> {batch.endDate} </span>
                            <span>Time {batch.time} </span>
                            <span className={batch.status} style={{marginTop:"10px !important"}}> Status : {batch.status}</span>
                        </div>    
                    </div>
                    </NavLink>
                </div>                        
            ))}           
            </div>
            </TabPanel>
            <TabPanel header="Up Coming Batch" className="batch-in-teacher-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
            <div className='row'>
            {
                filteredBatchPending.length ===0 && 
                <div className='text-center'> No Upcoming Batch found</div>
            }    
                {batches
                    .filter(batch => batch.status === "Pending").map((batch, index) => (
                    <div className='col-12 col-sm-12 col-md-3 shadow rounder'>
                        <NavLink to={`/batchStudent/:${batch.bid}`} className="navLink">
                        <div className='image'>
                            <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={a}/>
                        </div>
                        <div className='batchDetails'>                            
                            <div className='title'>
                                <label className='text-left text-dark'> {batch.batchTitle} </label>   
                            </div>
                            <div className='batchInfo'>
                                <span> {batch.startDate}</span>
                                <span> {batch.endDate} </span>
                                <span>Time: {batch.time} </span>
                                <span className={batch.status} style={{marginTop:"10px !important"}}> Status : {batch.status}</span>
                            </div>                                
                        </div>
                        </NavLink>
                    </div>                                                                                            
                ))}        
                </div>  
            </TabPanel>
            <TabPanel header="End Batches" className="batch-in-teacher-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">                
            <div className='row'>   
            {
                filteredBatches.length ===0 && 
                <div className='text-center'> No Data Found </div>            
            }    
            {batches
                .filter(batch => batch.status === "End").map((batch, index) => (
                <div className='col-12 col-sm-12 col-md-3 shadow rounder'>
                    <NavLink to={`/batchStudent/:${batch.bid}`} className="navLink">
                    <div className='image'>
                        <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={a}/>
                    </div>
                    <div className='batchDetails'>                            
                        <div className='title'>
                            <label className='text-dark text-center'> {batch.batchTitle} </label>   
                        </div>
                        <div className='batchInfo'>
                            <span> {batch.startDate}</span>
                            <span> {batch.endDate} </span><br/>
                            <span>Time {batch.time} </span>
                            <span className={batch.status} style={{marginTop:"10px !important"}}> Status : {batch.status}</span>
                        </div>    
                    </div>
                    </NavLink>
                </div>                                                                        
            ))}           
            </div>                
            </TabPanel>
        </TabView>
        </div>
    </div>
  )
}

export default Batches