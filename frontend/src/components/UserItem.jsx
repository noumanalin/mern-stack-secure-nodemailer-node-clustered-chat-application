import React from 'react'
import UserImage from './UserImage'

const UserItem = ({user, handleUserSelect, selected}) => {
  return (
     <li
        title={`Status: online, gender: ${user?.gender}`}
        onClick={() => handleUserSelect(user)}
        className={`flex items-center gap-1 text-sm text-black hover:text-blue-500 ${selected?'text-blue-800 text-2xl':''} cursor-pointer`}
        >
        <div className='relative'>
            <UserImage profileImage={user.profileImage} gender={user.gender} />
            <span className="h-2.5 w-2.5 rounded-full bg-green-600 block absolute bottom-1 right-0"></span>
        </div>
        <p className='font-semibold'>{user.userName}</p>
    </li>
  )
}

export default UserItem