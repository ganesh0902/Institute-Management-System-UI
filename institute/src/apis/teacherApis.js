import axios from "axios";
import { json } from "react-router-dom";

const updateTeacherAPI="http://localhost:9003/teacher/";
const getTeacherIdAndTimeAPIS="http://localhost:9003/teacher/getTeachers";

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