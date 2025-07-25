import axios from "axios";
import { json } from "react-router-dom";

const updateTeacherAPI="http://localhost:8999/teacher/";
const getTeacherIdAndTimeAPIS="http://localhost:9003/teacher/getTeachers";
const API_SAVE_TEACHER="http://localhost:8999/teacher/";
const getTeacherByIdAPI='http://localhost:8999/teacher/'
const API_GET_TEACHER="http://localhost:8999/teacher/institute/"     
const SAVE_TEACHER_APIS="http://localhost:9096/auth/register"
const GET_BATCH_API="http://localhost:8999/batch/"

const token = localStorage.getItem("authToken");    
    
export const getTeacherByInstitute=async (institutesId)=>{

    try{
    const response = await  fetch(API_GET_TEACHER+institutesId,{

            method:"GET",
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${token}`
            }
        });

        if(!response.ok)
        {
            throw new Error("Response was not okay",response.statusText);
        }

        const data = await response.json();       
        return data;
    }
    catch(error)
    {
        console.log(error);
    }
}    
export const updateTeacher=async (tId,teacher)=>{

    try{
        const response = await fetch(updateTeacherAPI+tId,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(teacher)
        });
        if(!response.ok)
        {
            throw new Error("Response Was not okay");
        }        
    }
    catch(error)
    {
        console.error("Something went wrong: ",error);
    }
}

export const getTeachersNameAndIds=async ()=>{
    try
    {
        const response = await axios.get(getTeacherIdAndTimeAPIS);
        return response.data;
    }
    catch(error)
    {
        throw new Error("Response is not okay "+error);
    }
}

export const getTeacherById=async (tId)=>{
    
    
    const response  = await fetch(getTeacherByIdAPI+tId,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    });

    if(!response.ok)
    {
        throw new Error("Api Response was not okay",response.statusText);
    }
    
    const data= await response.json();
    console.log("Teacher Record is in teacherAPIs");
    console.log(data);
    return data;
}

export const saveTeacherRecord=async (teacher)=>{

    const response  =  await fetch(API_SAVE_TEACHER,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify(teacher)
    });

    if(!response.ok)
    {
        throw new Error("Response was not okay ",response.statusText);
    }    
}

export const saveTeacher=async(teacher)=>{

    const response  = await fetch(SAVE_TEACHER_APIS,{

        method:"POST",
        headers:{
            'Content-Type':'application/json',            
        },
        body:JSON.stringify(teacher)
    });

    if(!response.ok)
    {
        throw new Error("Response was not okay",response.statusText);
    }

    const data = await response.text();    
    return data;
}

export const getBatches=async (batchId)=>{
    
    
    const response  = await fetch(GET_BATCH_API+batchId,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    });

    if(!response.ok)
    {
        throw new Error("Api Response was not okay",response.statusText);
    }
    
    const data= await response.json();
    console.log("Batch's Record is in teacherAPIs");
    console.log(data);
    return data;
}