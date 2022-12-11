import React, { useState } from 'react'
import { FaStackExchange } from "react-icons/fa";
import { GoVerified, GoUnverified } from "react-icons/go";
import { useChangeUserPasswordMutation } from '../services/userAuthApi';
import { getToken } from '../services/LocalStorageService';


//Main Function Component
const Login = () => {
  const[serverError,setServerError]=useState({})
  const{access_token}=getToken()
  const [changeUserPassword]=useChangeUserPasswordMutation()

  //Form Submit Handelling
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const realData = {
      password: data.get('password'),
      password2: data.get('password2'),
    }
    console.log(realData);
    const resp = await changeUserPassword({realData,access_token})
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

      <div className="container">
        <div className="row mt-5 justify-content-center">
          <div className="col-sm-8 shadow-lg">
            <hr className='text-light' /><h2 className=' text-center header-space font-monospace '>Change Password <FaStackExchange /></h2> <hr className='text-light' />
          </div>
        </div>
        {/* Main Form Starts */}
        <div className="row mt-4 justify-content-center">
          <div className="col-sm-6 shadow-lg">
            <form action="" method="post" id="change-password" onSubmit={handleSubmit} noValidate>
              {/* <div className="form-group my-3">
                <label htmlFor="userOldPassword" className=' font-monospace '>Old Password*</label>
                <input type="password" id="userOldPassword" className='form-control' name="oldPassword" placeholder='Enter old password..' required />
              </div> */}
              <div className="form-group my-3">
                <label htmlFor="userNewPassword" className=' font-monospace '>New Password*</label>
                <input type="password" id="userNewPassword" className='form-control' name="password" placeholder='Enter new password..' required />
                {serverError.password ? <small><span className='text-danger'>{serverError.password}</span></small>:''}
              </div>
              <div className="form-group my-3">
                <label htmlFor="userpassword2" className=' font-monospace '>Confirm Password*</label>
                <input type="password" id="userpassword2" className='form-control' name="password2" placeholder='Enter new confirm password..' required />
                {serverError.password2 ? <small><span className='text-danger'>{serverError.password2}</span></small>:''}  
              </div>
              <div className='text-center'>
                <button type="submit" className='font-monospace btn btn-secondary mb-3'>Save</button>
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

export default Login