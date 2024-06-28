import { Axios } from "axios"

const token= localStorage.getItem("authToken");
const getInstituteAPI=`http://localhost:8999/institute/details/`;

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
    return data;
}