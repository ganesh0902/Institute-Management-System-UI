import { TabView, TabPanel } from 'primereact/tabview';   
import { NavLink } from 'react-router-dom';
import '../teacherComponent/css/Assignment.css'
const AssignmentList=()=>{

    const linkStyle = {
        margin: "70px 0px 0px -30px",
        padding: "0px 10px 20px 20px", 
        backgroundColor:"#F6F5F5"               
    };

    return(
        <div style={linkStyle}> 
            <div className='mt-3'>
            <TabView className="fixed-tab-view-for-batches">            
                <TabPanel header="Active Assignment" className="batch-in-teacher-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
                    <div className='row'>
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
                    </div>
                </TabPanel>
                <TabPanel header="Completed Assignment" className="batch-in-teacher-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
                <div className='row'>
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
                    </div>
                </TabPanel>
            </TabView>
            </div>        
        </div>
    )
}
export default AssignmentList