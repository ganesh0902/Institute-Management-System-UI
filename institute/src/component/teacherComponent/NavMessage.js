import {React, useState,useEffect} from 'react'
import UserProfile from '../..//component/UserProfile'
import { NavLink } from 'react-router-dom'
import { Modal ,ModalBody,ModalHeader,Row,Col, Input} from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RiLockPasswordFill } from "react-icons/ri";
import { getTeacherById } from '../../apis/teacherApis'
import Student from '../Student'

const NavMessage=()=> {

  const[profileToggle,setUserProfileToggle]=useState(false);
  const[changePasswordToggle,setChangePasswordToggle]=useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [userInformation,setUserInformation]=useState("");
  const[teacher,setTeacher]=useState([]);
  const teacherId= localStorage.getItem("teacherId");

  const getTeacher = async () => {
    try {
      const teacherDetails = await getTeacherById(teacherId);
      console.log("Record in Teacher Profile:", teacherDetails);
      setTeacher(teacherDetails); // Set the teacher state
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

  // Call getTeacher when the component mounts or teacherId changes
  useEffect(() => {
    console.log("Teacher ID:", teacherId);
    getTeacher();
  }, [teacherId]); // This will re-fetch teacher data if teacherId changes

  // Log teacher state when it changes
  useEffect(() => {
    console.log("Teacher state updated:", teacher);
  }, [teacher]); // This will log whenever the teacher state changes


  return (
    <div className='mr-3' style={{marginRight:"10px"}}>
      <NavLink to="#" onClick={()=>setUserProfileToggle(!profileToggle)}> <UserProfile className='icon'> </UserProfile> </NavLink>
    
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
                <button className='btn btn-primary mr-3' > Log out </button>                  
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
                <span> ID : {teacher.tid}</span> <br/>
                <button className='change-password-button shadow' onClick={()=>setChangePasswordToggle(!changePasswordToggle)}> <RiLockPasswordFill /> Change Password </button>
              </div>
          </Col>
          <Row className='mt-4'>
            <Col lg={6} md={12}>
              <label> First Name </label>
              <input type="text" className='form-control text-input' value={teacher.firstName} />
            </Col>
            <Col lg={6} md={12}>
              <label className='drop-down-list'> Last Name </label>
              <input type="text" className='form-control' value={teacher.lastName} />
            </Col>
            <Col lg={6} md={12} className="mt-3">
                <Row>
                <Col lg={6} md={12}>
                    <label> Department</label><br/>
                    <select>
                      <option> IT </option>
                    </select>
                </Col>
                <Col lg={6} md={12}>
                    <div className='drop-down-list'>
                      <label> Position </label><br/>
                      <select>
                        <option> Teacher </option>
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
                      <option> Male</option>
                    </select>
                    </div>
                </Col>
                <Col lg={6} md={12} className="mt-3">
                    <div className='drop-down-list'>
                      <label> Start Date </label><br/>                        
                        <input type="text" className='form-control' value="09-12-2001" />                        
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
                <label> Pimpri Chinchawad  </label><br/>
                <small> ganeshs2987@gmail.com </small>
              </div>
            </Col>
          </Row>
          <Row className='mb-3 mt-1'>
            <Col lg={6} md={12} className="mt-3">
              <label>Phone:</label>
              <input type="text" className='form-control' value={teacher.contact}  />
            </Col>
            <Col lg={6} md={12} className="mt-3">
              <label>Email:</label>
              <input type="text" className='form-control' value={teacher.email}/>
            </Col>
            <Col sm={12} className="mt-3">
              <label>Domain Username:</label>
              <input type="text" className='form-control' value="Teacher"/>
            </Col>
            <Col sm={12} className="mt-3">
              <label> Status: </label>
              <input type="text" className='form-control' value="Working"/>
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
                <label> Kalewadi Phata &nbsp; Pimpri Chinchawad &nbsp; Maharashtra &nbsp; India</label>                  
              </div>
            </Col>            
          </Row>
          <Row className='mb-3 mt-3'>
            <Col lg={6} md={12}>
              <label className=''>Country:</label>    
              <div className='drop-down-list'>
              <select>
                <option> India </option>              
              </select>
              </div>
            </Col>
            <Col lg={6} md={12}>
            <div className='drop-down-list'>
              <label>City:</label>    
              <select>
                <option> Pune </option>                 
              </select>
            </div>
            </Col>              
            <Col sm={12} className="mt-3">
            <div className='drop-down-list'>
              <label>State:</label>    
              <select className='p-1'>
                <option> Maharashtra </option>
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
    </div>
  )
}

export default NavMessage