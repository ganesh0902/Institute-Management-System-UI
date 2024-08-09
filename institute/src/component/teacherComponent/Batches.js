import React, { useEffect, useState } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';   
import {getBatchesByTeacher} from '..//..//apis/batchApis'
import a from '..//..//images/back1.jpg';
import './css/THomePage.css'
 const  Batches=({instituteId,teacherId})=> {

    const[batches,setBatches]=useState([]);
    const [groupedBatches, setGroupedBatches] = useState({});
    const[loading,setLoading]=useState(true);
    const [pendingBatches, setPendingBatches] = useState([]);
     
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
            finally{
                setLoading(false);
            }
            
        };
        getBatches();                
    },[teacherId]);

    useEffect(() => {
        // Group the data by status
        const groupBatchesSet=()=>{
            console.log("Batches is ");
            console.log(batches);
            const groupedData = batches.reduce((acc, batch) => {
                const { status } = batch;
                if (!acc[status]) {
                    acc[status] = [];
                }
                acc[status].push(batch);
                return acc;
            }, {});
            console.log(typeof groupedBatches); // Should log 'object'        
            setGroupedBatches(JSON.stringify(groupedData, null, 2));   
            console.log(groupedBatches);
        }     
        groupBatchesSet();
    }, [batches]);

    useEffect(()=>{
        console.log("Group Batches is ");
        console.log(groupedBatches);        
        setPendingBatches(groupedBatches.started);
        console.log("Batch exist");        
    },[groupedBatches]);  
    
    useEffect(()=>{

        console.log("Pending batches is ");
        console.log(pendingBatches);
    },[pendingBatches]);
    
    
  return (
    <div style={linkStyle}>
        <div className='mt-3'>
        <TabView className="fixed-tab-view-for-batches">            
            <TabPanel header="Current Batch" className="batch-in-teacher-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
            <div className='row'>     
            {batches.map((batch, index) => (
                 <div className='col-12 col-sm-12 col-md-3 shadow rounder'>
                 <div className='image'>
                 <img className='batch-card card-img-top' loading='lazy' alt='uploading' src={a}/>
                 </div>
                 <div className='batchDetails'>                            
                     <div className='title'>
                         <label className='text-left'> Java Developer </label>   
                     </div>
                     <span className='text-right'>09-09-2001</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    
                     <span> 09-02-2021</span><br/>
                     <span className='' style={{marginTop:"10px !important"}}> Status : Pending</span>
                 </div>
             </div>                                                                        
            ))}           
            </div>
            </TabPanel>
            <TabPanel header="Up Coming Batch" className="batch-in-teacher-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
                 <h2> Up Coming Batch</h2>   
            </TabPanel>
            <TabPanel header="End Batches" className="batch-in-teacher-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
                 <h2> End Batch</h2>   
            </TabPanel>
        </TabView>
        </div>
    </div>
  )
}

export default Batches