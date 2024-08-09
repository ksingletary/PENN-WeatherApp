import { IoReturnDownBackOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const ErrorMessage = ({ message }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <img src="/sadRain.png" alt="sad rain icon" className="w-64 h-64" />
        {message ? (
          <p className="text-red-500">{message}</p>
        ) : (
          <>
            <p className="text-red-500">Oops, something went wrong!</p>
            <Link to="/home" className='flex space-x-4 p-4 hover:text-blue-400'>
              <IoReturnDownBackOutline className='w-8 h-8'/>
              <p className='mt-1'>Back</p>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default ErrorMessage;