import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
const CourseDetailsHome=()=>{

    //const { batchId } = useParams();  

    const {courseId}  = useParams();


    useEffect(()=>{

        console.log("Course Id is ",courseId);
    },[])
    return(
        <div>
            <h2> Course Details </h2>
        </div>
    )
}
export default CourseDetailsHome