import axios from "axios";
import { json } from "react-router-dom";

const updateTeacherAPI="http://localhost:9003/teacher/";
const getTeacherIdAndTimeAPIS="http://localhost:9003/teacher/getTeachers";
const API_SAVE_TEACHER="http://localhost:8999/teacher/";

    const token = localStorage.getItem("authToken");

export const updateTeacher=async (tId,teacher)=>{

    try{
        const response = await fetch(updateTeacherAPI+tId,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
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
      
    await fetch(`http://localhost:9003/teacher/`+tId).then((result)=>{
        result.json().then((response)=>{
            
            return response;
        })
    })
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