import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <img src="/sadRain.png" alt="sad rain icon" className="w-64 h-64" />
        <p className="text-red-500">{message}</p>
      </div>
    </>
  );
};

export default ErrorMessage;