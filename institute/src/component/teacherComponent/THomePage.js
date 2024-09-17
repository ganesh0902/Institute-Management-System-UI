import { useState,useEffect } from "react";
import { FaHome } from 'react-icons/fa';
import './css/THomePage.css'
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart,Line   } from 'recharts';
import {getStudentCount, getTeacherCount, getCourseCount, getBatchCount} from '../../apis/adminHomeApi'
const THomePage=()=>{

    const instituteId=localStorage.getItem("INSTITUTE_ID");

  const[student,setStudent]=useState(0);
  const[teacher,setTeacher]=useState(0);
  const[course,setCourse]=useState(0);
  const[batch,setBatch]=useState(0); 

    const linkStyle = {
        margin: "70px 0px 0px -30px",
        padding: "0px 10px 20px 20px", 
        backgroundColor:"#F6F5F5"               
    };

    const data = [  

        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

      useEffect(()=>{

        getBatch();
        getStudent();
        getCourse();
        getTeacher();
        console.log("Institute Id Home is ",instituteId);
      
      },[])
    
      const getStudent=async ()=>{
        const response = await getStudentCount(instituteId);         
        setStudent(response);   
      }
    
      const getTeacher=async ()=>{  
        const response =  await getTeacherCount(instituteId);    
        setTeacher(response);  
      }
    
      const getCourse=async ()=>{
        const response  = await getCourseCount(instituteId);
        setCourse(response);      
      }
    
      const getBatch=async ()=>{
        const response = await getBatchCount(instituteId);
        setBatch(response);      
      }
      
    return(<div style={linkStyle} className="">
        <div className="tHomeCards">            
            <div className="tHomeCard" style={{backgroundColor:"#2378D0",color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> TOTAL STUDENTS </p>
                    <p> {student} </p>
                    <small> 80% increase </small>
                </div>
            </div>                                                                         
            <div className="tHomeCard" style={{backgroundColor:"#C26F04",color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> Teachers </p>
                    <p> {teacher} </p>
                    <small> 80% increase </small>
                </div>
            </div>                                                                         
            <div className="tHomeCard" style={{backgroundColor:"#464196",color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> TOTAL COURSES</p>
                    <p> {course} </p>
                    <small> 80% increase </small>
                </div>
            </div>                                                                         
            <div className="tHomeCard" style={{backgroundColor:"#BA0101", color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> FEES COLLECTIONS</p>
                    <p> 2000 </p>
                    <small> 80% increase </small>
                </div>
            </div>                                                                                               
        </div> 
        <div>
            <div className="row shadow mt-5">
                <div className="col-12 col-sm-12 col-md-6">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-12 col-sm-12 col-md-6 mt-3">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart 
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line  dataKey="pv" fill="#8884d8" />
                            <Line  dataKey="uv" fill="#82ca9d" />
                        </LineChart >
                    </ResponsiveContainer>
                </div>
            </div>
        </div>                         
    </div>)
}
export default THomePage