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

function App() {
  const[openSidebarToggle,setOpenSidebarToggle]=useState(false);  
  const[login,setLogin]=useState(false);
const openSidebar=()=>{

  setOpenSidebarToggle(!openSidebarToggle);  
}
  const loginStatus=()=>{    
    
    setLogin(true);
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
        login &&
        <Sidebar openSidebarToggle={openSidebarToggle} openSidebar={openSidebar}/>                    
      }
      {
        // if admin is login show the header
        login &&
        <Header openSidebar={openSidebar}/>
      }     
      {
        login &&                   
          <Routes>            
            
              <Route path='/' element={<Home/>} />        
              <Route path='/student' element={<Student/>}/> 
              <Route path='/course' element={<Course/>}/> 
              <Route path='/batch' element={<Batch/>}/> 
              <Route path='/teacher' element={<Teacher/>} /> 
              <Route path='/cDetails/:cId' element={<CourseDetails/>} /> 
              <Route path='/bDetails/:bId' element={<BatchDisplay/>} /> 
              <Route path='/tDetails/:tId' element={<TeacherDetails/>} />
              <Route path='/stdDetails/:stdId' element={<StudentDetails/>}/>                        
          </Routes>
      }                                   

          </div>       
        </Router>                     
    </div>
  );
}

export default App;
