import axios from "axios";

const getCourseNameAPIS="http://localhost:9001/course/getCourseIdAndName";

export const getCourserNameAndId=async ()=>{

    try
    {
        const response =await axios.get(getCourseNameAPIS);
        return response.data;
    }
    catch(error)
    {
        throw new Error("Something went wrong");
    }
}