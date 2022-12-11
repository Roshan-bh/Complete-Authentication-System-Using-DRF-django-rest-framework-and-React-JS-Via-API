import React from 'react'
import { Link } from 'react-router-dom'
import { CiBacon } from "react-icons/ci";
import { getToken } from '../services/LocalStorageService';

const Navbar = () => {
    const { access_token }=getToken()
    return (
        <>
            <nav className='navbar navbar-expand-lg bg-dark'>
                <div className="container-fluid">
                    <Link className="navbar-brand text-white font-monospace" to="/"><CiBacon /> React JS - Django <CiBacon /></Link>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupport">
                        <span className='navbar-toggler-icon bg-white'></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupport">
                        <ul className="navbar-nav ms-auto mb-2">
                            <li className="nav-item me-2">
                                <Link className="nav-link text-color  " to="/">Home</Link>
                            </li>
                            
                            {/* display login registration if user is not authenticated and has not token else display dashboard */}
                            {access_token?<div className='d-flex'>
                            <li className="nav-item me-2">
                                <Link className="nav-link text-color  " to="/contact">Contact</Link>
                            </li>
                            <li className="nav-item me-2">
                                 <Link className="nav-link text-color" to="/dashboard">Dashboard</Link>
                            </li>
                            </div>:
                            <div className='d-flex'>
                            <li className="nav-item me-2">
                                <Link className="nav-link text-color" to="/login">Login</Link>
                            </li>
                            <li className="nav-item me-2">
                                <Link className="nav-link text-color" to="/registration">Registration</Link>
                            </li></div>}
                                   
                        </ul>
                    </div>
                </div>

            </nav>
        </>
    )
}

export default Navbar