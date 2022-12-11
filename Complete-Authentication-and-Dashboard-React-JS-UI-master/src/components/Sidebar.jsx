import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserAlt, FaHome, FaBars } from 'react-icons/fa';
import { MdOutlineChangeCircle } from 'react-icons/md';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import profile from '../images/profile.jpg';
import ChangePassword from './ChangePassword'
import { removeToken } from '../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { unsetToken } from '../features/authSlice';



const Sidebar = () => {
    const dispatch=useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    //Array 
    const items = [
        {
            path: '/contact',
            name: 'Profile',
            icon: <FaUserAlt />,
        },
        {
            path: '/',
            name: 'Home',
            icon: <FaHome />,
        },
        {
            path: '/dashboard/change-password',
            name: 'ChangePassword',
            icon: <MdOutlineChangeCircle />,
        },
        {
            path: '/login',
            name: 'Logout',
            icon: <RiLogoutBoxRFill />,
        },

    ];
    return (

        <>
            <div className="container-fluid m-0 p-0">
                <div className="row">
                    <div className="col-2" style={{ width: '240px', }}>
                        <motion.div animate={{ width: isOpen ? "210px" : "58px" }} className="sidebar">
                            <div className="top-section justify-content-center ">
                                <div className="profile_image d-flex justify-content-center ">
                                    {isOpen && <img src={profile} style={{ height: '15vh', }} className="mt-5 rounded-circle" alt="" />}
                                    <div className="ms-4 bar me-3">
                                        <FaBars onClick={toggle} />
                                    </div>
                                </div>
                                {isOpen && <hr className='text-dark' />}
                            </div>
                            <section className="items">
                                {items.map((item) => {
                                    return (
                                        <NavLink to={item.path} key={item.name}
                                          className="d-flex " 
                                        //   onClick method to remove token when user simply logout
                                          onClick={item.name==="Logout"?()=>{removeToken()
                                            dispatch(unsetToken({access_token:''}))
                                          }:''}>
                                            
                                            <div className="link-text  font-monospace ms-2 me-3 " >
                                                {item.icon} {isOpen && <span>{item.name}</span>}   
                                            </div>
                                        </NavLink>
                                    )
                                })}
                            </section>
                        </motion.div>
                    </div>

                    <div className="col-8 " style={{ width: '1050px', }}>
                        <ChangePassword />
                    </div>

                </div>

            </div>

        </>
    )
}

export default Sidebar