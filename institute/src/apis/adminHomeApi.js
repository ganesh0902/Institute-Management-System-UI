const get_total_student="http://localhost:8999/student/studentCount/";
const get_total_teacher="http://localhost:8999/teacher/teacherCount/";
const get_total_course="http://localhost:8999/course/courseCount/";
const get_total_batch="http://localhost:8999/batch/countBatch/";

const token = localStorage.getItem('authToken');    
const instituteId = localStorage.getItem("INSTITUTED_ID");

console.log("instituteId",instituteId);

export const getStudentCount=async ()=>{
        
    return await fetch(get_total_student+instituteId,{ 
        method:"GET",                    
        headers:{
            'Content-Type':'application/json',  
            'Authorization': `Bearer ${token}`,             
        }
    }).then(response=>{
        if(!response.ok)
        {
            throw new Error("Network response was not okay ",response.statusText);
        }        
        return response.json();        

    }).then(data=>{

        return data;

    }).catch(error=>{
        console.log("Error Fetching total Student",error);
    })    
}

export const getTeacherCount=async ()=>{

    return await fetch(get_total_teacher+instituteId,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`,   
        }
    }).then(response=>{

        if(!response.ok)
        {
            throw new Error("Network response was not Okay",response.statusText);
        }
        return response.json();
    }).then(data=>{

        return data;
    }).catch(error=>{
        console.log("Error Fetching total Teacher ",error);
    })
}

export const getCourseCount=async ()=>{

     const response =  await fetch(get_total_course+instituteId,{
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

    const data = await response.json();
    return data;
}

export const getBatchCount=async ()=>{

    return await fetch(get_total_batch+instituteId,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`,   
        },
    }).then(response=>{

        if(!response.ok)
        {
            throw new Error("Network Response was not Okay",response.statusText);
        }
        return response.json();
    }).then(data=>{

        return data;
    }).catch(error=>{
        console.log("Error fetching total Batch");
    })
}