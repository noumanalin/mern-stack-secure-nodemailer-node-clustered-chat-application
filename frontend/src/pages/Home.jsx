import React, { useState } from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'

const Home = () => {
  const [showSidebar, SetShowSideBar] = useState(false)
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