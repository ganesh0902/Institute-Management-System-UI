
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student from './component/Student';
import Teacher from './component/Teacher'
import Batch from './component/Batch';
import Course from './component/Course';
import CourseDetails from './courses/CourseDetails';
import HomePage from './component/home/HomePage';
import NavigationBar from './component/home/NavigationBar'
import BatchDisplay from './component/batch/BatchDisplay';
import TeacherDetails from './component/teachers/TeacherDetails';
import StudentDetails from './component/student/StudentDetails';
import TeacherRoot from './component//teacherComponent/TeacherRoot';
import 'bootstrap/dist/js/bootstrap.min.js'
import TSidebar from './component/teacherComponent/TSidebar';
import THomePage from './component/teacherComponent/THomePage'
import Batches from './component/teacherComponent/Batches';
import BatchStudent from './component/teacherComponent/BatchStudent'
import AssignmentList from './component/teacherComponent/AssignmentList';
import Assignments from './component/teacherComponent/Assignments';
import SubmissionList from './component/teacherComponent/SubmissionList';
import StudentList from './component/teacherComponent/StudentList';
import PaymentComponent from './apis/paymentGateWay';
import CourseDetailsHome from './courses/CourseDetailsHome';
import DivisionMasterForm from './component/teachers/DivisionMasterForm';

function App() {
  const[openSidebarToggle,setOpenSidebarToggle]=useState(false);  
  const[openSidebarToggleForTeacher,setOpenSidebarToggleForTeacher]=useState(false);

  const[login,setLogin]=useState(false);  
  const[userId,setUserId]=useState();

  const[loginRole,setLoginRole]=useState();
  const[credentialId,setCredentialId]=useState(0);
  
const openSidebar=()=>{

  setOpenSidebarToggle(!openSidebarToggle);  
}

const setSidebarToggleTeacher=()=>{
  setOpenSidebarToggleForTeacher(!openSidebarToggleForTeacher);  }

  const loginStatus=async(role, nUserId)=>{    
             
    if(role==="ROLE_TEACHER")
    { 
      //alert("TEACHER");        
      setLoginRole(role);
      setUserId(nUserId); 
      setCredentialId(nUserId);     
    }
    else if(role==="ROLE_STUDENT")
    {
      //alert("Student");
      setLoginRole(role);
    }
    else if(role==="ROLE_ADMIN"){
      
      setUserId(nUserId);
      setLoginRole(role);               
      //alert("ADMIN");
    }
    setLogin(true);
  }

  const logOut=()=>{

    setLogin(false);
  }

  return (
    <div >
  <Router>
          <>
           <Routes>
            <Route path='/courseDetails/:courseId' element={<CourseDetailsHome/>} />
            <Route path='/division' element={<DivisionMasterForm/>} />   
           </Routes>
         </>                  
      {        
        // if user is not login show the navigationBar and HomePage
        !login && 
        <div className='home-page'>
          <NavigationBar/>
          <HomePage loginStatus={loginStatus} instituteId={localStorage.getItem("INSTITUTE_ID")}/>                          
        </div>        
      }
      <div className="grid-container">                  
      {
        // if admin is login show  side bar
        login && loginRole==="ROLE_ADMIN" &&
        <Sidebar openSidebarToggle={openSidebarToggle} openSidebar={openSidebar}/>                    
      }
      {
        // if admin is login show the header
        login && loginRole ==="ROLE_ADMIN" &&
        <Header instituteId={localStorage.getItem("INSTITUTE_ID")} openSidebar={openSidebar}  logOutRoute={logOut}/>
      }     
      {
        login && loginRole ==="ROLE_ADMIN" &&                  
          <Routes>                        
              <Route path='/' element={<Home instituteId={localStorage.getItem("INSTITUTE_ID")}/>} />                 

              <Route path='/student' element={<Student instituteId={localStorage.getItem("INSTITUTE_ID")}/> }/> 
              <Route path='/course' element={<Course instituteId={localStorage.getItem("INSTITUTE_ID")} />}/> 
              <Route path='/batch' element={<Batch instituteId={localStorage.getItem("INSTITUTE_ID")} />}/> 
              <Route path='/teacher' element={<Teacher instituteId={localStorage.getItem("INSTITUTE_ID")}/>} /> 
              <Route path='/cDetails/:cId' element={<CourseDetails/>} /> 
              <Route path='/bDetails/:bId' element={<BatchDisplay />} /> 
              <Route path='/tDetails/:tId' element={<TeacherDetails/>} />
              <Route path='/stdDetails/:stdId' element={<StudentDetails instituteId={localStorage.getItem("INSTITUTE_ID")} />}/>                        
          </Routes>
      } 
      {
         loginRole==="ROLE_TEACHER" ?
         <>
          <TeacherRoot setSidebarToggleTeacher={setSidebarToggleTeacher}/>
          <TSidebar toggle={openSidebarToggleForTeacher}/>
          <Routes>
            <Route path='/tHome' element={<THomePage/>} />
            <Route path='/tBatch' element={<Batches instituteId={localStorage.getItem("INSTITUTE_ID")}  teacherId={localStorage.getItem("teacherId")}/>} />
            <Route path='/batchStudent/:bId' element={<BatchStudent teacherId={localStorage.getItem("userId")} />}/>
            <Route path='/assignment' element={<AssignmentList user={localStorage.getItem("userId")} teacherId={localStorage.getItem("teacherId")} />}/>
            <Route path='/assignments/:batchId' element={<Assignments/> }/>
            <Route path='/submissionList/:assignmentId' element={<SubmissionList/>}/>
            <Route path='/student-list' element={<StudentList teacherId={localStorage.getItem("teacherId")}/>} />
            <Route path='/payment' element={<PaymentComponent/>}/>
          </Routes>
         </>
         :
         <>
           <Routes>
            <Route path='/courseDetails/:courseId' element={<CourseDetailsHome/>} />
           </Routes>
         </>                  
      }                                  
        </div>       
        </Router>                     
    </div>
  );
}
export default App;