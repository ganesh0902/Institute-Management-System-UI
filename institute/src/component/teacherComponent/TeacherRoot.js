import React from 'react'
import THeader from '..//teacherComponent/THeader'
const TeacherRoot=({setSidebarToggleTeacher})=>{
    return(
        <div className='' style={{width:"20px"}}>
            <THeader setSidebarToggleTeacher={setSidebarToggleTeacher}/>
        </div>
    )
}
export default TeacherRoot