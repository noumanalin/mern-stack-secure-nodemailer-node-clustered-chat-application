import { IoIosSend } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosVideocam } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react'; 
import TiptapEditor from '../helpers/TiptapEditor';

const Chat = () => {
    const [message, setMessage] = useState('')

    const messagesEndRef = useRef(null)

  // Scroll to bottom on render/update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section className='bg-gray-100 flex flex-col justify-between h-screen'>

        {/* Chat head */}
          <article className=' p-2 flex items-center justify-between '>
            <div  className='flex items-center gap-1  text-black hover:text-blue-500 cursor-pointer' >
            <div className='relative'>
              <img className='w-[50px] h-[50px] rounded-full' src="/download.jpg" alt="user" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-600 block absolute bottom-1 right-0"></span>
            </div>
            <p className='font-semibold text-sm'>Muhammad Ali</p>
          </div>

            <div className="flex gap-3 text-xl">
                <IoIosVideocam/> 
                <CiSearch/>                 
                <BsThreeDotsVertical/> 
            </div>
        </article>
        
        {/* Messages */}
        <div className="p-3 overflow-y-auto h-[calc(100vh-130px)] bg-[url('/home-bg.jpg')]">
          {/* Received message */}
          <div className="max-w-xs md:max-w-md bg-white text-black p-3 rounded-lg shadow-md w-fit my-2">
            this is message I received from another userthis is message I received from another user
          </div>

          {/* Sent message */}
          <div className="flex justify-end">
            <div className="max-w-xs md:max-w-md bg-green-400 text-white p-3 rounded-lg shadow-md w-fit text-right">
              this is message I sent to another user
            </div>
          </div>

            <div ref={messagesEndRef} />
        </div>

        {/* Send Message From */}
        <form action="" className='flex items-center gap-4 p-2'>
          <TiptapEditor message={message} setMessage={setMessage} />
          <button type='submit' className={` cursor-pointer max-h-[35px] bg-green-600 px-2 py-1 rounded-md text-white text-2xl`}><IoIosSend/></button>
        </form>

    </section>
  )
}

export default Chat