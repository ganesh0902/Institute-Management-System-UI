import React from 'react'
import UserProfile from './component/UserProfile'
import { Modal ,ModalBody,ModalHeader,Row,Col, Input} from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
 import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import {getInstitute} from '../src/apis/instituteApi';
import Loader from "../src//component/Loader";
import {logOut} from '../src/apis/authenticationApi'

function Header({openSidebar,logOutRoute,instituteId}) {
  

  const[profileToggle,setUserProfileToggle]=useState(false);
  const[changePasswordToggle,setChangePasswordToggle]=useState(false);
  const[notificationToggle,setNotificationToggle]=useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [userInformation,setUserInformation]=useState("");
  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };
  
  const userId = localStorage.getItem("USER_ID");

  alert("USER ID in header"+userId);
  const getUserInformation=(user)=>{

    setUserInformation(user);
  }

  useEffect(()=>{

    const getUserDetails=async ()=>{
      
      if(userId!==undefined){
      const details = await getInstitute(userId);
      setUserInformation(details);
      console.log("User Details in header ",details); 
      }
      else
      {
        console.log("User Details is not fetch");
        alert("User Id is ",userId);
      }
    }
    getUserDetails();
  },[]);

  const userLogOut=()=>{
    logOut();
    logOutRoute();
  }
  
  if(!userInformation)
  {
    return(<div><Loader/></div>)
  }

  return (
    <header className='header'>
    <div className='menu-icon'>
        <BsJustify className='icon' onClick={openSidebar}/>
    </div>
    <div className='header-left'>
        <BsSearch className='icon'/>        
    </div>    
    <div className='header-right'>
        <Link to="#" className='text-white' onClick={()=>setNotificationToggle(!notificationToggle)}> <BsFillBellFill className='icon'/></Link>
        <Link to="#" onClick={()=>setUserProfileToggle(!profileToggle)}> 
          <UserProfile className='icon'> </UserProfile>
        </Link>        
    </div>

    <Modal size='sm' isOpen={notificationToggle} toggle={()=>setNotificationToggle(!notificationToggle)} className="batchModal">
      <ModalHeader toggle={()=>setNotificationToggle(!notificationToggle)} className="user-profile-header"> Notification </ModalHeader>
        <ModalBody className="user-profile-modals">
          <Row>
            <Col sm={12}>
                <span> Empty </span>
            </Col>
          </Row>
    </ModalBody>
    </Modal>    

    <Modal size='xl' isOpen={profileToggle} toggle={()=>setUserProfileToggle(!profileToggle)} className="user=profile-modal">
      <ModalHeader toggle={()=>setUserProfileToggle(!profileToggle)} className="user-profile-header"> User Profile </ModalHeader>
        <ModalBody className="user-profile-modals">
          <Row className='m-3 shadow pt-3 pb-5 border-rounder'>
            <Col sm={6} className="mt-2">
                <h4> Basic Info </h4>
                <hr/>
            </Col>
            <Col sm={6}>
                <div className=''>
                  <button className='btn btn-primary mr-3' onClick={()=>userLogOut()}> Log out </button>                  
                </div>                
                <hr className=''/>
            </Col>
            <Col xs={12} sm={3} md={1}  className="">
              <div>
                <img className="dialog-user-profile"  src="https://media.istockphoto.com/id/1334828664/photo/indian-architect.jpg?s=2048x2048&w=is&k=20&c=oA6ZTH1yDYIhVy03zoPPpMceipLqBglGNlnJW_5amZw="></img>                                
              </div>
            </Col>
            <Col sm={11} md={6} className="pl-sm-0 pl-md-4 mt-3 mt-sm-0">
                <div className='mr-4 information'>
                  <label> {userInformation.instituteName} </label> <br/>
                  <span> ID : {userInformation.id}</span> <br/>
                  <button className='change-password-button shadow' onClick={()=>setChangePasswordToggle(!changePasswordToggle)}> <RiLockPasswordFill /> Change Password </button>
                </div>
            </Col>
            <Row className='mt-4'>
              <Col lg={6} md={12}>
                <label> First Name </label>
                <input type="text" className='form-control text-input' value="Ganesh" />
              </Col>
              <Col lg={6} md={12}>
                <label className='drop-down-list'> Last Name </label>
                <input type="text" className='form-control' value="Sakhare" />
              </Col>
              <Col lg={6} md={12} className="mt-3">
                  <Row>
                  <Col lg={6} md={12}>
                      <label> Department</label><br/>
                      <select>
                        <option> {userInformation.department}</option>
                      </select>
                  </Col>
                  <Col lg={6} md={12}>
                      <div className='drop-down-list'>
                        <label> Position </label><br/>
                        <select>
                          <option> Select</option>
                        </select>
                      </div>
                  </Col>
                  </Row>
              </Col>
              <Col lg={6} md={12}>
                  <Row>
                  <Col lg={6} md={12} className="mt-3">
                    <div className='drop-down-list'>
                      <label> Gender</label><br/>
                      <select>
                        <option> Select</option>
                      </select>
                      </div>
                  </Col>
                  <Col lg={6} md={12} className="mt-3">
                      <div className='drop-down-list'>
                        <label> Start Date </label><br/>                        
                          <input type="text" value={userInformation.startDate} disable className='form-control' />                        
                      </div>
                  </Col>
                  </Row>
              </Col>
            </Row>            
          </Row>  
          <Row className='m-3 shadow'>
          <Col lg={6} md={12} className=" shadow">{/* Contact section start*/}          
            <Row>
              <Col sm={12} className="ml-4">
                <h4 className='mt-2'> Contact</h4>
                <hr></hr>
              </Col>
              <Col  xs={12} sm={4} md={2}>                
                <div>
                  <img className="dialog-contact-profile"  src="https://media.istockphoto.com/id/1334828664/photo/indian-architect.jpg?s=2048x2048&w=is&k=20&c=oA6ZTH1yDYIhVy03zoPPpMceipLqBglGNlnJW_5amZw=" />                  
                </div>                 
              </Col>
              <Col sm={8} xm={12} md={10} className="pl-sm-4 pl-md-4 mt-3 mt-sm-0">
                <div className='ml-2'>
                  <label> {userInformation.address.phoneNumber} </label><br/>
                  <small> {userInformation.email}</small>
                </div>
              </Col>
            </Row>
            <Row className='mb-3 mt-1'>
              <Col lg={6} md={12} className="mt-3">
                <label>Phone:</label>
                <input type="text" className='form-control' value={userInformation.address.phoneNumber}  />
              </Col>
              <Col lg={6} md={12} className="mt-3">
                <label>Email:</label>
                <input type="text" className='form-control' value={userInformation.email}/>
              </Col>
              <Col sm={12} className="mt-3">
                <label>Domain Username:</label>
                <input type="text" className='form-control' value={userInformation.domainUsername}/>
              </Col>
              <Col sm={12} className="mt-3">
                <label> Status: </label>
                <input type="text" className='form-control' value={userInformation.status}/>
              </Col>
              <Col sm={12} className="mt-3 ">
                <button type='submit' className='submit-btn btn btn-primary form-control'> Update </button>                
              </Col>
            </Row>            
          </Col>
          <Col lg={6} md={12} className="mt-2 shadow user-profile-address"> {/* address section start*/}          
            <Row>
              <Col sm={12}>
                <h5 className='mt-2'> Address </h5>
                <hr/>
              </Col>
              <Col sm={2}>                
                <div>
                  <img className="dialog-contact-profile"  src="https://media.istockphoto.com/id/1334828664/photo/indian-architect.jpg?s=2048x2048&w=is&k=20&c=oA6ZTH1yDYIhVy03zoPPpMceipLqBglGNlnJW_5amZw=" />                  
                </div>                
              </Col>
              <Col sm={10}>
                <div className='ml-2'>
                  <label> {userInformation.address.streetName} &nbsp; {userInformation.address.city} &nbsp; {userInformation.address.state} &nbsp; {userInformation.address.country}</label>                  
                </div>
              </Col>            
            </Row>
            <Row className='mb-3 mt-3'>
              <Col lg={6} md={12}>
                <label className=''>Country:</label>    
                <div className='drop-down-list'>
                <select>
                  <option> {userInformation.address.country} </option>              
                </select>
                </div>
              </Col>
              <Col lg={6} md={12}>
              <div className='drop-down-list'>
                <label>City:</label>    
                <select>
                  <option> {userInformation.address.city} </option>                 
                </select>
              </div>
              </Col>              
              <Col sm={12} className="mt-3">
              <div className='drop-down-list'>
                <label>State:</label>    
                <select className='p-1'>
                  <option> {userInformation.address.state} </option>
                </select>
              </div>
              </Col>
              <Col sm={12} className="mt-4">
                <label>Address:</label>    
                <textarea type="text" className='form-control'/>
              </Col>
              <Col sm={12} className="mt-3">
                <label>Address:</label>    
                <input type="text" className='form-control'/>
              </Col>
            </Row>            
          </Col>
          </Row>                 
        </ModalBody>
    </Modal>    

     <Modal size='md' isOpen={changePasswordToggle} toggle={()=>setChangePasswordToggle(!changePasswordToggle)} className="batchModal">
      <ModalHeader toggle={()=>setChangePasswordToggle(!changePasswordToggle)} className="user-profile-header"> Change Password </ModalHeader>
        <ModalBody className="change-password-modals">          
            <Row>
              <Col sm={12}>
              <small> Current Password </small>  
              <input
                type={showCurrentPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
            />
              <button
                type="button"
                onClick={()=>setShowCurrentPassword(!showCurrentPassword)}
                style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                <FontAwesomeIcon className='current-passwordToggle' icon={showCurrentPassword ? faEyeSlash : faEye} />
              </button>              
              </Col>
                <hr/>
              <Col sm={12}>
                <small>  Password </small>  
                <input 
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
              />
                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  <FontAwesomeIcon className='passwordToggle' icon={showPassword ? faEyeSlash : faEye} />
                </button>              
              </Col>
              <Col sm={12}>
                <small> confirm Password </small>  
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
              />
                <button
                  type="button"
                  onClick={()=>setConfirmPassword(!showConfirmPassword)}
                  style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  <FontAwesomeIcon className='confirm-passwordToggle' icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>              
              </Col>
            </Row>
        </ModalBody>
      </Modal>            
    </header>
  )
}
export default Header