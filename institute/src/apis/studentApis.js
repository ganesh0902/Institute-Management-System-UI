import axios from "axios";

const GET_STUDENT_DETAILS_API = 'http://localhost:8999/student/studentDetails/'; 
const UPDATE_STUDENT_API='http://localhost:8999/student/';
const save_student="http://localhost:8999/student/";  
const search_student="http://localhost:8999/student/filter/";
const get_Student="http://localhost:8999/student/institute/"
const getBatchTitleAndDate="http://localhost:8999/batch/batchTitleAndDate/";
const token = localStorage.getItem('authToken');
    
const instituteId= localStorage.getItem("INSTITUTED_ID");
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