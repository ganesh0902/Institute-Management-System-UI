import axios from "axios";

const GET_STUDENT_DETAILS_API = 'http://localhost:9004/student/studentDetails/'; 
const UPDATE_STUDENT_API='http://localhost:9004/student/';

export const getStudentDetails=async (stdId)=>{
    
    try{
        const response = await axios.get(GET_STUDENT_DETAILS_API+stdId);

        console.log("Student Record");
        console.log(response.data);
        return response.data;
    }
    catch(error)
    {
        throw error;
    }    
}

export const updateStudent=async(stdId,student)=>{

    console.log("Student Id",stdId);
    console.log(student);
    try{
           const response = await fetch(UPDATE_STUDENT_API+stdId,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(student)
           });

           if(!response.ok)
           {
            throw new Error("Network Response was not ok")
           }           
    }
    catch(error)
    {
        console.error("Something went wrong: ",error);
    }
}