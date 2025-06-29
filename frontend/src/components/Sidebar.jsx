import React, { Suspense, useEffect, useState } from 'react';
import { CiLogout, CiHome } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { toast } from 'react-toastify';
import { setSelectedUser } from '../redux/userSlice.js';
import axios from 'axios';
import UserItem from './UserItem.jsx';
import UserImage from './UserImage.jsx';
import SkeletonUser from './SkeletonUser.jsx';

const Sidebar = () => {
  const [showOptions, setOptions] = useState(false)
  const [users, setUers] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [onlineUsers, setOnLineUsers] = useState([])

  const { user, token } = useSelector(state => state.auth)
  const { slectedUser } = useSelector(state => state.user)
 
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // -------------------------------------------------------------------------------------------------------------------
    const fetchAllUsers = async ()=>{
    try {
      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/getUser`, 
        {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }, 
      }
      )

      if(res?.status == 200 || res?.data?.success == true ){
        setUers(res?.data?.users)
      }
    } catch (error) {
      toast.warn(`There is an error to fetch users`)
    } finally {
      setLoading(false)
    }

  }

   useEffect(() => {
    fetchAllUsers();
  }, []);
  // -------------------------------------------------------------------------------------------------------------------
const usersFilter = users
                .filter((cu) => cu._id !== user._id)
                .filter((u) => u.userName.toLowerCase().includes(search.toLowerCase()))

  // -------------------------------------------------------------------------------------------------------------------
  const handleLogout = async ()=>{
    const confrim = window.confirm('Are you sure to logout?')
    if(confrim){
      dispatch(logout())
      toast.success('Your session is destroy successfully and you are logout now.')
      navigate('/login')
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  const handleUserSelect = (selectedUser) => {
    dispatch(setSelectedUser(selectedUser));
    // setSidebarOpen(false);
  };

  // -------------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------




  return (
    <section className="px-2 md:h-screen w-[250px] overflow-y-auto">

      <header className='fixed py-2 z-50 bg-white flex items-center justify-center gap-5'>
        {/* Search Form */}
        <form action="">
          <input onChange={(e)=>setSearch(e.target.value)} type="search" placeholder='Search' className='max-w-[150px] border-gray-600 border-1 rounded-md px-1 py-2' />
        </form>

        <div title={user?.userName} className='relative cursor-pointer' onClick={()=>setOptions(!showOptions)}>
          <UserImage profileImage={user?.profileImage} gender={user?.gender} />
          <span className={`${showOptions?'':'hidden'} absolute right-[10px]  p-3 bg-white shadow-xl rounded-md flex flex-col items-start gap-2 text-gray-500 font-semibold text-sm `}>
            <button className=' flex items-center gap-1 hover:text-blue-800 cursor-pointer'><CiHome /> Home</button>
            <button onClick={handleLogout} className=' flex items-center gap-1 hover:text-red-800 cursor-pointer'><CiLogout /> Logout</button>
          </span>
        </div>
      </header>
    
      <div className="spacer h-[60px] w-full" />

      <h3 className='text-xl text-gray-700 font-semibold mb-6'>Users</h3>

      <ul className='flex gap-5 flex-col '>
       {loading ? (
            <SkeletonUser />
          ) : (
            usersFilter && usersFilter.map((user, index) => (
              <UserItem 
              key={index} 
              user={user} 
              handleUserSelect={handleUserSelect} 
              selected={user?._id == slectedUser?._id ? true:false}
              />
             
            ))
          )}


      </ul>
    </section>
  );
};

export default Sidebar;

