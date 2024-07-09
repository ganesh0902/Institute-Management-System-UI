import { Link, NavLink } from "react-router-dom"
import NavigationBar from "./NavigationBar"
import profile from '../../images/pro1.webp'
import profile2 from '../../images/pro2.webp'
import profile3 from '../../images/pro3.webp'
import profile4 from '../../images/pro4.webp'
import { FaGraduationCap,FaInstagram ,FaFacebookF ,FaTwitter } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { Modal ,ModalBody,ModalHeader,Row,Col} from "reactstrap"
import { useState } from "react"
import CourseCarousel from './CourseCarousel'
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {registration, getToken, validateToken, getUserInformation} from '../../apis/authenticationApi'
import {getInstitute} from '../..//apis/instituteApi'
import {useAppContext } from '../common/AppProvider'
import Loader from "../Loader"

import { useEffect } from "react"

const HomePage=(props)=>{

    const[modalLogin,setModalLogin]=useState(false);
    const[modalSignUp,setModalSignUp]=useState(false);
    const[loaderToggle,setLoaderToggle]=useState(false);
    const[isWorking,setIsWorking]  =useState(false);
    const {loginStatus}=props;    
    
    const initialValueForSignIn={
        username:"",
        password:""
    }
    const formValidationSchemForSignIn= Yup.object().shape({
        username:Yup.string().required("Username is mandatory"),
        password:Yup.string().required("Password must not be empty")
    })
    const handFormSubmitForSignIn=async (value)=>{
                  
        localStorage.removeItem("INSTITUTED_ID");
        localStorage.removeItem("ROLE");
        localStorage.removeItem("userInformation");

        const token = await getToken(value);        
        console.log("user token is ",token);        
                
        if(token=="")
        {
            alert("Invalid Token");
            return;
        }
        else{
            localStorage.setItem("authToken",token);
        }               

        setTimeout(async ()=>{
                                                     
            const validate  = await validateToken(token);    

            if (!validate) {
                alert("Token validation failed");
                return;
            }
            localStorage.setItem("USER_ID",validate.username);
            const user =  await getUserInformation(validate.username);                  
            localStorage.setItem("ROLE",user.role);   

            const instituteDetails = await getInstitute(validate.username);

            if (instituteDetails && instituteDetails.id !== undefined) {
                localStorage.setItem("INSTITUTE_ID", instituteDetails.id);
                localStorage.setItem("userInformation",instituteDetails);
                loginStatus(localStorage.getItem("ROLE"));

            } else {
                console.error("Failed to get a valid Institute ID");
                alert("Failed to retrieve Institute details");
                return;
            }

        },500);
        
        if(token=="")
        {
            alert("Invalid Credential");
        }        

        if(!isWorking)
        {
            return(<div> <Loader/></div>)
        }
    };

    //formik for sign up
    const formInitialSchema={
        name:'',        
        email:'',
        password:'',
        role:'STUDENT'
    }    
    const formValidationSchema =Yup.object().shape({
        name:Yup.string().required("Name is mandatory"),
        email:Yup.string().required("Email is mandatory").email("Please Enter valid email"),
        password:Yup.string().required("Password is mandatory"),
        role:Yup.string().required("Role is not valid")        
    });

    const handleFormSubmit =async (value)=>{
        setLoaderToggle(true);
        console.log("Value",value);
        const response  = await registration(value); //call registration api to store registration information
        console.log("Response",response);
        setLoaderToggle(false);
        setModalSignUp(!modalSignUp);
    }

    const modalAction=(status)=>{

        setModalLogin(!modalLogin);
    }
    
    const modelSignUp=()=>
    {
        setModalLogin(!modalLogin);
        setModalSignUp(!modalSignUp);
        console.log("Modal signUp");
    }    

    useEffect(()=>{

        //logout();
    },[]);
   
    return(
        <div>            
             <NavigationBar modalAction={()=>modalAction()}/>              
            <section id="home">                
                <h2> Enhance Your Future With Tech Education</h2>
                <p>
                 Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                 when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>                
                <div className="btn">
                    <NavLink to="#" className="blue"> Learn More </NavLink>
                    <NavLink to="#" className="yellow"> Visits Courses  </NavLink>
                </div>
            </section>            
            {/* features */}
            <div id="features">
                <h1> Awesome Features </h1>
                <p> Replenish Man Have Thing Gathering lights yielding shall you </p>
                <div className="fea-base">
                    <div className="fea-box">
                        {<FaGraduationCap className="icon"/>}
                        <h3> Scholarship Facility </h3>
                        <p> One make creepage, man bearing theirs firmament will not great heaven </p>
                    </div>
                    <div className="fea-box">
                        {<FaGraduationCap className="icon"/>}
                        <h3> Daily Online Course </h3>
                        <p> One make creepage, man bearing theirs firmament will not great heaven </p>
                    </div>
                    <div className="fea-box">
                        {<FaGraduationCap className="icon"/>}
                        <h3> Global Certificate  </h3>
                        <p> One make creepage, man bearing theirs firmament will not great heaven </p>
                    </div>
                </div>                                                
            </div>

            {/* courses  */}            
            <br/>
            <CourseCarousel/>
            <br/>
            {/* registration section */}            

            <section id="registration" className="mt-4">
                <div className="reminder">
                    <p> Get 100 online courses free </p>
                    <h2> Register to Get It</h2>
                    <div className="time">
                        <div className="date">
                            18 <br/> Hours
                        </div>
                        <div className="date">
                            18 <br/> Minute
                        </div>
                        <div className="date">
                            18 <br/> Second
                        </div>
                    </div>  
                </div>
                <div className="form">
                    <h3> Create New Account Now!</h3>
                    <input  type="text" name="firstName" placeholder="First Name"></input>
                    <input  type="text" name="lastName" placeholder="Last Name"></input>
                    <input  type="text" name="Phone Number" placeholder="Phone Number"></input>
                    <input  type="text" name="Email" placeholder="Email"></input>
                    <input  type="text" name="password" placeholder="Password"></input>
                    <div className="btn">
                        <button to="#" className="yellow"> Submit Form  </button>                        
                    </div>
                </div>
            </section>

            {/* profile section */}
            <section id="expert">
                <h1> Community Expert </h1>
                <p> Replenish Man Have Thing Gathering lights yielding shall you </p>
                <div className="expert-box">
                    <div className="profile shadow">
                        <img src={profile}></img>
                        <h6> Sakshi </h6>
                        <p> Python and Angular Expert </p>
                        <div className="pro-links">
                            <NavLink to=""  className="icon"> <FaInstagram/></NavLink>
                            <NavLink to="" className="icon"> <FaFacebookF /> </NavLink> 
                            <NavLink to="" className="icon"> <FaTwitter/> </NavLink> 
                        </div>                        
                    </div>
                    <div className="profile">
                        <img src={profile2}></img>
                        <h6> Sakshi </h6>
                        <p> Python and Angular Expert </p>
                        <div className="pro-links">
                            <NavLink to=""  className="icon"> <FaInstagram/></NavLink>
                            <NavLink to="" className="icon"> <FaFacebookF /> </NavLink> 
                            <NavLink to="" className="icon"> <FaTwitter/> </NavLink> 
                        </div>
                    </div>
                    <div className="profile">
                        <img src={profile3}></img>
                        <h6> Sakshi </h6>
                        <p> Python and Angular Expert </p>
                        <div className="pro-links">
                            <NavLink to=""  className="icon"> <FaInstagram/></NavLink>
                            <NavLink to="" className="icon"> <FaFacebookF /> </NavLink> 
                            <NavLink to="" className="icon"> <FaTwitter/> </NavLink> 
                        </div>
                    </div>
                    <div className="profile">
                        <img src={profile4}></img>
                        <h6> Sakshi </h6>
                        <p> Python and Angular Expert </p>
                        <div className="pro-links">
                            <NavLink to=""  className="icon"> <FaInstagram/></NavLink>
                            <NavLink to="" className="icon"> <FaFacebookF /> </NavLink> 
                            <NavLink to="" className="icon"> <FaTwitter/> </NavLink> 
                        </div>
                    </div>
                </div>
            </section>

            <footer id="footer">
                <div className="footer-col">
                    <h3> Top Products </h3>
                    <li> Manage Reputation</li>
                    <li> Power Tools </li>
                    <li> Manage Reputation</li>
                    <li> Manage Website</li>
                    <li> Marketing Service </li>
                </div>
                <div className="footer-col">
                    <h3> Quick Links </h3>
                    <li> Manage Reputation</li>
                    <li> Power Tools </li>
                    <li> Manage Reputation</li>
                    <li> Manage Website</li>
                    <li> Marketing Service </li>
                </div>
                <div className="footer-col">
                    <h3> Features </h3>
                    <li> Manage Reputation</li>
                    <li> Power Tools </li>
                    <li> Manage Reputation</li>
                    <li> Manage Website</li>
                    <li> Marketing Service </li>
                </div>
                <div className="footer-col">
                    <h3> Resources </h3>
                    <li> Manage Reputation</li>
                    <li> Power Tools </li>
                    <li> Manage Reputation</li>
                    <li> Manage Website</li>
                    <li> Marketing Service </li>
                </div>
                <div className="footer-col">
                    <h3> New Letter </h3>
                    <p> You Can Truest us. We only send promo offers </p>
                    <div className="subscribe">
                        <input type="text" placeholder="Enter Your Email Address "></input>
                        <NavLink to="" className="yellow">Subscribe</NavLink>
                    </div>
                </div>
                <div className="copyright">
                    <p className="mt-4"> copy right 2024 all right reserved ! This template is done by <span> Ganesh Sakhare </span> </p>
                    <div className="pro-links">
                        <NavLink to=""  className="icon"> <FaInstagram/></NavLink>
                        <NavLink to="" className="icon"> <FaFacebookF /> </NavLink> 
                        <NavLink to="" className="icon"> <FaTwitter/> </NavLink>                         
                    </div>
                </div>
            </footer>
            <div className="dialogBox">                
                <Modal size="md" isOpen={modalLogin} toggle={()=>setModalLogin(!modalLogin)} style={{ width: '500px' }} id="signInBox">
                    <ModalHeader toggle={()=>setModalLogin(!modalLogin)}>
                        Sign In
                    </ModalHeader>
                    <ModalBody>
                        <h3 className="text-center"> Sign In </h3>
                    <Formik validationSchema={formValidationSchemForSignIn} 
                            initialValues={initialValueForSignIn} onSubmit={(value)=>handFormSubmitForSignIn(value)}>
                    <Form>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <label htmlFor="Username">Enter Username </label>
                            </div>
                            <Field type="text"
                                className="form-control username"
                                name="username"                                
                                placeholder="Enter Username" />
                            <span className="text-danger">
                                <ErrorMessage name="username" />
                            </span>
                        </Col>
                        <Col lg={12} className="mt-3">
                            <div>
                                <label htmlFor="Password">Enter Password </label>
                            </div>
                            <Field type="password"
                                name="password"
                                className="form-control w-4"                                
                                placeholder="Enter Password" />
                                <span className="text-danger">
                                    <ErrorMessage name="password"/>
                                </span>
                        </Col>
                        <Col lg={12} className="mt-3">
                            <span> Lost Password :</span> <NavLink to="" className="ml-3"> Click Here</NavLink>
                        </Col>
                        <Col lg={12} className="mt-5 text-center mb-2">
                            <button type="submit" className="btn btn-primary" id="btnSubmit"> Submit </button>
                            <NavLink to="" className="icon" id="btnSignUp" onClick={()=>modelSignUp(!modalSignUp)}>Sign Up </NavLink>                         
                        </Col>                       
                        </Row>
                        </Form>                                
                        </Formik>
                    </ModalBody>
                </Modal>
                {/* sign up modal */}
                <Modal size="lg" isOpen={modalSignUp} toggle={()=>setModalSignUp(!modalSignUp)} style={{ width: '500px' }}>
                    <ModalHeader toggle={()=>setModalSignUp(!modalSignUp)}>
                        Sign Up
                    </ModalHeader>                    
                    <ModalBody className="modals">
                        <Formik initialValues={formInitialSchema} 
                            validationSchema={formValidationSchema}
                            onSubmit={(value)=>handleFormSubmit(value)}>
                        <Form>
                        <Row>
                            <Col lg={12} md={12}>
                                <div>
                                    <label htmlFor="Full Name"> </label>
                                </div>
                                <Field 
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Full Name"                                
                                />
                                <span className="text-danger">
                                    <ErrorMessage name="name" className="text-danger"/>
                                </span>
                            </Col>                            
                            <Col lg={12} md={12}>
                                <div>
                                    <label htmlFor="Email"> </label>
                                </div>
                                <Field type="text"
                                    className="form-control"
                                    name="email"                                    
                                    placeholder="Enter Email"/>
                                <span className="text-danger">
                                    <ErrorMessage name="email"/>
                                </span>
                            </Col>
                            <Col lg={12} md={12}>
                                <div>
                                    <label htmlFor="Password"> </label>
                                </div>
                                <Field type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"                                    
                                    />
                                <span className="text-danger">
                                    <ErrorMessage name="password"/>
                                </span>    
                            </Col>                           
                            <Col lg={12} md={12} className="mt-5 mb-3 text-center">
                                <button type="submit" className="btn btn-primary" id="btnSubmit" > Submit </button>
                                <NavLink to="" className="icon" id="btnSignUp" onClick={()=>modelSignUp()}>Sign In </NavLink>                         
                            </Col>  
                            {   loaderToggle && <Loader/>  }
                        </Row>
                        </Form>   
                        </Formik>
                    </ModalBody>
                </Modal>                
            </div>
        </div>
    )
}
export default HomePage