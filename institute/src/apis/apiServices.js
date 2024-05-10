import axios from 'axios';

const API_SAVE_COURSE="http://localhost:9001/course/";

export const saveCourse=async (course)=>{

    try
    {
        const response= await axios.post(`${API_SAVE_COURSE}`,course);
        return response.data;
    }
    catch(error)
    {
        console.log(error);
    }
    
}