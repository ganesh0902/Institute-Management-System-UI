import axios from "axios";

const GET_STUDENT_DETAILS_API = 'http://localhost:8999/student/studentDetails/'; 
const UPDATE_STUDENT_API='http://localhost:8999/student/';
const save_student="http://localhost:8999/student/";  
const search_student="http://localhost:8999/student/filter/";
const get_Student="http://localhost:8999/student/"
const getBatchTitleAndDate="http://localhost:9002/batch/batchTitleAndDate";
const token = localStorage.getItem('authToken');
    
export const getStudentDetails=async (stdId)=>{
    
    try{
        const response = await axios.get(GET_STUDENT_DETAILS_API+stdId);

        fetch(GET_STUDENT_DETAILS_API,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`, 
            }
        }).then(response=>{

            if(!response.ok)
            {
                throw new Error("Network response was not Okay",response.statusText);
            }
        }).then(data=>{

            return data;
        })
        .catch(error=>{

            console.log("Error Fetching Student Details",error);
        })        
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
    }).then(data=>{
        return data;
    }).catch(error=>{
        console.log("Error Fetching search student",error);
    });
}

export const getBatchTileAndDateRecord=async ()=>{

    try
    {
        await fetch(getBatchTitleAndDate,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then(response=>{
            
            if(!response.ok)
            {
                throw new Error("Network response was not okay",response.statusText);
            }
        }).then(data=>{

            return data;
        }).catch(error=>{
            console.log("Error Fetching batch title and date",error);
        })
    }
    catch(error)
    {
        console.log(error);
    }
}