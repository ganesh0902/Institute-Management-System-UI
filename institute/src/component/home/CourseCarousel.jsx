import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { MdStarRate } from 'react-icons/md';
import NavigationBar from "./NavigationBar"
import c1 from '../../images/c1.jpg'
import c2 from '../../images/c2.jpg'
import c3 from '../../images/c3.jpg'
import c4 from '../../images/c4.jpg'
import c5 from '../../images/c5.jpg'
import c6 from '../../images/c6.jpg'
import profile from '../../images/pro1.webp'
import profile2 from '../../images/pro2.webp'
import profile3 from '../../images/pro3.webp'
import profile4 from '../../images/pro4.webp'
import { useRef,useEffect } from 'react';

const CustomPrevArrow = (props) => (
    <button {...props} className="slick-prev">
        Previous
    </button>
);

const CustomNextArrow = (props) => (
    <button {...props} className="slick-next">
        Next
    </button>
);
const CourseCarousel = () => {
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 2000,
        cssEase: 'ease-out',
        arrows: true,
        prevArrow: <CustomPrevArrow />, // Custom previous arrow component
        nextArrow: <CustomNextArrow />, 
        pauseOnHover: true,
        lazyLoad: 'ondemand',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };   
    return (
        <section id="course">
            <h1>Our Popular Courses</h1>
            <p>Replenish Man Have Thing Gathering lights yielding shall you</p>
            <Slider {...settings}>
                <div className="course-box mr-4">
                    <Link to="#" className="course-box-link">
                        <div className="courses">
                            <img src={c1} alt="" />
                            <div className="details">
                                <span>Updated 09/02/2024</span>
                                <h6>JavaScript Beginners Course</h6>
                                <div className="start">
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <span>(202)</span>
                                </div>
                            </div>
                            <div className="cost">$49.99</div>
                        </div>
                    </Link>
                </div>                
                <div className="course-box ml-2">
                    <Link to="#" className="course-box-link">
                        <div className="courses">
                            <img src={c2} alt="" />
                            <div className="details">
                                <span>Updated 09/02/2024</span>
                                <h6>JavaScript Beginners Course</h6>
                                <div className="start">
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <span>(202)</span>
                                </div>
                            </div>
                            <div className="cost">$49.99</div>
                        </div>
                    </Link>
                </div>
                <div className="course-box ml-2">
                    <Link to="#" className="course-box-link">
                        <div className="courses">
                            <img src={c2} alt="" />
                            <div className="details">
                                <span>Updated 09/02/2024</span>
                                <h6>JavaScript Beginners Course</h6>
                                <div className="start">
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <span>(202)</span>
                                </div>
                            </div>
                            <div className="cost">$49.99</div>
                        </div>
                    </Link>
                </div>
                <div className="course-box ml-2">
                    <Link to="#" className="course-box-link">
                        <div className="courses">
                            <img src={c2} alt="" />
                            <div className="details">
                                <span>Updated 09/02/2024</span>
                                <h6>JavaScript Beginners Course</h6>
                                <div className="start">
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <span>(202)</span>
                                </div>
                            </div>
                            <div className="cost">$49.99</div>
                        </div>
                    </Link>
                </div>
                <div className="course-box ml-2">
                    <Link to="#" className="course-box-link">
                        <div className="courses">
                            <img src={c2} alt="" />
                            <div className="details">
                                <span>Updated 09/02/2024</span>
                                <h6>JavaScript Beginners Course</h6>
                                <div className="start">
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <span>(202)</span>
                                </div>
                            </div>
                            <div className="cost">$49.99</div>
                        </div>
                    </Link>
                </div>
                <div className="course-box ml-2">
                    <Link to="#" className="course-box-link">
                        <div className="courses">
                            <img src={c2} alt="" />
                            <div className="details">
                                <span>Updated 09/02/2024</span>
                                <h6>JavaScript Beginners Course</h6>
                                <div className="start">
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <span>(202)</span>
                                </div>
                            </div>
                            <div className="cost">$49.99</div>
                        </div>
                    </Link>
                </div>
            </Slider>
        </section>
    );
};
export default CourseCarousel;
