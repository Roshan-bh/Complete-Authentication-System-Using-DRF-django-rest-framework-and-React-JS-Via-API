import React, { useState,useEffect } from 'react'
import Navbar from './Navbar'
import { useDispatch } from 'react-redux';
import { RiMailSendFill } from 'react-icons/ri';
import { GoVerified, GoUnverified } from "react-icons/go";
import { useSendUserPasswordResetMailMutation } from '../services/userAuthApi';
import { getToken } from '../services/LocalStorageService';
import { setToken } from '../features/authSlice';
const SendPasswordResetEmail = () => {
  const dispatch=useDispatch()
  const {access_token}=getToken()
  useEffect(()=>{
    dispatch(setToken({access_token:access_token}))
  },[access_token,dispatch])
  const[serverError,setServerError]=useState({})
  const [sendUserPasswordResetMail]=useSendUserPasswordResetMailMutation()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const realData = {
      email: data.get('email'),
    }
    let resp=await sendUserPasswordResetMail(realData)
       // console.log(resp)
    if(resp.error){
        setServerError(resp.error.data.errors)
      }
      if(resp.data){
        setServerError(resp.data)
        document.getElementById("change-password").reset()
  }
    
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row mt-5 justify-content-center">
          <div className="col-sm-8 shadow-lg">
            <hr className='text-light' /><h2 className=' text-center header-space font-monospace '><RiMailSendFill /> Send Password Reset <RiMailSendFill /></h2> <hr className='text-light' />
          </div>
        </div>
        {/* Main Form Starts */}
        <div className="row mt-4 justify-content-center">
          <div className="col-sm-6 shadow-lg">
            <form action="" method="post" id="send-password-reset" onSubmit={handleSubmit} noValidate>
              <div className="form-group my-3">
                <label htmlFor="useremail" className=' font-monospace '>Email*</label>
                <input type="email" id="useremail" className='form-control' name="email" placeholder='Enter email address..' required />
                {serverError.email?<small><span className='text-danger'>{serverError.email}</span></small>:''}
              </div>
              <div className='text-center'>
                <button type="submit" className='font-monospace btn btn-secondary mb-3'>Send</button>
              </div>
              <div>

                {/* Alert Message onSubmit.. */}
                {
                                serverError.non_field_errors ? 
                                <div className='alert alert-danger p-1 font-monospace' role="alert">
                                    <GoUnverified /> <small>{serverError.non_field_errors}</small>
                                
                                </div> : serverError.msg? <div className='alert alert-success  p-1 font-monospace' >
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

export default SendPasswordResetEmail