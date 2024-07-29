import React from "react"
import { FaHome } from 'react-icons/fa';
import './css/THomePage.css'
import {AreaChart, BarChart, Bar,Area, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const THomePage=()=>{

    const linkStyle = {
        margin: "70px 10px 0px -30px",
        padding: "0px 20px 20px 20px", 
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

    return(<div style={linkStyle} className="">
        <div className="tHomeCards">            
            <div className="tHomeCard" style={{backgroundColor:"#2378D0",color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> TOTAL STUDENT </p>
                    <p> 2000 </p>
                    <small> 80% increase </small>
                </div>
            </div>                                                                         
            <div className="tHomeCard" style={{backgroundColor:"#C26F04",color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> NEW JOINING </p>
                    <p> 2000 </p>
                    <small> 80% increase </small>
                </div>
            </div>                                                                         
            <div className="tHomeCard" style={{backgroundColor:"#464196",color:"white"}}>
                <div className="icon">
                    <FaHome/>
                </div>
                <div>
                    <p> TOTAL COURSES</p>
                    <p> 2000 </p>
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
            <div className="row shadow">
                <div className="col-12 col-sm-12 col-md-6">
                <ResponsiveContainer width="100%" height="100%">
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                    </BarChart>
                </ResponsiveContainer>
                </div>
             </div>
        </div>                          
    </div>)
}
export default THomePage