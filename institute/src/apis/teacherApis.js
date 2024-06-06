import axios from "axios";
import { json } from "react-router-dom";

const updateTeacherAPI="http://localhost:9003/teacher/";

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