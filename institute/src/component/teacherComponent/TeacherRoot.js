import React from 'react'
import THeader from '..//teacherComponent/THeader'
const TeacherRoot=({setSidebarToggleTeacher})=>{
    return(
        <div className='bg-dark' style={{width:"20px"}} >
            <THeader setSidebarToggleTeacher={setSidebarToggleTeacher}/>
        </div>
    )
}
export default TeacherRoot