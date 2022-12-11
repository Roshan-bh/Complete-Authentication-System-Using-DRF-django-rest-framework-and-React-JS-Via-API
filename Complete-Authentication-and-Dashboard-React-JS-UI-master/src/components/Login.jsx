import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom';
import { RiLoginBoxFill } from "react-icons/ri";
import { GoVerified, GoUnverified } from "react-icons/go";
import { useUserLoginMutation } from '../services/userAuthApi';
import { getToken, storeToken } from '../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { setToken } from '../features/authSlice';




//Main Function Component
const Login = () => {
const [userLogin]=useUserLoginMutation()
const[serverError,setServerError]=useState({})
const dispatch=useDispatch()
  
  //For Redirect Using useNavigate
  const navigate = useNavigate()

  //Form Submit Handelling
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const realData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    // console.log(realData);
    const resp=await userLogin(realData)
    // console.log(resp)
    if(resp.error){
      setServerError(resp.error.data.errors)
    }
    if(resp.data){
      setServerError(resp.data)
      //locally storing token 
      storeToken(resp.data.token)
      //assigning token in setToken for url browsing 
      let {access_token}=getToken()
      dispatch(setToken({access_token:access_token}))
      setTimeout(()=>{
        navigate('/dashboard')
      },2000)
    }
  }
  //set token state in setToken for page refresh
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
            <hr className='text-light' /><h2 className=' text-center header-space font-monospace '>Login <RiLoginBoxFill /></h2> <hr className='text-light' />
          </div>
        </div>
        {/* Main Form Starts */}
        <div className="row mt-4 justify-content-center">
          <div className="col-sm-6 shadow-lg">
            <form action="" method="post" id="login-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group my-3">
                <label htmlFor="useremail" className=' font-monospace '>Email*</label>
                <input type="email" id="useremail" className='form-control' name="email" placeholder='Enter email address..' required />
                {serverError.email ? <small><span className='text-danger'>{serverError.email}</span></small>:''}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userpassword" className=' font-monospace'>Password*</label>
                <input type="password" id="userpassword" className='form-control' name="password" placeholder='Enter password..' required />
                {serverError.password ? <small><span className='text-danger'>{serverError.password}</span></small>:''}
              </div>
              <Link to="/send-password-reset-email">Forgot Password</Link>
              <div className='text-center'>
                <button type="submit" className='font-monospace btn btn-secondary mb-3'>Login</button>
              </div>
              <div>

                {/* Alert Message onSubmit.. */}
                {
                  serverError.non_field_errors ? 
                  <div className='alert alert-danger p-1'>
                    <GoUnverified /> <small>{serverError.non_field_errors}</small>
                  </div> : serverError.msg? <div className='alert alert-success p-1 font-monospace'>
                    <GoVerified /> <small>{serverError.msg}</small>
                  </div>:'' 
                }
              </div>
            </form>
          </div>
        </div>
        {/* Main Form Part Ends */}
      </div>
    </>

  )
}

export default Login