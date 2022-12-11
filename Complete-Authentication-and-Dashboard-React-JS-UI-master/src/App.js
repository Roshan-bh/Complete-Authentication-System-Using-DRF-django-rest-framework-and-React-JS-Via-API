import React from 'react'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import Home from "./components/Home";
import Contact from './components/Contact';
import Login from './components/Login';
import Registration from './components/Registration';
import SendPasswordResetEmail from './components/SendPasswordResetEmail';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import ChangePassword from './components/ChangePassword';
import { useSelector } from 'react-redux';

export default function App() {
  const {access_token}=useSelector(state=>state.authSlice)
  return (
    <>
        <BrowserRouter>
        
            <Routes>
                  <Route path='/' element={<Home/>}/>
                      <Route path='contact' element={access_token?<Contact/>:<Navigate to='/login'/>}/>
                      <Route path='login' element={!access_token?<Login/>:<Navigate to='/dashboard' />}/>
                      <Route path='registration' element={!access_token?<Registration/>:<Navigate to='/dashboard' />}/>
                      <Route path='send-password-reset-email' element={!access_token?<SendPasswordResetEmail/>:<Navigate to='/dashboard' />}/>
                      <Route path='api/user/reset/:id/:token' element={<ResetPassword/>}/>
                      <Route path='dashboard' element={access_token?<Dashboard/>:<Navigate to='/login' />}/> 
                      <Route path='dashboard/change-password' element={access_token?<ChangePassword/>:<Navigate to='/login' />}/> 
                      <Route path='*' element={<h1 className='my-5 text-center'>Error Page Not Found ... <b>enter valid url.</b></h1>}></Route> 
            </Routes>
        
        </BrowserRouter>
  </>
  )
}
