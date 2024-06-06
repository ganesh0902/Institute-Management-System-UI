import axios from "axios"

const getBatchTitleAndDateAPIS="http://localhost:9002/batch/batchTitleAndDate";

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