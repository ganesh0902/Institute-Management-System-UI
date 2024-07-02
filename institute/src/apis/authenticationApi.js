import axios from "axios";
import { useEffect, useState } from "react";

const validateTokenAPI='http://localhost:9096/auth/validate';
const token=localStorage.getItem("authToken");

export const registration=(async (value)=>{
    try
    {
        const response  = await fetch(`http://localhost:9096/auth/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(value)
        })

        if(!response.ok)
        {
            throw new Error("Something is went wrong");
        }
        return response.ok;        
    }
    catch(error)
    {
        console.log(error);
    }
});

export const getToken=async (value)=>{

    try{
         const response  = await fetch(`http://localhost:9096/auth/token`,{
            method:'POST',
            headers:{
                    "Content-Type":'application/json'
            },
            body:JSON.stringify(value)
         });
         
         if(!response.ok)
         {
            throw new Error("Something went wrong while generating token")
         }             
         return response.text();        
    }
    catch(error)
    {
        console.log(error);
        return "Invalid Credential";
    }    
}

export const validateToken=async ()=>{

    try
    {
    const response  = await fetch(`http://localhost:9096/auth/validate?token=${token}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        });

        if(!response.ok)
        {
            throw new Error("API response was not okay ",response);
        }
        const data = await response.json();        
        return data;        
    }
    catch(error)
    {
        console.log("Error While validating Token",error);
    }
}
export const getUserInformation=async (email)=>{

    try
    {                               
       const response = await fetch(`http://localhost:9096/auth/user?email=${email}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        });

        if(!response.ok)
        {
            throw new Error("API Response was not okay",response);
        }

        const data= await response.json();
        return data;
    }
    catch(error)
    {
        throw new Error("Error while fetching User Information",error);
    }
}