import React, { useState ,useEffect} from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { FaRegistered } from "react-icons/fa";
import { GoVerified, GoUnverified } from "react-icons/go";
import { useUserRegistrationMutation } from '../services/userAuthApi';
import { storeToken } from '../services/LocalStorageService';
import { getToken } from '../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { setToken } from '../features/authSlice';


const Registration = () => {

  const [userRegistration]=useUserRegistrationMutation()
  const [serverError,setServerError]=useState({})
  const navigate = useNavigate()
  const dispatch=useDispatch()
  

  //Form Submit Handelling
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const realData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
      tc: data.get('tc'),
    }
    // console.log(realData);
    const resp=await userRegistration(realData)
    // console.log(resp)
    if(resp.error){
      setServerError(resp.error.data.errors)
    }
    if(resp.data){
      setServerError(resp.data)
      storeToken(resp.data.token)
      let {access_token}=getToken()
        dispatch(setToken({access_token:access_token}))
      
      setTimeout(()=>{
        navigate('/dashboard')
      },2000);
    
    }
  }
  let {access_token}=getToken()
  useEffect(()=>{
    dispatch(setToken({access_token:access_token}))
  },[access_token,dispatch])
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row mt-5 justify-content-center">
          <div className="col-sm-8 shadow-lg">
            <hr className='text-light' /><h2 className=' text-center header-space font-monospace '>Registration <FaRegistered /></h2> <hr className='text-light' />
          </div>
        </div>
        <div className="row mt-4 justify-content-center">
          <div className="col-sm-6 shadow-lg">
            <form action="" method="post" onSubmit={handleSubmit} id='registration-form' noValidate>
              <div className="form-group my-3">
                <label htmlFor="username" className='font-monospace'>Username*</label>
                <input type="text" id="username" className='form-control' name="name" placeholder='Enter name..' required />
                {serverError.name?<small><span className='text-danger'>{serverError.name}</span></small>:''}
              </div>
              <div className="form-group my-3">
                <label htmlFor="useremail" className='font-monospace'>Email*</label>
                <input type="email" id="useremail" className='form-control' name="email" placeholder='Enter email address..' required />
                {serverError.email?<small><span className='text-danger'>{serverError.email}</span></small>:''}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userpassword" className='font-monospace'>Password*</label>
                <input type="password" id="userpassword" className='form-control' name="password" placeholder='Enter password..' required />
                {serverError.password?<small><span className='text-danger'>{serverError.password}</span></small>:''}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userpasswordconfirm" className='font-monospace'>Confirm Password*</label>
                <input type="password" id="userpasswordconfirm" className='form-control' name="password2" placeholder='Enter confirm password..' required />
                {serverError.password2?<small><span className='text-danger'>{serverError.password2}</span></small>:''}
              </div>
              <div className="form-check mb-3">
                <input type="checkbox" id='terms&condition' className='form-check-input' name="tc" value={true} />
                <label htmlFor="terms&condition" className='font-monospace form-check-label'> Accept Terms & Condition</label><br />
                {serverError.tc?<small><span className='text-danger'style={{marginLeft:'-20px',}}>{serverError.tc}</span></small>:''}
              </div>
              <div className='text-center '>
                <button type="submit" className='font-monospace btn btn-secondary mb-3'>Register</button>
              </div>
              <div>

                {/* Alert Message  onSubmit.. */}
                {serverError.non_field_errors ?
                 <div className='alert alert-danger p-1'>
                    <GoUnverified /> <small> {serverError.non_field_errors}</small>
                  </div> :serverError.msg ? 
                  <div className='alert alert-success p-1 font-monospace'>
                    <GoVerified /> <small> {serverError.msg}</small>
                  </div> : ''
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Registration