

const UserImage = ({ profileImage, gender }) => {
  return (
    <>
      {!profileImage ? (
        <div className='w-[50px] h-[50px] rounded-full bg-gray-200 flex items-center justify-center text-xl'>
          {gender === 'male'
            ? '👨'
            : gender === 'female'
            ? '👩'
            : '⚧️'}
        </div>
      ) : (
        <img
          className='w-[50px] h-[50px] rounded-full'
          src={profileImage}
          alt="user"
        />
      )}
    </>
  )
}

export default UserImage
