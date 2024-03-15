import React from 'react';
import { format, compareAsc } from 'date-fns'
import { NavLink } from 'react-router-dom';
import {motion} from 'framer-motion';

function Post({title, content, summary, createdAt, author, coverImg, _id}) {
    // console.log("Indknknkncknckdnckd")
    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{opacity: 1, scale: 1 }}
            transition={{ opacity: { ease: "linear" }, layout: { duration: 1 } }}
            viewport={{ once: true }}
            >
            {/* className='flex min-w-6xl max-w-4xl min-h-auto p-2 overflow-hidden gap-10 mt-12 mx-auto shadow-md shadow-gray-400 rounded-md transition-all hover:scale-[1.08] sm:hover:scale-[1.04] sm:block sm:max-h-80'>
            <div className='max-w-[43%] sm:min-w-[100%]'>
                <NavLink to={`/post/${_id}`}>
                    <img src={"http://localhost:5000/uploads/"+coverImg.split("uploads\\")[1]} alt="blogImg" className='w-[300px] h-60 rounded-md cursor-pointer object-cover bg-center border-0 shadow-lg shadow-stone-400 sm:mx-auto md:max-w-[220px]'/>
                </NavLink>
            </div>

            <div className='max-w-[60%] sm:max-w-max sm:text-start sm:mt-4'>
                <NavLink to={`/post/${_id}`}>
                    <h2 className='font-bold text-2xl capitalize sm:text-xl'>{title}</h2>
                </NavLink>

                <p className='opacity-70 text-xs my-2 sm:flex sm:gap-1 sm:justify-between'>
                    <p>    
                        By @{author.userName}
                    </p> 
                    <time className='mx-2'>
                        {format(new Date(createdAt), 'dd MMM, yyyy | HH:mm')}
                    </time>
                </p>

                <p className='opacity-80 text-justify overflow-hidden sm:text-sm'>
                    {summary.substr(0, 350)}...
                </p>
            </div> */}

            <div className="w-[400px] h-[500px] overflow-hidden bg-white border border-gray-200 rounded-lg shadow relative outline outline-4 outline-transparent outline-offset-[-5px] hover:outline-gray-700 hover:outline-offset-[6px] transition-all duration-500">
                <div className='max-h-[200px] max-w-[400px] overflow-hidden'>
                <img className="rounded-t-lg h-[200px] w-[400px] bg-cover transition-all duration-300 overflow-x-hidden hover:scale-150" src={"http://localhost:5000/uploads/"+coverImg.split("uploads\\")[1]} alt=""/>
                </div>
                
                <div className="py-2 px-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight">{title}</h5>
                    <div className='opacity-70 text-xs my-2 flex sm:flex sm:gap-1 sm:justify-between'>
                        <p>    
                            By @{author.userName}
                        </p> 
                        <p className='mx-8'>
                            {format(new Date(createdAt),'dd MMM, yyyy | HH:mm')}
                        </p>
                    </div>
                    <p className="mb-3 font-normal ">{summary.substr(0, 300)}...</p>
                </div>

                <NavLink to={`/post/${_id}`} className="bg-gradient-to-bl from-[#010125] via-blue-800 to-[#010125] text-white hover:bg-white hover:from-white hover:to-white hover:text-[#010125] hover:border-[#010125] border-2 duration-1000 font-bold py-1 px-3 rounded sm:text-sm sm:px-2 absolute bottom-3 left-5">
                    Read more
                </NavLink>
            </div>
        </motion.div>
  )
}

export default Post