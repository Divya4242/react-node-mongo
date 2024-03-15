import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Post from './Post';
import { useUserContext } from '../context/UserContext';

function MyPosts() {
    const cookies = new Cookies();
    const {userInfo} = useUserContext();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getAllPosts = async () => {
      const {data} = await axios.get('http://localhost:5000/getmyposts', {
        headers: {
          Authorization: cookies.get('token')
        }
      });
      const newData = data.filter((post) => {
        return userInfo?.id === post?.author?._id;
      })
      setPosts(newData);
      setLoading(false);
    }
    
    getAllPosts();
  }, []);

  if(loading){
    return (
      <div className='flex min-h-[80vh]'>
        <div className='m-auto text-6xl font-extrabold bg-gradient-to-r from-[#010125] via-[#0f0f9d] to-[#010125] text-transparent bg-clip-text'>Loading...</div>
      </div>
    )
  }

  if(posts.length == 0){
    return (
      <div className='flex min-h-[80vh]'>
        <div className='m-auto text-6xl font-extrabold bg-gradient-to-r from-[#010125] via-[#0f0f9d] to-[#010125] text-transparent bg-clip-text'>No Post Yet!</div>
      </div>
    )
  }

  return (
    <div className='min-h-[68.2vh]'>
      <div className='my-24 sm:mx-8 md:mx-10 grid grid-cols-3 gap-4 justify-items-center gap-y-[80px] scroll-smooth'>
          {
            posts.map((post, index) => <Post {...post} key={index}/>)
          }
      </div> 
    </div>
  )
}

export default MyPosts
