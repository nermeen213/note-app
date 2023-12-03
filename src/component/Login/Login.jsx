import React, { useContext, useEffect, useState } from 'react';
import style from './Login.module.css';
import logigImage from '../../assets/images/top-view-desk-concept-with-laptop.jpg'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, useFormik } from 'formik';
import { UserContext } from '../Context/userContext';




export default function Login() {
  let navigate =useNavigate()
  const [error, seterror] = useState(null)
 let {setToken , Token}=useContext(UserContext)
 const [isLoading, setisLoading] = useState(null)

  let passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  let emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  async function signin(values){

   setisLoading(true)
    let {data}= await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signin`,
    values).catch((err)=>{
       setisLoading(false)
      seterror(err.response.data.msg)
     
    });
   
    if(data?.msg=='done'){
      //BREAER token
      // console.log(data);
      localStorage.setItem('userToken',`3b8ny__${data?.token}`) 

      setToken(localStorage.getItem('userToken'));
      
      navigate('/')

    }
  }
  useEffect(() => {
    
    if(Token) navigate('/')


    
    
  }, [Token])


  let validationSchema =Yup.object({
    email:Yup.string().matches( emailRegex,"email is valid").required('email is required'),
    password:Yup.string().required('password is required').matches(passwordRegex, 'Minimum eight characters, at least one letter and one number'),
  })

  let formik =useFormik({
    initialValues :{
      
      email :"",
      password :"",
      
    },validationSchema
    ,onSubmit:signin
  });
  return <>
  <section className='background'>
  <div className=" mx-auto py-5 box  ">
      <div className="row g-0 kkk">

        <div className="col-md-8 position-relative ">
          <img src={logigImage} className='w-100 h-100 ' alt="" />

        </div>
       
        
       
        <div className="col-md-4 py-4 px-5 bg-white d-flex align-items-center h-100">
         <div className=''>
          <h2 className='font'>Welcome Back <i className="fa fa-heart icon" aria-hidden="true"></i></h2>
          <p>Thanks For Returning ! please sign in to acsess your account</p>
          <form onSubmit={formik.handleSubmit} >
          {error?<p className='text-danger'>{error}</p>:""}

           <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' placeholder='Email' className='form-control mb-2 ' />
           {formik.errors.email &&formik.touched.email?<p className='w-100 alert-danger text-danger  '>{formik.errors.email}</p>:""}

           <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name='password' placeholder='password' className='form-control mb-2 ' />
           {formik.errors.password && formik.touched.password?<p className='w-100 alert-danger text-danger  '>{formik.errors.password}</p>:""}

          <button className='btn bg-main w-100 text-white' type="submit">login</button>
          </form>
          <div className='d-flex py-3 '>
          <p className=''>you don't have account yet?</p><Link className='btn mx-2 p-0' to="/register">Signup</Link>

          </div>

         </div>
        </div>
      </div>
    </div>
  </section>
   
 
 
 
  </>
}