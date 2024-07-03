import axios from "axios";

const getCourseNameAPIS="http://localhost:8999/course/getCourseIdAndName/";
const getCourseIdAndNameApis="http://localhost:8999/course/getCourseIdAndName/";
const getAllCoursesAPI="http://localhost:8999/course/institute/";
const API_SAVE_COURSE="http://localhost:8999/course/";
                              

const token = localStorage.getItem('authToken');
const instituteId = localStorage.getItem("INSTITUTED_ID");
export const getCourserNameAndId=async ()=>{

    try
    {
        const response  = await fetch(getCourseNameAPIS+instituteId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        });

        if(!response.ok)
        {
            throw new Error("API response was not okay", response.statusText);
        }

        const data = await response.json();
        
        return data;
    }
    catch(error)
    {
        throw new Error("Something went wrong");
    }
}

export const getCourseIdAndNameRecord=async ()=>{

    const response  = await fetch(getCourseIdAndNameApis+instituteId,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`, 
        }
    });

    if(!response.ok)
    {
        throw new Error("apis response was not okay ",response.statusText);
    }

    const data = await response.json();
        return data;
}

export const getAllCoursesRecord=async ()=>{

    const response  =await fetch(getAllCoursesAPI+instituteId,{
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
    console.log("All Courses s",data);
    return data;
}

export const saveCourseRecord=async (course)=>{

    const response = await fetch(API_SAVE_COURSE,{

        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify(course)
    }); 

    if(!response.ok)
    {
        throw new Error("API response was not okay ",response.statusText);
    }

    const data = await response.json();
    return data;
}