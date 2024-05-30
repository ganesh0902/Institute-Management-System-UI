import axios from "axios";

const GET_STUDENT_DETAILS_API = 'http://localhost:9004/student/studentDetails/'; 
export const getStudentDetails=async (stdId)=>{
    
    try{
        const response = await axios.get(GET_STUDENT_DETAILS_API+stdId);

        console.log("Student Record");
        console.log(response.data);
        return response.data;
    }
    catch(error)
    {
        throw error;
    }
}