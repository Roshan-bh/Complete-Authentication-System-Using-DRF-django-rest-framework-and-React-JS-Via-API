import React, { useState } from 'react'
import Navbar from './Navbar';
import { BiReset } from 'react-icons/bi';
import { GoVerified, GoUnverified } from "react-icons/go";
import { useResetUserPasswordMutation } from '../services/userAuthApi';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const ResetPassword = () => {
    const navigate=useNavigate()
    const[serverError,setServerError]=useState({})
    const [resetUserPassword]=useResetUserPasswordMutation()
    const {id,token}=useParams()

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const realData = {
            password: data.get('password'),
            password2: data.get('password2'),
        }
        const resp=await resetUserPassword({realData,id,token})
       console.log(resp)
    if(resp.error){
        setServerError(resp.error.data.errors)
      }
      if(resp.data){
        setServerError(resp.data)
        document.getElementById("reset-password").reset()
        setTimeout(()=>{
            navigate('/login')
        },3000)
  }
       
    }


    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-sm-8 shadow-lg">
                        <hr className='text-light' /><h2 className=' text-center header-space font-monospace '><BiReset /> Send Password Reset <BiReset /></h2> <hr className='text-light' />
                    </div>
                </div>
                {/* Main Form Starts */}
                <div className="row mt-4 justify-content-center">
                    <div className="col-sm-6 shadow-lg">
                        <form action="" method="post" id="reset-password" onSubmit={handleSubmit} noValidate>
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



export default ResetPassword
