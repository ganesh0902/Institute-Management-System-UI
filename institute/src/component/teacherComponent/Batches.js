import React from 'react'
import { SplitButton } from 'primereact/splitbutton';
import { TabView, TabPanel } from 'primereact/tabview';   

 const  Batches=()=> {

  const items = [
    {
        label: 'Update',
        icon: 'pi pi-refresh'
    },
    {
        label: 'Delete',
        icon: 'pi pi-times'
    }
];

    const linkStyle = {
        margin: "70px 0px 0px -30px",
        padding: "0px 10px 20px 20px", 
        backgroundColor:"#7FA1C3" ,
        color:"white",
        width:"100%"
    };

  return (
    <div style={linkStyle}>
        <div className='mt-3'>
        <TabView>
            <TabPanel header="Current Batch" className="student-text-in-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
                 <h2> Current Batch</h2>   
            </TabPanel>
            <TabPanel header="Up Coming Batch" className="student-text-in-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
                 <h2> Up Coming Batch</h2>   
            </TabPanel>
            <TabPanel header="End Batches" className="student-text-in-header px-4 py-2 text-5" leftIcon="pi pi-user mr-2">
                 <h2> End Batch</h2>   
            </TabPanel>
        </TabView>
        </div>
    </div>
  )
}

export default Batches