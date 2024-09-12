import { useEffect, useState } from "react";
import '../teacherComponent/css/StudentList.css'
import a from '..//..//images/back1.jpg';
import { getAllStudents } from "../../apis/studentApis";
const StudentList=({teacherId})=>{
    
    const[students,setStudents]=useState([]);

    const linkStyle = {
        margin: "70px 10px 0px -2px",
        padding: "0px 10px 20px 0px",  
        height:"600px",  
        backgroundColor:"#F6F5F5",
        overflow:"scroll"                          
    };

    useEffect(()=>{

        console.log("Teacher Id is ");
        console.log(teacherId);
        getStudent();
        
    },[])

    const getStudent=(async ()=>{

        const data = await getAllStudents();
        setStudents(data);
    });
    return(
        <div style={linkStyle}>
            <div className="row" id="student-list">
                <div className="col-12 col-12 col-md-12">
                    <input type="text" className="search-box" placeholder="Search Student By Name"/>
                </div>
                <div className="col-12 col-sm-12 col-md-12">
                    <div className="row">
                        {
                            students.map((student,index)=>(
                                <div className="col-12 col-sm-12 col-md-2  shadow">
                            <div>
                                <img class="card-img-top rounded teacher-image-in-teacher-list" src={`../student/${student.image}`} alt="Card image cap" />
                            </div>
                            <div className="details">
                                    <label> Ganesh Sakhare </label>
                                    <label> Batch JUNE-2020 </label>
                                    <button className="btn "> View Details</button>
                                </div>
                            </div>  
                            ))
                        }                                                                      
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StudentList;