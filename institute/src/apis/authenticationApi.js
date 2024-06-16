import axios from "axios";

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