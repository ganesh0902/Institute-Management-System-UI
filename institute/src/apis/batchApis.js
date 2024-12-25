import axios from "axios"


const getBatchTitleAndDateAPIS="http://localhost:8999/batch/batchTitleAndDate/";
const updateBatchAPI="http://localhost:8999/batch/";
const save_batch="http://localhost:8999/batch/";
const getBatchByInstituteAPI='http://localhost:8999/batch/institute/'
const getTeacherIdAndNameApis="http://localhost:9003/teacher/getTeachers";                            
const get_TeacherIdAndName="http://localhost:8999/teacher/getTeachers/"
const getTeacherIdAndNameByCredential="http://localhost:9096/auth/teacher/"
const get_findByBatchTitleAPI="http://localhost:8999/batch/batchTitle/";
const getBatchesByTeacherAPI ="http://localhost:8999/batch/teacher/";
const getBatchesByCourseId ="http://localhost:8999/batch/course/"

const token = localStorage.getItem('authToken');

export const getBatchByInstitute=async (institutesId)=>{

    const response = await fetch(getBatchByInstituteAPI+institutesId,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    });

    if(!response.ok)
    {
        throw new Error("API response was not okay ",response.statusText);
    }

    const data = await response.json();
    return data;
}

export const getBatchTitleAndDate=(async (instituteId)=>{         
        try
        {          
           const response = await fetch(getBatchTitleAndDateAPIS+instituteId,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });

            if(!response.ok)
            {
                throw new Error("API response was not okay",response.statusText);
            }

            const data= await response.json();
            return data;
        }
        catch(error)
        {
            throw new Error("Something went wrong "+error);
        }        
    });

export const updateBatch=async (bId, batch)=>{
    try
    {
        const response = await fetch(updateBatchAPI+bId,{
            method:"PUT",
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(batch)
        });

        if(!response.ok)
        {
            throw new Error("Response is not okay");
        }        
    }
    catch(error)
    {
        console.log(error);
    }
}

export const getBatchesByTeacherId=async (tId)=>{

    const response = await axios.get(`http://localhost:8999/batch/teacherId/`+tId);
    return response.data;
}

export const saveBatchRecord=async (batch)=>{
    
    const response = await fetch(save_batch,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`,  
        },
        body:JSON.stringify(batch)
    });

    if(!response.ok)
    {
        console.log("Something went wrong");
    }    
}

export const getTeacherIdAndName=async ()=>{
    
    const response  = await fetch(getTeacherIdAndNameApis,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`,  
        }});

        if(!response.ok)
        {
            console.log("Response is not okay");
        }
    return await response.json();
}

export const getTeacherIdAndNameRecord = async (institutesId) => {
    try {

        const response = await fetch(get_TeacherIdAndName+institutesId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });
        
        if (!response.ok) {
            
            throw new Error(`API response was not okay: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        
        console.error("Error fetching teacher ID and Name", error.message, error);
        throw error;
    }
};

export const getTeacherIdAndNameByIdentityService=(async(institute)=>{
    try
    {
        const response  = await fetch(getTeacherIdAndNameByCredential+institute,{
            method:"GET",
            headers:{
                'Content-Type':"application/json",                
            }
        });

        if(!response.ok)
        {
            throw new Error(`API response was not okay ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    }
    catch(Error)
    {
        console.log(Error.statusText);
    }
});

export const get_findByBatchTitleRecord=async (searchByBatchTitle)=>{

    const response  =await fetch(get_findByBatchTitleAPI+searchByBatchTitle,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer${token}`
        }
    });

    if(!response.ok)
    {
        throw new Error("Apis response was not okay ",response.statusText);
    }

    return await response.json();
}

export const getBatchById=async (batchId)=>{
    try
    {
       const response = await fetch(updateBatchAPI+batchId,{
            method:"GET",
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        });

        const data = await response.json();
        return data;
    }
    catch(error)
    {
        console.log(error.statusText);
    }
}
export const getBatchesByTeacher=async (tId)=>{

    try
    {
    
      const response  =  await fetch(getBatchesByTeacherAPI+tId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        });

        if(!response.ok)
        {
                throw new Error("Something went wrong while fetching batches for teacher admin");
        }        

        const data = await response.json();
        console.log(data);
        return data;        
    }
    catch(error)
    {
        console.log(error.statusText);
    }        
}
export const findBatchesByCourseId=async(courseId)=>{
 
    if(!courseId)
    {
        console.error("Course Id is mandatory to fetch batches");
        return;
    }
    try
    {
        const response  = await fetch(getBatchesByCourseId+courseId,{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },            
        })

        if(!response.ok)
        {
            throw new Error("Something went wrong while fetching data");
        }

        const data = await response.json();

        console.log("Batches By Course Id ",data);
        return data;
    }
    catch(error)
    {
          console.error("Failed to fetch batches by course ID:", error.message);
          return;
    }    
}