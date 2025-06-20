import React, { useState, useEffect, Suspense } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BsFillArchiveFill, BsFillGearFill } from 'react-icons/bs';
import { getStudentCount, getTeacherCount, getCourseCount, getBatchCount } from './apis/adminHomeApi';
import Loader from './component/Loader';

// HomeContent component to handle fetching data and rendering UI
const HomeContent = ({ instituteId }) => {
  const [student, setStudent] = useState(0);
  const [teacher, setTeacher] = useState(0);
  const [course, setCourse] = useState(0);
  const [batch, setBatch] = useState(0);

  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  useEffect(() => {
    getBatch();
    getStudent();
    getCourse();
    getTeacher();
  }, [instituteId]);

  const getStudent = async () => {
    const response = await getStudentCount(instituteId);
    setStudent(response);
  };

  const getTeacher = async () => {
    const response = await getTeacherCount(instituteId);    
    setTeacher(response);
  };

  const getCourse = async () => {
    const response = await getCourseCount(instituteId);
    setCourse(response);
  };

  const getBatch = async () => {
    const response = await getBatchCount(instituteId);
    setBatch(response);
  };

  return (
    <main className='main-container'>      
      <div className='main-cards m-2'>
        <div className='card'>
          <div className='card-inner'>
            <h2> Course Available</h2>
            <BsFillArchiveFill className='card-icon' />
          </div>
          <h2>{course}</h2>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h2> Batch</h2>
            <BsFillGearFill className='card-icon' />
          </div>
          <h2>{batch}</h2>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h2> Student </h2>
            <BsFillGearFill className='card-icon' />
          </div>
          <h2>{student}</h2>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h2> Teacher</h2>
            <BsFillArchiveFill className='card-icon' />
          </div>
          <h2>{teacher}</h2>
        </div>
      </div>
      <div className='charts'>
        <div className='chart'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='pv' fill='#8884d8' activeBar={<Rectangle fill='pink' stroke='blue' />} />
              <Bar dataKey='uv' fill='#82ca9d' activeBar={<Rectangle fill='gold' stroke='purple' />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='chart'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='pv' fill='#8884d8' activeBar={<Rectangle fill='pink' stroke='blue' />} />
              <Bar dataKey='uv' fill='#82ca9d' activeBar={<Rectangle fill='gold' stroke='purple' />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>    
    </main>
  
  );
};

// Home component with Suspense and fallback loader
function Home({ instituteId }) {
  return (
    <Suspense fallback={<Loader />}>
      <HomeContent instituteId={instituteId} />
    </Suspense>
  );
}

export default Home;
