import axios from "axios";
import { json } from "react-router-dom";

const GET_STUDENT_DETAILS_API = 'http://localhost:8999/student/studentDetails/'; 
const UPDATE_STUDENT_API='http://localhost:8999/student/';
const save_student="http://localhost:8999/student/";  
const search_student="http://localhost:8999/student/filter/";
const get_Student="http://localhost:8999/student/institute/"
const getBatchTitleAndDate="http://localhost:8999/batch/batchTitleAndDate/";
const token = localStorage.getItem('authToken');
const getStudentByBatchIdAPI="http://localhost:8999/student/studentByBatch/"
const getStudentByAssignmentId="http://localhost:8999/submission/assignment/"

// following API is for Assignment
const saveAssignmentAPI="http://localhost:8999/batch/assignmentSave";
const getStudentAPI="http://localhost:8999/student/";

export const getStudentDetails=async (stdId)=>{
    
    try{
        
        const response  = await fetch(GET_STUDENT_DETAILS_API+stdId,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`, 
            }
        });
        
        if(!response.ok)
        {
            throw new Error("API response was not okay",response.statusText);
        }

        const data = response.json();
        return data;
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

export const saveStudent=async (student)=>{

    await fetch(save_student,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(student)
    })
}

export const searchStudent=async (formData)=>{

    await fetch(search_student+formData.studentName,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`,
        },        
    }).then(response=>{

        if(!response.ok)
        {
            throw new Error("Response was not okay",response.statusText);
        }

        return response.json();
    }).then(data=>{
        return data;
    }).catch(error=>{
        console.log("Error Fetching search student",error);
    });
}

export const getBatchTileAndDateRecord=async (institutesId)=>{
    try {
        const response = await fetch(getBatchTitleAndDate+institutesId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        return data;

    } catch (error) {
        // Log the error and re-throw to be caught by the caller
        console.log("Error fetching batch title and date", error);
        throw error;
    }
}  

export const getStudentRecordByInstitute=async (institutesId)=>{

    const response = await fetch(get_Student+institutesId,{
       method:"GET",
       headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`,
       }        
    });
    if(!response.ok)
    {
        throw new Error("Response was not okay");
    }
    const data = await response.json();
    return data;
}

export const getStudentByBatchId=async (batchId)=>{

    try
    {
       const response = await fetch(getStudentByBatchIdAPI+batchId,{
            method:"GET",
            headers:{
                'Content-Type':"application/json",
                "Authorization":`Bearer ${token}`,
            }
        });

        if(!response.ok)
        {
            console.log("API response was not okay");
        }

        const data = await response.json();
        return data;
    }
    catch(error)
    {
        console.log(error);
    }
}

export const saveAssignment=(async (assignment)=>{
    
   try
   {
       await fetch(saveAssignmentAPI,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify(assignment)
        })
   }
   catch(error)
   {
        console.log(error);
   }
});

export const getStudent=(async(stdId)=>{

    try
    {
        const response  = await fetch(getStudentAPI+stdId,{

            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        });

        if(!response.ok)
        {
            throw new Error("Response was not okay "+response.statusText);
        }

        const data = await response.json();
        return data;
    }
    catch(error)
    {
        console.log(error);
    }
})

export const getStudentByAssignmentIdAPI=async (assignmentId)=>{

    try
    {
        const response  = await fetch(getStudentByAssignmentId+assignmentId,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        });

        if(!response.ok)
        {
            console.log("API response was not okay Something went wrong "+response.statusText);
        }
        const data = await response.json();
        return data;
    }
    catch(error)
    {
        console.log(error);
    }
}