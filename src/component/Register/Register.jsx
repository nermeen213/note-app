import React, { useState } from 'react';
import style from './Register.module.css';
import RegisterImage from '../../assets/images/top-view-desk-concept-with-laptop.jpg'
import Formik, { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import axios from 'axios';

export default function Register() {
let navigate =useNavigate()
const [error, seterror] = useState(null)
const [isLoading, setisLoading] = useState(null)


  let passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  let emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let phoneRegex =/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;


  async function signIn(values){
    setisLoading(true)
    let {data}= await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`,
    values).catch((err)=>{
      setisLoading(false)
      seterror(err.response.data.msg)
      console.log(error);
    });
    console.log(data);
    if(data?.msg=='done'){
      navigate('/login')

    }
  }



  let validationSchema =Yup.object({
    name :Yup.string().required('name is required').min(3 , 'must be less than 3 characters').max(10,"name must be more than 10"),
    email:Yup.string().matches( emailRegex,"email is valid").required('email is required'),
    age:Yup.string().required('age is reruired'),
    password:Yup.string().required('password is required').matches(passwordRegex, 'Minimum eight characters, at least one letter and one number'),
    phone:Yup.string().required('phone is required').matches(phoneRegex ,"phone is not valid")
  })

let formik =useFormik({
  initialValues :{
    name :"",
    email :"",
    password :"",
    age:"",
    phone :"",
  },validationSchema
  ,onSubmit:signIn
});






  return <>
  <section className='background'>
  <div className="mx-auto py-5 box ">
      <div className="row g-0 h-100 ">
        
        <div className="col-md-8 position-relative ">
          <img src={RegisterImage} className='w-100 h-100' alt="" />

         
        
       </div>
        
       
        <div className="col-md-4   py-4 px-5 bg-white d-flex align-items-center justify-content-center ">
         <div className=''>
          <h2 className='font'>Create an account</h2>
          <p>Let's get started for free</p>
          <form onSubmit={formik.handleSubmit} >
            {error?<p className='text-danger'>{error}</p>:""}
           <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name='name' placeholder='Username' className='form-control mb-2 '  />
           {formik.errors.name && formik.touched.name?<p className='w-100 alert-danger text-danger  '>{formik.errors.name}</p>:""}
           <input  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' placeholder='Email' className='form-control mb-2 ' />
           {formik.errors.email &&formik.touched.email?<p className='w-100 alert-danger text-danger  '>{formik.errors.email}</p>:""}

           <input  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name='password' placeholder='password' className='form-control mb-2 ' />
           {formik.errors.password && formik.touched.password?<p className='w-100 alert-danger text-danger  '>{formik.errors.password}</p>:""}

           <input  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age} type="number" name='age' placeholder='age' className='form-control mb-2 ' />
           {formik.errors.age && formik.touched.age?<p className='w-100 alert-danger text-danger  '>{formik.errors.age}</p>:""}

           <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}  type="tel" name='phone' placeholder='phone' className='form-control mb-2 ' />
           {formik.errors.phone && formik.touched.phone?<p className='w-100 alert-danger text-danger  '>{formik.errors.phone}</p>:""}
           <button type="submit" className="btn bg-main w-100 text-white ">
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <div className='d-flex pt-4  '>
          <p className=''>Alreade have account?</p><Link className='btn mx-1 p-0' to="/login">Sign in</Link>

          </div>
         
         </div>
        </div>
      </div>
    </div>
 
  </section>
   </>
}