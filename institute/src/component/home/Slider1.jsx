import './/..//..//component/Slider.css'
import React from 'react';
import { Link } from 'react-router-dom';
const Slider1 =({batch})=>{
    return(
        <div className="static-slider">
        {batch.map((data) => (
            <div className="course-card" key={data.bid}>
            <Link to="#" className="course-box-link">
                <div className="courses">
                <img src={`../batch/${data.image}`} alt="" />
                <div className="details">
                    <span>Start Date {data.bid}</span>
                    <h6>{data.batchTitle}</h6>
                    <div className="start">
                    ★ ★ ★ ★ ★ <span>(202)</span>
                    </div>
                </div>
                <div className="cost">$ {data.course.fees}</div>
                </div>
            </Link>
            </div>
        ))}
        </div>
    );
}
export default Slider1;