import React, { useContext, useEffect } from 'react';
import style from './Home.module.css';
import { getUserNote } from '../../utils/Note';
import axios from 'axios';
import { UserContext } from '../Context/userContext';
import { NoteContext } from '../Context/NoteContext';
import { Audio } from 'react-loader-spinner'
import Noteapp from '../Noteapp/Noteapp.jsx'

export default function Home() {
  let {Note ,setNote}=useContext(NoteContext);
  let{Token}=useContext(UserContext);
useEffect(()=>{
  getUserNote({updater:setNote,Token})
},[])
 
  return <>
  
  <div className=' mx-3'>
  <h2 className=" h4 heading font fs-5"><i className="fa-solid fa-folder-open"></i> My Notes</h2>
     
  <div className=' hr w-100'>

  {Note==null ? (<div className='d-flex justify-content-center align-item-center'>
  <Audio
  height="80"
  width="80"
  radius="9"
  color='#34D2D4'
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
  </div> ): Note.length == 0 ? (<h2 className='icon text-center'> No Notes Found 💔 </h2>):(<div>
    {Note.map((note)=><Noteapp noteobj={note} key={note._id} />)}
    </div>)}
   </div>

  </div>
 
   
    </>
}