import React from 'react'
import Navbar from './Navbar'
import pic1 from '../images/home.png';
import django from '../images/django.png';
import react from '../images/react.png';
import { FcApproval } from "react-icons/fc";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container shadow-lg">
        <div className="row my-5 justify-content-center  ">
          <h2 className="text-center shadow header-space font-monospace"> <hr className='text-light' />React JS Authentication API with JWT in Django REST Framework
            <hr className='text-light' /></h2>
          <div className="col-sm-6">
            <div className="card mb-4 mt-2">
              <div>
                <img src={pic1} className='card-img-top image-property' alt="home image" />
              </div>
              <div className="card-body">
                <ul className="list-unstyled d-flex">
                  <li className='me-auto'><img src={react} style={{ height: "8vh", }} alt="" /></li>
                  <li><FcApproval /> L e t' s  S t a r t <FcApproval /></li>
                  <li className='ms-auto'><img src={django} style={{ height: "8vh", }} alt="" /></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home