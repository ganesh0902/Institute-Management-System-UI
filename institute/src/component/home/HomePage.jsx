import { Link, NavLink } from "react-router-dom"
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
import { FaGraduationCap,FaInstagram ,FaFacebookF ,FaTwitter } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { Modal ,ModalBody,ModalHeader,Row,Col} from "reactstrap"
import { useState } from "react"
import CourseCarousel from './CourseCarousel'
const HomePage=(props)=>{

    const[modalLogin,setModalLogin]=useState(false);
    const[modalSignUp,setModalSignUp]=useState(false);
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");

    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[email,setEmail]=useState("");
    const[rPassword,setRPassword]=useState("");

    const {loginStatus}=props;

    const modalAction=(status)=>{

        setModalLogin(!modalLogin);
    }

    const modelSignUp=()=>
    {
        setModalLogin(!modalLogin);
        setModalSignUp(!modalSignUp);
        console.log("Modal signUp");
    }
    const submit=()=>{
        console.log(username);
        console.log(password);  
        loginStatus();
    }

    const submitRegistration=()=>{
        console.log("Registration Save");
    }


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
                    <div className="profile">
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
                    <Row>
                        <Col lg={12}>
                            <div>
                                <label htmlFor="Email"> </label>
                            </div>
                            <input type="text"
                                className="form-control username"
                                name="email"
                                onChange={(event)=>setUsername(event.target.value)}
                                placeholder="Enter Email"></input>
                        </Col>
                        <Col lg={12}>
                            <div>
                                <label htmlFor="Password"> </label>
                            </div>
                            <input type="password"
                                name="password"
                                className="form-control w-4"
                                onChange={(event)=>setPassword(event.target.value)}
                                placeholder="Enter Password"></input>
                        </Col>
                        <Col lg={12} className="mt-3">
                            <span> Lost Password :</span> <NavLink to="" className="ml-3"> Click Here</NavLink>
                        </Col>
                        <Col lg={12} className="mt-5 text-center mb-2">
                            <button className="btn btn-primary" id="btnSubmit" onClick={()=>submit()}> Submit </button>
                            <NavLink to="" className="icon" id="btnSignUp" onClick={()=>modelSignUp(!modalSignUp)}>Sign Up </NavLink>                         
                        </Col>                       
                        </Row>
                    </ModalBody>
                </Modal>
                {/* sign up modal */}
                <Modal size="lg" isOpen={modalSignUp} toggle={()=>setModalSignUp(!modalSignUp)} style={{ width: '500px' }}>
                    <ModalHeader toggle={()=>setModalSignUp(!modalSignUp)}>
                        Sign Up
                    </ModalHeader>
                    <ModalBody className="modals">
                        <Row>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor="First Name"> </label>
                                </div>
                                <input 
                                type="text"
                                className="form-control"
                                placeholder="Enter First Name"
                                onChange={(event)=>setFirstName(event.target.value)}
                                />
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor="Last Name"> </label>
                                </div>
                                <input 
                                    type="text"
                                    className="form-control"
                                    onChange={(event)=>setLastName(event.target.value)}
                                    placeholder="Enter Last Name"></input>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor="Email"> </label>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    onChange={(event)=>setEmail(event.target.value)}
                                    placeholder="Enter Email"/>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor="Password"> </label>
                                </div>
                                <input type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    onChange={(event)=>setRPassword(event.target.value)}
                                    />
                            </Col>
                            <Col lg={12} className="mt-5 mb-3 text-center">
                                <button className="btn btn-primary" id="btnSubmit" onClick={()=>submitRegistration()}> Submit </button>
                                <NavLink to="" className="icon" id="btnSignUp" onClick={()=>modelSignUp()}>Sign In </NavLink>                         
                            </Col>                            
                        </Row>
                    </ModalBody>
                </Modal>                
            </div>
        </div>
    )
}
export default HomePage