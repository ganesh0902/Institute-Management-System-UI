const get_total_student="http://localhost:8999/student/studentCount";
const get_total_teacher="http://localhost:8999/teacher/teacherCount";
const get_total_course="http://localhost:8999/course/courseCount";
const get_total_batch="http://localhost:8999/batch/countBatch";

const token = localStorage.getItem('authToken');    

export const getStudentCount=async ()=>{
    
    console.log("Token is in API",token);

    return await fetch(get_total_student,{ 
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

    return await fetch(get_total_teacher,{
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

     return await fetch(get_total_course,{
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
        return response.json();
    }).then(data=>{

        return data;
    }).catch(error=>{
        console.log("Error fetching total teacher",error);
    })
}

export const getBatchCount=async ()=>{

    return await fetch(get_total_batch,{
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