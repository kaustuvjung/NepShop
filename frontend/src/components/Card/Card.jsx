import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="border border-gray-300 rounded-md shadow-lg p-6">
      {children}
    </div>
  );
};

export default Card;