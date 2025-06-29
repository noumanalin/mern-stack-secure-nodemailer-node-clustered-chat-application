import React from 'react'

const SkeletonUser = () => {
  return (
    <ul>
    {[...Array(5)].map((_, i) => (
      <li key={i} className="flex items-center gap-2 py-2 animate-pulse">
        <div className="w-[50px] h-[50px] rounded-full bg-gray-300" />
        <div className="w-1/2 h-4 bg-gray-300 rounded" />
      </li>
    ))}
  </ul>
  )
}

export default SkeletonUser