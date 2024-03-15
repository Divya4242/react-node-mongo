import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import { motion } from 'framer-motion';

function Login() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName:"",
    password:""
  });

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const {userName, password} = userData;
      const {data} = await axios.post('http://localhost:5000/login', {
        userName,
        password,
      });

      cookies.set('token', data);

      toast.success(`${userName} logged sucessfully`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });


        setTimeout(() => {
          navigate('/');
        }, 2500);

    }catch(error){
      if(error.response && error.response.status != 200){
        toast.error(error.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
    }finally{
      setUserData({
        userName:"",
        password:""
      });
    }
  };

  return (
    <div className="h-screen flex justify-center bg-gradient-to-br from-[#010125] via-blue-800 to-[#010125]">
        <motion.div initial={{opacity: 0, scale: 0 , position: 'absolute', top: "-50%", left: "-50%"}} animate={{opacity: 1, scale: 1, x: 0, top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} transition={{duration: 1}} className='h-[300px] w-[350px] bg-white py-2 px-3 my-auto rounded-md'>
            <div className='text-center text-2xl font-bold border-b-2 pb-1'> Login Form</div>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col my-4'>
                    <label htmlFor="userName" className='text-lg font-semibold'>Username</label>
                    <input type="text" name="userName" value={userData.userName} onChange={handleChange} className='border-2 py-1 px-2 rounded-md' placeholder='Enter Username'/>
                </div>

                <div className='flex flex-col my-4'>
                    <label htmlFor="password" className='text-lg font-semibold'>Password</label>
                    <input type="password" name="password" value={userData.password} onChange={handleChange} className='border-2 py-1 px-2 rounded-md' placeholder='Enter Password'/>
                </div>

                <button class="bg-gradient-to-bl from-[#010125] via-blue-800 to-[#010125] text-white hover:bg-white hover:from-white hover:to-white hover:text-[#010125] hover:border-[#010125] border-2 duration-1000 font-bold py-1 px-3 rounded">
                    Login
                </button>
            </form>

            <div className='mt-2'>
              <p>Don't have an account ? <NavLink to='/register' className='text-blue-900 hover:text-blue-600'>Register</NavLink></p>
            </div>
        </motion.div>
        <ToastContainer />
    </div>
  )
}

export default Login