import axios from "axios"
import { json } from "react-router-dom";

const getBatchTitleAndDateAPIS="http://localhost:8999/batch/batchTitleAndDate";
const updateBatchAPI="http://localhost:8999/batch/";
const save_batch="http://localhost:8999/batch/";
const getTeacherIdAndNameApis="http://localhost:9003/teacher/getTeachers";
const get_TeacherIdAndName="http://localhost:8999/teacher/getTeachers"
const get_findByBatchTitleAPI="http://localhost:8999/batch/batchTitle/";

const token = localStorage.getItem('authToken');

export const getBatchTitleAndDate=(async ()=>{         
        try
        {
          
           const response = await fetch(getBatchTitleAndDateAPIS,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });

            if(!response.ok)
            {
                throw new Error("API response was not okay",response.statusText);
            }

            const data= await response.json();
            return data;
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
                'Content-type':'application/json',
                'Authorization':`Bearer ${token}`
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

export const getBatchesByTeacherId=async (tId)=>{

    const response = await axios.get(`http://localhost:8999/batch/teacherId/`+tId);
    return response.data;
}

export const saveBatchRecord=async (batch)=>{
    
    const response = await fetch(save_batch,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`,  
        },
        body:JSON.stringify(batch)
    });

    if(!response.ok)
    {
        console.log("Something went wrong");
    }
    console.log("batch Save Successfully");
}

export const getTeacherIdAndName=async ()=>{
    
    const response  = await fetch(getTeacherIdAndNameApis,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`,  
        }});

        if(!response.ok)
        {
            console.log("Response is not okay");
        }
    return await response.json();
}

export const getTeacherIdAndNameRecord = async () => {
    try {

        const response = await fetch(get_TeacherIdAndName, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });
        
        if (!response.ok) {
            
            throw new Error(`API response was not okay: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        
        console.error("Error fetching teacher ID and Name", error.message, error);
        throw error;
    }
};

export const get_findByBatchTitleRecord=async (searchByBatchTitle)=>{

    const response  =await fetch(get_findByBatchTitleAPI+searchByBatchTitle,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer${token}`
        }
    });

    if(!response.ok)
    {
        throw new Error("Apis response was not okay ",response.statusText);
    }

    return await response.json();
}