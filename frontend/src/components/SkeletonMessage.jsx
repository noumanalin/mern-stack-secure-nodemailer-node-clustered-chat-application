import React from 'react'

const SkeletonMessage = () => {
  return (
    <ul className="p-2">
      {[...Array(15)].map((_, i) => {
        const isSender = i % 2 === 0; // alternate sender/receiver
        const bubbleWidth = `${Math.floor(Math.random() * 100) + 100}px`; // random width

        return (
          <li key={i} className="my-2">
            <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`h-6 bg-gray-300 rounded-lg animate-pulse`}
                style={{
                  width: bubbleWidth,
                }}
              ></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SkeletonMessage;
