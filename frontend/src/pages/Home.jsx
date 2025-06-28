import React, { useEffect, useState } from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showSidebar, SetShowSideBar] = useState(false);
  const {isAuthenticated} = useSelector(state => state.auth)
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isAuthenticated){
      toast.warn('❌ Currently you are not authorize to access this page.')
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return (
    <section className='relative flex flex-col md:flex-row  '>
      <div className={`${showSidebar?'absolute top-[55px] left-0 h-[calc(100vh-55px)]  overflow-y-auto':'hidden'}  md:block    bg-white`}>
        <Sidebar />
      </div>

      <div className='flex-1'>
        <Chat SetShowSideBar={SetShowSideBar}/>
      </div>
    </section>
  )
}

export default Home