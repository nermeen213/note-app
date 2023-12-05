import React, { useState } from 'react';
import style from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { useContext } from 'react';
import { UserContext } from '../Context/userContext';

export default function Layout() {
  let {Token}=useContext(UserContext)
 
  const [isMinimized, setisMinimized] = useState(localStorage.getItem('ismini'))
  localStorage.setItem("ismini",isMinimized)
  return <>
 
   <div className={`d-flex min-vh-100 align-items-stretch ${style.dark} `}>
   
    {Token?  <div className={isMinimized? style["sidebar-mini"] :  `${style.sidebar}`}>
          <Sidebar  isMinimized={isMinimized} setisMinimized={setisMinimized}/>
          
        </div>:""}
  

        <div className='container-fluid  p-0 '>
          
        <Outlet />
        </div>
      </div>
  </>
}