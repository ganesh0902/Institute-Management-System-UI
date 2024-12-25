import { useEffect, useState, useCallback } from "react";
import '../teacherComponent/css/StudentList.css'
import a from '..//..//images/back1.jpg';
import { getAllStudents,getStudentDetails, searchStudentByName } from "../../apis/studentApis";
import { Modal ,ModalBody,ModalHeader,Row,Col} from "reactstrap"
import debounce from 'lodash/debounce';
const StudentList=({teacherId})=>{
    
    const[students,setStudents]=useState([]);
    const[student,setStudent]=useState([]);
    const[openDialog,setOpenDialog]=useState(false);    
    const[newStudent,setNewStudent]=useState([]);

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

    const openStudentDetailsDialog=(async (stdId)=>{

        const studentDetails =await getStudentDetails(stdId);        
        setStudent(studentDetails);
    });
    
    useEffect(()=>{

        console.log(student);
    },[students]);

    // Async function to search for a student by name
    const getStudentSearch = async (search) => {
        
        try {
            const response = await searchStudentByName(search);
            if (response && response.length > 0) {
                setStudents([]);  // Clear previous students
                setStudents(response);  // Set the student data only if response is valid
            } else {
                 getStudent();
            }
        } catch (error) {
            console.error('Error fetching student:', error);
            // On error, reset the student state
        }
    };
          
    return(
        <div style={linkStyle}>
            <div className="row" id="student-list">
                <div className="col-12 col-12 col-md-12">
                    <input type="text" className="search-box" placeholder="Search Student By Name" onChange={(event)=>getStudentSearch(event.target.value)}/>
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
                                    <label> {student.firstName} &nbsp; {student.lastName}</label>
                                    <label> Batch JUNE-2020 </label>
                                    <button className="btn" onClick={()=>openStudentDetailsDialog(student.stdId)}> View Details</button>
                                </div>
                            </div>  
                            ))
                        }                                                                      
                    </div>
                </div>
            </div>
            <Modal size="lg" isOpen={openDialog} toggle={()=>setOpenDialog(!openDialog)}>
                <ModalHeader toggle={()=>setOpenDialog(!openDialog)} style={{backgroundColor:"#F5F7F8"}}>
                    Student Details
                </ModalHeader>                    
                    <ModalBody className="modals" style={{backgroundColor:"#DDE6ED"}}>
                        <Row>
                            <Col lg={6} sm={12} className="mt-2">
                                <label> First Name </label>   
                                <input type="text" className="form-control" name="firstName" value={student.firstName} readOnly/>                             
                            </Col>
                            <Col lg={6} sm={12} className="mt-2">
                                <label> Last Name </label>                                
                                <input type="text" className="form-control" name="lastName" value={student.lastName} readOnly/>                             
                            </Col>
                            <Col lg={6} sm={12} className="mt-2">
                                <label> pass out Year </label>                                
                                <input type="text" className="form-control" name="lastName" value={student.passoutYear} readOnly/>                             
                            </Col>
                            <Col lg={6} sm={12} className="mt-2">
                                <label> Last Education </label>                                
                                <input type="text" className="form-control" name="lastName" value={student.lastEducation} readOnly/>                             
                            </Col>
                            <Col lg={6} sm={12} className="mt-2">
                                <label> Course Name </label>                                
                                <input type="text" className="form-control" name="lastName" value={student.courseName} readOnly/>                             
                            </Col>
                        </Row>
                </ModalBody>
           </Modal>           
        </div>
    )
}
export default StudentList;