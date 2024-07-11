import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { MdStarRate } from 'react-icons/md';
import NavigationBar from "./NavigationBar"
import { FaInstagram,FaGithub,FaLinkedin  } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { IoMdTime } from 'react-icons/io';
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
import { getBatchByInstitute } from '../../apis/batchApis';
import Batch from '../Batch';
import { useState } from 'react';
import { Modal ,ModalBody, ModalHeader, Row,Col, Input} from "reactstrap"


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

    const[batch,setBatch]=useState([]);
    const[detailsModal,setDetailsModal]=useState(false);

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

    useEffect(()=>{

        const getBatch=(async ()=>{
            const response  = await getBatchByInstitute(1);
            setBatch(response);
        });

        getBatch();
    },[Batch]);

    useEffect(()=>{

        console.log("Batch",batch);

    },[batch]);


    return (
        <section id="course">
            <h1>Our Popular Courses</h1>
            <p>Replenish Man Have Thing Gathering lights yielding shall you</p>
            <Slider {...settings}>
                {
                    batch.map((data)=>(
                    <div className="course-box mr-4">
                    <Link to="#" className="course-box-link" onClick={()=>setDetailsModal(!detailsModal)}>
                        <div className="courses m-2">
                            <img src={`../batch/${data.image}`} alt="" />
                            <div className="details">
                                <span>Start Date {data.bid}</span>
                                <h6>{data.batchTitle}</h6>
                                <div className="start">
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <MdStarRate />
                                    <span>(202)</span>
                                </div>
                            </div>
                            <div className="cost">$ {data.course.fees}</div>
                        </div>
                    </Link>
                    </div>                                
                    ))
                }
            </Slider>

        <Modal size="xl" isOpen={detailsModal} toggle={()=>setDetailsModal(!detailsModal)} className="batchModal">
        <ModalHeader toggle={()=>setDetailsModal(!detailsModal)} className="addBatchTitle"> Course Details  </ModalHeader>
        <ModalBody className="modals" style={{background: 'linear-gradient(to bottom, #94bbe9, #ffffff)'}}>
        <Row className='shadow p-3 shadow'>
            <Col lg={3} md={12}>
                <div className='details-image shadow'>
                    <img src={c1}></img>
                </div>
            </Col>
            <Col lg={9} md={12}>
                <div className='course-details'>
                   <div className='row'>
                    <div className='col-4'>
                        <label className='title'>Batch Title</label>
                        <label> Java Developer </label>
                    </div>
                    <div className='col-4'>
                        <label className='title'> Duration </label>
                        <label> 6 Months </label>
                    </div>
                    <div className='col-4'>
                        <label className='title'> Start Date </label>
                        <label> 05-Jun-2022 </label>
                    </div>
                    <div className='col-4 mt-4'>
                        <label className='title'> End Date </label>
                        <label> 05-Dec-2022 </label>
                    </div>
                    <div className='col-4 mt-4'>
                        <label className='title'> Location </label>
                        <label> Pune </label>
                    </div>
                    <div className='col-4 mt-4'>
                        <label className='title'>Batch Time </label>
                        <label> 10:30 PM </label>
                    </div>
                    <div className='col-4 mt-4'>
                        <label className='title'>Skills </label>
                        <label> Html, Css, JavaScript, Spring boot, Hibernate, Microservices </label>
                    </div>
                    <div className='col-4 mt-4'>
                        <label className='title'>Fees </label>
                        <label> $5000 </label>
                    </div>
                    <div className='col-4 mt-4'>
                        <button className='btn form-control btn-primary buy-btn'> Buy </button>
                    </div>
                   </div>
                </div>
            </Col>            
            <Col lg={3} md={12} className="mt-5 shadow teacher-profile-details">
            <div className="teacher-profile text-center">
                    <img class="text-center shadow-4-strong" alt="avatar2" src={c1} />
            </div>
            <div className='teacher-information text-center mt-2'>
                 <label className='text-dark'> Ganesh Sakhare </label> <br/>  
                 <small> Java Full Stack Developer </small>
            </div>
            <div className='teacher-social-media-link mt-2'>
                 <li className='text-decoration-none pt-2'>
                    <ul><a href=""><FaInstagram/></a> Instagram </ul>
                    <ul><a href=""><CiTwitter/></a> Twitter </ul>
                    <ul><a href=""><FaLinkedin/></a> Linkedin </ul>                    
                 </li>
            </div>
            <div className='text-center my-2'>
                <button className='btn btn-primary text-center px-5 view-btn'> View </button>  
            </div>            
            </Col>            
        </Row>                                                           
        </ModalBody>
        </Modal>
        </section>
    );    
};

export default CourseCarousel;
