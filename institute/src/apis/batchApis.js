import axios from "axios"

const getBatchTitleAndDateAPIS="http://localhost:9002/batch/batchTitleAndDate";
const updateBatchAPI="http://localhost:9002/batch/";

export const getBatchTitleAndDate=(async ()=>{         
        try
        {
            const response = await axios.get(getBatchTitleAndDateAPIS);  
            console.log("batch Title And Date is ",response.data);
            return response.data;
        }
        catch(error)
        {
            throw new Error("Something went wrong "+error);
        }        
    });

export const updateBatch=async (bId, batch)=>{
    try
    {
        const response = await fetch(updateBatchAPI+bId,{
            method:"PUT",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(batch)
        });

        if(!response.ok)
        {
            throw new Error("Response is not okay");
        }        
    }
    catch(error)
    {
        console.log(error);
    }
}