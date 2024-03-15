// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';

// function EditPost() {
//     const {id} = useParams();
//     const [idData, setIdData] = useState();

//     useEffect(() => {
//         const editPost = async () => {
//             const {data} = await axios.get(`http://localhost:5000/edit/${id}`);
//             setIdData(data);
//         }

//         editPost();
//     }, []);
//   return (
//     <div>EditPost {idData}</div>
//   )
// }

// export default EditPost

import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate, useParams } from 'react-router-dom';

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

function EditPost() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const {userInfo} = useUserContext();
    const {id} = useParams();

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [file, setFiles] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const {data} = await axios.get(`http://localhost:5000/post/${id}`);
            console.log(data);
            setTitle(data.title);
            setSummary(data.summary);
            setContent(data.content);
            // setPost(data.data);
        }

        getData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const {data} = await axios.put(`http://localhost:5000/post/${id}`, {
            title, summary, content, file
          }, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: cookies.get('token')
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
            navigate('/post/'+id);
          }, 2500);
        } catch (error) {
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
      <form onSubmit={handleSubmit} className='max-w-[50%] mx-auto sm:max-w-[80%] md:max-w-[75%]'>
        <div className='flex flex-col my-4'>
          <label htmlFor="title" className='text-lg font-semibold'>Title</label>
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 py-1 px-2 rounded-md"/>
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor="summary" className='text-lg font-semibold'>Summary</label>
          <input type="text" name="summary" value={summary} onChange={(e) => setSummary(e.target.value)} className="border-2 py-1 px-2 rounded-md"/>
          {/* <input type="text" name="" id="" /> */}
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor="file" className='text-lg font-semibold'>Summary</label>
          <input type="file" name="file" onChange={(e) => setFiles(e.target.files[0])} className="border-2 py-1 px-2 rounded-md"/>
          {/* <input type="text" name="" id="" /> */}
        </div>
        <div className='flex flex-col my-4 max-h-[60vh] overflow-scroll'>
          <label htmlFor="content" className='text-lg font-semibold'>Content</label>
          <ReactQuill name="content" value={content} onChange={newVal => setContent(newVal)}  modules={modules} formats={formats} className="border-2 py-1 px-2 rounded-md"/>
        </div>
        <button class="bg-gradient-to-bl from-[#010125] via-blue-800 to-[#010125] text-white hover:bg-white hover:from-white hover:to-white hover:text-[#010125] hover:border-[#010125] border-2 duration-1000 font-bold py-1 px-3 rounded">
            Update Post
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default EditPost