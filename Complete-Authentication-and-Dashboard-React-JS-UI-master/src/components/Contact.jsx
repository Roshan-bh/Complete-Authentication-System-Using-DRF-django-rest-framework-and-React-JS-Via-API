import React from 'react'
import Navbar from './Navbar'
import profile from '../images/profile.jpg';
import { useProvileDataQuery } from '../services/userAuthApi';
import { getToken } from '../services/LocalStorageService';
import { useState,useEffect } from 'react';


const Contact = () => {
  const {access_token}=getToken()
  const {data, isSuccess}=useProvileDataQuery(access_token)
  // console.log(data)
  //state creating to set data if available
  const[userData,setUserData]=useState({
    email:'',
    name:'',
  })
  //locally storing data
  useEffect(()=>{
    if(data && isSuccess){
      setUserData({
        email:data.email,
        name:data.name,
      })
    }
  },[data,isSuccess])
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row  justify-content-center">
          <div className="col-sm-6 text-center">
            <div className="">
              <img src={profile} style={{ height: '29vh', }} className="mt-5 rounded img-logo shadow border border-dark" alt="" />
            </div>
            <div className=" mt-3">
              <h4 className='font-monospace mb-2 text text-uppercase'>{userData.name}</h4>
              <h4 className='font-monospace mb-2'>{userData.email}</h4>
            </div>
            <hr />
            <div className="self-description">
              <p className='font'>Hi Myself, </p>
              <p className='text-monospace'>
                {userData.name},

                I'm a student as well as a part-time Freelancer currently working under contract as a computer operator at Department of National ID and Civil Registration under Ministry of Home Affairs, Nepal.

                I love web development and Graphics Designing so I'm here for you to give my training and skills while making a significant contribution to the success of your organization. I am eager to apply my knowledge and skills toward

                launching a successful career as a full-stack Python/Django Developer and a Graphics Designer.</p>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Contact