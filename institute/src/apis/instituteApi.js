
const token= localStorage.getItem("authToken");
const getInstituteAPI=`http://localhost:8999/institute/details/`;
const getTeacherDetails='http://localhost:8999/teacher/credential/'

export const getInstitute=async (InstituteId)=>{
    
    alert(InstituteId);
   const response =await fetch(getInstituteAPI+InstituteId,{

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
    
    try
    {
        alert(credentialId);
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
    catch(error)
    {
        throw new Error("Something Went wrong");

    }
}
