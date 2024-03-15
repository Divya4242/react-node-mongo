import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

function CreateNewPost() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const {userInfo} = useUserContext();

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [file, setFiles] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const {data} = await axios.post('http://localhost:5000/addpost', {
            title, summary, content, file, token: cookies.get('token')
          }, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });

          toast.success(data, {
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
          }, 2000);
        } catch (error) {
          // console.log(error);
          if(error.response && error.response.status != 200){
            toast.error(error.response.data.message, {
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
        } finally{ 
          setTitle("");
          setContent("");
          setSummary("");
          setFiles(null);
        }
    }

  return (

    <div>
      <form onSubmit={handleSubmit} className='max-w-[50%] min-h-[75vh] mx-auto my-28 sm:max-w-[80%] md:max-w-[75%]'>
        <motion.div initial={{ opacity: 0, scale: 0, x: "-1000px" }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1 }} className='flex flex-col my-4'>
          <label htmlFor="title" className='text-lg font-semibold'>Title</label>
          <input type="text" name="title" maxLength={50} value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 py-1 px-2 rounded-md"/>
        </motion.div>

        <motion.div initial={{opacity: 0, scale: 0, x: "1000px" }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1 }} className='flex flex-col my-4'>
          <label htmlFor="summary" className='text-lg font-semibold'>Summary</label>
          <input type="text" name="summary" maxLength={300} value={summary} onChange={(e) => setSummary(e.target.value)} className="border-2 py-1 px-2 rounded-md"/>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0, x: "-1000px" }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1 }} className='flex flex-col my-4'>
          <label htmlFor="file" className='text-lg font-semibold'>Summary</label>
          <input type="file" name="file" required onChange={(e) => setFiles(e.target.files[0])} className="border-2 py-1 px-2 rounded-md"/>
        </motion.div>

        <motion.div initial={{opacity: 0, scale: 0, x: "1000px" }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1 }} className='flex flex-col my-4 max-h-[60vh] overflow-scroll'>
          <label htmlFor="content" className='text-lg font-semibold'>Content</label>
          <ReactQuill name="content" value={content} onChange={newVal => setContent(newVal)}  modules={modules} formats={formats} className="border-2 py-1 px-2 rounded-md"/>
        </motion.div>

        <motion.button initial={{ y:"200px" }} animate={{ y:"0px" }} transition={{ duration: 1 }} class="bg-gradient-to-bl from-[#010125] via-blue-800 to-[#010125] text-white hover:bg-white hover:from-white hover:to-white hover:text-[#010125] hover:border-[#010125] border-2 duration-1000 font-bold py-1 px-3 rounded">
            Post Blog
        </motion.button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default CreateNewPost