import React from 'react';
import {FaReact, FaNodeJs} from 'react-icons/fa';
import {SiTailwindcss, SiExpress, SiMongodb} from 'react-icons/si';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className='min-h-screen'>
      <div>
        {/* <p className='mt-10 text-5xl font-extrabold text-center text-blue-900 before:border-2 before:border-blue-900 before:mx-5 after:border-2 after:border-blue-900 after:mx-5 sm:mt-10'>About Us</p> */}

        <div className='flex flex-col gap-5 mt-20'>
          <motion.p initial={{ y:"-500px" }} animate={{ y:"0px" }} transition={{ duration: 1 }} className='mx-auto text-4xl font-extrabold text-blue-900 border-b-2 border-blue-900'>Tech-Stack Used</motion.p>

          <div className='flex flex-col gap-8'>
            <motion.p initial={{ y:"1000px" }} animate={{ y:"0px" }} transition={{ duration: 1 }} className='mx-auto text-3xl font-bold text-blue-800 mt-8 border-b-2 border-blue-700'>Frontend</motion.p>

            <ul className='mx-auto flex gap-16 text-4xl sm:text-2xl'>
              <motion.li initial={{ x:"-1000px" }} animate={{ x:"0px" }} transition={{ duration: 1 }} className='flex my-auto gap-2'><FaReact className='my-auto text-[#61dbfb]'/> React JS</motion.li>
              <motion.li initial={{ x:"1000px" }} animate={{ x:"0px" }} transition={{ duration: 1 }} className='flex my-auto gap-2'><SiTailwindcss className='my-auto text-[#38bdf8]'/> Tailwand CSS</motion.li>
            </ul>
          </div>

          <div className='flex flex-col gap-8'>
            <motion.p initial={{ y:"-1000px" }} animate={{ y:"0px" }} transition={{ duration: 1 }} className='mx-auto text-3xl font-bold text-blue-800 mt-8 border-b-2 border-blue-700'>Backend</motion.p>

            <ul className='mx-auto flex gap-16 text-4xl sm:text-2xl'>
              <motion.li initial={{ x:"-1000px" }} animate={{ x:"0px" }} transition={{ duration: 1 }} className='flex my-auto gap-2'><FaNodeJs className='my-auto text-[#215732]'/> Node JS</motion.li>
              <motion.li initial={{ x:"1000px" }} animate={{ x:"0px" }} transition={{ duration: 1 }} className='flex my-auto gap-2'><SiExpress className='my-auto text-gray-800'/> Express JS</motion.li>
            </ul>
          </div>

          <div className='flex flex-col gap-8'>
            <motion.p initial={{ y:"-1000px" }} animate={{ y:"0px" }} transition={{ duration: 1 }} className='mx-auto text-3xl font-bold text-blue-800 mt-8 border-b-2 border-blue-700'>Database</motion.p>

            <ul className='mx-auto flex gap-16 text-4xl sm:text-2xl'>
              <motion.li initial={{ y:"500px" }} animate={{ y:"0px" }} transition={{ duration: 1 }} className='flex my-auto gap-2'><SiMongodb className='my-auto text-[#4DB33D]'/> MongoDB</motion.li>
              {/* <li className='flex my-auto gap-2'><SiExpress className='my-auto text-gray-800'/> Express JS</li> */}
            </ul>
          </div>
        </div>

        {/* <div className='flex flex-col gap-5 mt-20'>
          <p className='mx-auto text-4xl font-extrabold text-blue-900 border-b-2 border-blue-900 sm:text-3xl'>Features of the website</p>

          <ul className='mx-auto list-decimal flex flex-col gap-5 text-xl font-semibold mt-5 sm:text-base pl-12'>
            <li>You can read all the Blog</li>
            <li>You can add your Blog</li>
            <li>You can Edit only your Blog</li>
            <li>You can Delete only your Blog</li>
            <li>Login and Logout functionality using JWT</li>
            <li>Protected Routes</li>
            <li>Fully responsive</li>
          </ul>
        </div> */}
      </div>
    </div>
  )
}

export default About