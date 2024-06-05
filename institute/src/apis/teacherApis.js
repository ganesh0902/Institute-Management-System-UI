import axios from "axios";

const updateTeacherAPI="http://localhost:9003/teacher/";

export const updateTeacherDto=async (tId)=>{

    try{

        const response = await axios.get(updateTeacherAPI+tId);

        return response.data;
    }
    catch(error)
    {
        throw error;
    }
}