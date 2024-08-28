const getAssignmentByTeacherId ="http://localhost:8999/batch/asssignmentByTeacherId/"
const token = localStorage.getItem('authToken');   

export const getAssignmentByTeacherIdAPI=async (teacherId)=>{

    try
    {
        const response =  await fetch(getAssignmentByTeacherId+teacherId,{
            method:"GET",
            headers:{
                "Content-Type":'application/json',
                'Authorization':`Bearer ${token}`
            }        
        });

        if(!response.ok)
        {
            console.log("Response was not okay");
        }

        const data = await response.json();
        console.log(data);
        return data;
        
    }
    catch(error)
    {
        console.log(error);
    }
}