import { Axios } from "axios"

const token= localStorage.getItem("authToken");
const getInstituteAPI=`http://localhost:8999/institute/details/`;
const getTeacherDetails='http://localhost:8999/teacher/credential/'

export const getInstitute=async (email)=>{
    
   const response =await fetch(getInstituteAPI+email,{

        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`            
        }
    });

    if(!response.ok)
    {
        throw new Error("Response was not okay ",response);
    }
    const data = await response.json();    
    localStorage.setItem("INSTITUTED_ID", data.id);
    return data;
}

export const getTeacherDetailsRecord=async (credentialId)=>{

    alert(credentialId);
    try
    {
        const response  = await fetch(getTeacherDetails+credentialId,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        });

        if(!response.ok)
        {
            throw new Error("API Response was not okay ! Something went wrong ");
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(Error)
    {
        throw new Error(Error);

    }
}
