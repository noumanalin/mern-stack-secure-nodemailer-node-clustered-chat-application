import { IoIosSend } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosVideocam } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import TiptapEditor from '../helpers/TiptapEditor';
import { useSelector } from 'react-redux';
import UserImage from './UserImage';
import { toast } from 'react-toastify';
import axios from 'axios';
import SkeletonMessage from './SkeletonMessage';
import TimeAgo from 'react-timeago';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gmLoading, setGMLoading] = useState(true);
  const [resetEditor, setResetEditor] = useState(false);

  const { user, token } = useSelector(state => state.auth);
  const { slectedUser } = useSelector(state => state.user);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getMessages = async () => {
    if (!slectedUser?._id) return;

    setGMLoading(true);
    try {
      const payload = {
        senderId: user?._id,
        receiverId: slectedUser?._id,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/message/get_messages`,
        payload,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200 || res?.data?.success) {
        setMessages(res?.data?.messages);
      }
    } catch (error) {
      toast.warn(
        error?.response?.data?.message ||
          error.message ||
          'Get message error. Please try again.'
      );
    } finally {
      setGMLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, [slectedUser]);

  const sendMessage = async e => {
    e.preventDefault();

    if (!slectedUser?._id) {
      toast.warn('Please select a user to send a message.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        senderId: user?._id,
        receiverId: slectedUser?._id,
        message,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/message/send_message`,
        payload,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200 || res?.data?.success) {
        setMessage('');
        setResetEditor(prev => !prev);
        getMessages(); // refresh messages after sending
      }
    } catch (error) {
      toast.warn(
        error?.response?.data?.message ||
          error.message ||
          'Send message error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const decodeHtml = html => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  if (!slectedUser?._id) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <h1 className="text-lg font-medium">Please select a user to start chatting 💬</h1>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 flex flex-col justify-between h-screen">
      {/* Chat head */}
      <article className="p-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-black hover:text-blue-500 cursor-pointer">
          <div className="relative">
            <UserImage profileImage={slectedUser?.profileImage} gender={slectedUser?.gender} />
            <span className="h-2.5 w-2.5 rounded-full bg-green-600 block absolute bottom-1 right-0"></span>
          </div>
          <p className="font-semibold text-sm">{slectedUser?.userName}</p>
        </div>

        <div className="flex gap-3 text-xl">
          <IoIosVideocam />
          <CiSearch />
          <BsThreeDotsVertical />
        </div>
      </article>

      {/* Messages */}
      <div className="p-3 overflow-y-auto h-[calc(100vh-130px)] bg-[url('/home-bg.jpg')]">
        {gmLoading ? (
          <SkeletonMessage />
        ) : (
          <>
            {messages.length < 1 && (
              <p className="text-center text-gray-600 italic py-4">
                There are no messages between you and{' '}
                <span className="font-semibold">{slectedUser.userName}</span>.
              </p>
            )}
            {messages.map((m, index) => (
              <div key={index}>
                {m.receiverId === user._id && (
                  <div className="max-w-xs md:max-w-md bg-white text-black p-3 rounded-lg shadow-md w-fit my-2">
                    <div dangerouslySetInnerHTML={{ __html: decodeHtml(m.message) }} />
                    <div className="text-xs text-gray-500 mt-1">
                      <TimeAgo date={m.createdAt} />
                    </div>
                  </div>
                )}

                {m.senderId === user._id && (
                  <div className="flex justify-end">
                    <div className="max-w-xs md:max-w-md bg-green-500 text-white p-3 rounded-lg shadow-md w-fit text-right my-2">
                      <div dangerouslySetInnerHTML={{ __html: decodeHtml(m.message) }} />
                      <div className="text-xs text-white mt-1">
                        <TimeAgo date={m.createdAt} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Send Message Form */}
      <form onSubmit={sendMessage} className="flex items-center gap-4 p-2">
        <TiptapEditor message={message} setMessage={setMessage} reset={resetEditor} />
        <button
          disabled={loading || !message.trim()}
          type="submit"
          className={`${
            loading ? 'cursor-not-allowed' : 'cursor-pointer'
          } max-h-[35px] bg-green-600 px-2 py-1 rounded-md text-white text-2xl`}
        >
          {loading ? (
            <p className="animate-spin cursor-not-allowed w-5 h-5 border-t-transparent border-2 rounded-full  border-white" />
          ) : (
            <IoIosSend />
          )}
        </button>
      </form>
    </section>
  );
};

export default Chat;
