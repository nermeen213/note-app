import React, { useContext } from 'react';
import style from './Sidebar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import { showAddModel } from '../../utils/Note.js';
import { NoteContext } from '../Context/NoteContext.jsx';

export default function Sidebar({isMinimized , setisMinimized}) {
let {Token, setToken}=useContext(UserContext)
let {Note ,setNote}=useContext(NoteContext);
console.log(Token);
let navigate =useNavigate();
  function logOut(){
    localStorage.removeItem('userToken');

    setToken(localStorage.getItem('userToken'))
   
   
    navigate('/login')

    
  }
  return <>
  {Token? <nav className={`${style.nav} shadow-bg w-100  `}>

<button className='btn bg-main text-white  text-capitalize w-100 mb-5' onClick={()=>showAddModel({updater:setNote,Token})}><i className='fa-solid fa-plus me-2'></i>  {isMinimized?"":"New Note"}</button>

<ul className='m-0 p-0 ' >
 <li >
   <NavLink to="/" className="font">
   <i className="fa-solid fa-house-chimney-window me-2 font"></i>
   {isMinimized?"":"Home"}
   </NavLink>
 </li>
 <li >
   <NavLink to="/" className='font'>
   <i className="fa-solid fa-magnifying-glass me-2 font"></i>
   {isMinimized?"":"search"}
   </NavLink>
 </li>
 <li >
  <span className='fon carcol font' onClick={()=> logOut() } >
  <i className="fa-solid fa-right-from-bracket fa-flip-horizontal me-2 font "></i>
   {isMinimized?"":"Log out"}
  </span>
  
 
 </li>
</ul>
<div className={`${style.change} shadow pointer`}
onClick={()=>
  setisMinimized(!isMinimized)
}
>
       <i className={`fa-solid ${isMinimized? "fa-chevron-right":"fa-chevron-left"} `}
       ></i>
     </div>
    
     </nav>:""}
   
 
     
  </>
}