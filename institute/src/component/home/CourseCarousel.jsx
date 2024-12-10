import React, { useState, useEffect, Suspense } from 'react';
import profile3 from '../../images/pro3.webp'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { MdStarRate } from 'react-icons/md';
import { getCourseIdAndNameRecord } from '../../apis/courseApis';
import { FaInstagram,FaGithub,FaLinkedin  } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import c1 from '../../images/c1.jpg'
import { getBatchByInstitute,getBatchById } from '../../apis/batchApis';
import Batch from '../Batch';
import { Modal ,ModalBody, ModalHeader, Row,Col,Button, Card,CardBody, CardTitle,CardText,} from "reactstrap"
import Loader from '../Loader';
import { isEmpty } from 'lodash';
import { findBatchesByCourseId } from '../../apis/batchApis';


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
const CourseCarouselContent = ({instituteId}) => {

    const[batch,setBatch]=useState([]);
    const[detailsModal,setDetailsModal]=useState(false);
    const[singleBatch,setSingleBatch]=useState([]);    
    const[course,setCourse]=useState([]);
    const[courseDetailsToggle,setCourseDetailsToggle]=useState()
    const[batchesByCourseId,setBatchesByCourseId]=useState([]);

    const[update,setUpdate]=useState(false);

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

    const allBatches = [
        {
            "batchTitle": "Web Technology",
            "duration": "6 Months",
            "startDate": "2024-11-01",
            "endDate": "2025-05-08",
            "status": "Start Very Soon",
            "location": "Pune",
            "time": "14:55",
            "image": "25ba6802-6ce6-4b7c-a7a3-7e538ec62b4e_meeting.jpg.jpg",
            "teacherId": 902,
            "courseId": 2503,
            "instituteId": 2,
            "bid": 1602
        },
        {
            "batchTitle": "Web Technology",
            "duration": "6 Months",
            "startDate": "2024-11-23",
            "endDate": "2025-05-15",
            "status": "Start Very Soon",
            "location": "Mumbai",
            "time": "20:19",
            "image": "426b76a9-0d89-4181-a68f-9de1ddfa89e3_0_pUOSYV0s8QU-X-a0.jfif",
            "teacherId": 902,
            "courseId": 2503,
            "instituteId": 2,
            "bid": 1652
        }
    ]

    useEffect(()=>{

        const getBatch=(async ()=>{
            const response  = await getBatchByInstitute(2);

            setBatch(response);
        });

        getBatch();
    },[Batch]);

    const toggle=async (batchId)=>{
        
        const response = await getBatchById(batchId);
        setSingleBatch(response);
    }

    useEffect(()=>{

        console.log("Selected Batch details", singleBatch);
        setDetailsModal(true);
    },[singleBatch]);

    useEffect(()=>{

        const getCourseIdAndName=async ()=>{
            const response = await getCourseIdAndNameRecord(2);
            setCourse(response);
            console.log("course Id And Name ", response);
        };
        getCourseIdAndName();
        
    },[]);

    const setToggleForCourseDetails=async (courseId)=>{

        try
        {
            const response  = await findBatchesByCourseId(course);
            setBatchesByCourseId(response);
            setUpdate(!update);
        }
        catch(Error)
        {
            console.error(Error);
        }
        setCourseDetailsToggle(!courseDetailsToggle);
        alert(courseId);
    }
    useEffect(()=>{

        console.log(batchesByCourseId);
    },[update]);

    if(course===null || course === isEmpty)
    {
        <Loader/>
    }
   
    return (
        <section id="course">
            <h1>Our Popular Courses</h1>
            <p>Replenish Man Have Thing Gathering lights yielding shall you</p>

            <div className="courses-name shadow">
                    <div className="" style={{backgroundColor:"#F4F6FF"}}>
                        <p className="text-dark py-2"> Our Courses Types</p>
                    </div>
                    <div className="content">
                        <p>We have the most complete range of software training courses needed by the professionals around the world.Please do contact us for any queries related to the courses.</p>
                        <h5> Here are some of the popular courses we offer. </h5>
                    </div>
                    <div>
                        {                            
                            course.map((cls)=>(                                
                                <button className='btn btn-primary m-2' onClick={()=>setToggleForCourseDetails(cls.courseId)}>{cls.courseName} </button>
                            ))
                        }
                    </div>
                    
                </div>
            <Slider {...settings}>
                {
                    batch.map((data)=>(
                    <div className="course-box mr-4">
                    <Link to="#" className="course-box-link" onClick={()=>toggle(data.bid)}>
                        <div className="courses m-2">
                            <img src={`../batch/${data.image}`} alt="" style={{height:"200px"}}/>
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
                        <label> {singleBatch.batchTitle} </label>
                    </div>
                    <div className='col-4'>
                        <label className='title'> Duration </label>
                        <label> {singleBatch.duration} </label>
                    </div>
                    <div className='col-4'>
                        <label className='title'> Start Date </label>
                        <label> {singleBatch.startDate} </label>
                    </div>
                    <div className='col-4 mt-4'>
                        <label className='title'> End Date </label>
                        <label> {singleBatch.endDate} </label>
                    </div>
                    <div className='col-4 mt-4'>
                        <label className='title'> Location </label>
                        <label> {singleBatch.location} </label>
                    </div>
                    <div className='col-4 mt-4'>
                        <label className='title'>Batch Time </label>
                        <label> {singleBatch.time} </label>
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
  
    <Modal size="xl" isOpen={courseDetailsToggle} toggle={()=>setCourseDetailsToggle(!courseDetailsToggle)} className="Course Details">
    <ModalHeader toggle={()=>setCourseDetailsToggle(!courseDetailsToggle)} className="addBatchTitle"> Course Details  </ModalHeader>
      <ModalBody
        className="modals"
        style={{ background: "linear-gradient(to bottom, #94bbe9, #ffffff)" }}
      >
        <Row className="gy-4">
          {allBatches.map((batch, index) => (
            <Col lg={4} md={6} sm={12} key={index}>
              <Card className="shadow-sm h-100">
                <div className="card-image-container">
                  <img
                    src={profile3}
                    alt={batch.batchTitle}
                    className="img-fluid card-image text-center"
                  />
                </div>
                <CardBody>
                  <CardTitle tag="h5">{batch.batchTitle}</CardTitle>
                  <CardText>
                    <strong>Duration:</strong> {batch.duration}
                  </CardText>
                  <CardText>
                    <strong>Start Date:</strong> {batch.startDate}
                  </CardText>
                  <CardText>
                    <strong>End Date:</strong> {batch.endDate}
                  </CardText>
                  <CardText>
                    <strong>Location:</strong> {batch.location}
                  </CardText>
                  <CardText>
                    <strong>Time:</strong> {batch.time}
                  </CardText>
                  <CardText>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        batch.status === "Start Very Soon"
                          ? "text-warning"
                          : "text-success"
                      }
                    >
                      {batch.status}
                    </span>
                  </CardText>
                  <Button color="primary" block>
                    More Details
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </ModalBody>
    </Modal>
        </section>
    );    
};


// Home component with Suspense and fallback loader
function CourseCarousel({ instituteId }) {
    return (
      <Suspense fallback={<Loader />}>
        <CourseCarouselContent instituteId={instituteId} />
      </Suspense>
    );
  }
  

export default CourseCarousel;
