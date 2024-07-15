import logo from './logo.svg';
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
import Login from './component/authentication/Login';
import HomePage from './component/home/HomePage';
import NavigationBar from './component/home/NavigationBar'
import BatchDisplay from './component/batch/BatchDisplay';
import TeacherDetails from './component/teachers/TeacherDetails';
import StudentDetails from './component/student/StudentDetails';
import TeacherHeader from './component//teacherComponent/TeacherHeader'

function App() {
  const[openSidebarToggle,setOpenSidebarToggle]=useState(false);  
  const[login,setLogin]=useState(false);  
const openSidebar=()=>{

  setOpenSidebarToggle(!openSidebarToggle);  
}

  const[loginRole,setLoginRole]=useState();

  const loginStatus=(role)=>{    
    
    if(role==="TEACHER")
    {
      alert(role);
      setLoginRole(role);
    }
    else if(role=="STUDENT")
    {
      alert(role);
      setLoginRole(role);
    }
    else if(role==="ADMIN"){

      alert(role);
      setLoginRole(role);
    }
    setLogin(true);
  }

  const logOut=()=>{

    setLogin(false);
  }

  return (
    <div >
  <Router>
      {
        // if user is not login show the navigationBar and HomePage
        !login && 
        <div className='home-page'>
          <NavigationBar/>
          <HomePage loginStatus={loginStatus}/>          
        </div>        
      }
      <div className="grid-container">                  
      {
        // if admin is login show  side bar
        login && loginRole=="ADMIN" &&
        <Sidebar openSidebarToggle={openSidebarToggle} openSidebar={openSidebar}/>                    
      }
      {
        // if admin is login show the header
        login && loginRole =="ADMIN" &&
        <Header instituteId={localStorage.getItem("INSTITUTE_ID")} openSidebar={openSidebar}  logOutRoute={logOut}/>
      }     
      {
        login && loginRole =="ADMIN" &&                  
          <Routes>                        
              <Route path='/' element={<Home instituteId={localStorage.getItem("INSTITUTE_ID")}/>} />        
              <Route path='/student' element={<Student instituteId={localStorage.getItem("INSTITUTE_ID")}/> }/> 
              <Route path='/course' element={<Course instituteId={localStorage.getItem("INSTITUTE_ID")} />}/> 
              <Route path='/batch' element={<Batch instituteId={localStorage.getItem("INSTITUTE_ID")}/>}/> 
              <Route path='/teacher' element={<Teacher instituteId={localStorage.getItem("INSTITUTE_ID")}/>} /> 
              <Route path='/cDetails/:cId' element={<CourseDetails/>} /> 
              <Route path='/bDetails/:bId' element={<BatchDisplay/>} /> 
              <Route path='/tDetails/:tId' element={<TeacherDetails/>} />
              <Route path='/stdDetails/:stdId' element={<StudentDetails instituteId={localStorage.getItem("INSTITUTE_ID")} />}/>                        
          </Routes>
      } 
      {/* {
         loginRole!="ADMIN" &&
         <TeacherHeader/>
      }                                   */}
        </div>       
        </Router>                     
    </div>
  );
}

export default App;
