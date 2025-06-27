import React, { useState } from 'react';
import { CiLogout, CiHome } from "react-icons/ci";

const Sidebar = () => {
  const [showOptions, setOptions] = useState(false)
  return (
    <section className="px-2 md:h-screen w-[250px] overflow-y-auto">

      <header className='fixed py-2 z-50 bg-white flex items-center justify-center gap-5'>
        {/* Search Form */}
        <form action="">
          <input type="search" placeholder='Search' className='max-w-[150px] border-gray-600 border-1 rounded-md px-1 py-2' />
        </form>

        <div className='relative' onClick={()=>setOptions(!showOptions)}>
          <img  src="/download.jpg" alt="" className='w-[50px] h-[50px] rounded-full' />
          <span className={`${showOptions?'':'hidden'} absolute right-[10px]  p-3 bg-white shadow-xl rounded-md flex flex-col items-start gap-2 text-gray-500 font-semibold text-sm `}>
            <button className=' flex items-center gap-1 hover:text-blue-800 cursor-pointer'><CiHome /> Home</button>
            <button className=' flex items-center gap-1 hover:text-red-800 cursor-pointer'><CiLogout /> Logout</button>
          </span>
        </div>
      </header>
    
      <div className="spacer h-[60px] w-full" />

      <h3 className='text-xl text-gray-700 font-semibold mb-6'>Users</h3>

      <ul className='flex gap-5 flex-col '>
        {[...Array(6)].map((_, index) => (
          <li
            key={index}
            className='flex items-center gap-1 text-sm text-black hover:text-blue-500 cursor-pointer'
          >
            <div className='relative'>
              <img
                className='w-[50px] h-[50px] rounded-full'
                src="/download.jpg"
                alt="user"
              />
              <span className="h-2.5 w-2.5 rounded-full bg-green-600 block absolute bottom-1 right-0"></span>
            </div>
            <p className='font-semibold'>Muhammad Ali</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
