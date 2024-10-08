import { useState } from 'react';
import { RxDashboard } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";

const DashboardIcon = ({ top = '5px', left = '5px', right, bottom }) => {
    const [open, setOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = () => {
        if (open) {
          setIsAnimating(true);
          setTimeout(() => {
            setOpen(false);
            setIsAnimating(false);
          }, 200);
        } else {
          setOpen(true);
        }
    };

    const handleMouseLeave = (e) => {
        let target = e.relatedTarget;
        if (target && typeof target.closest === "function" && !target.closest(".navbar") && !target.closest(".expanded-navbar")) {
            setIsAnimating(true);
            setTimeout(() => {
                setOpen(false);
                setIsAnimating(false);
            }, 200);
        }
    };

    const buttonStyle = {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
    };

    return (
        <main className='relative'>
            <div className='absolute z-30' style={buttonStyle}>
                <button onClick={handleToggle} className='bg-blackDark rounded-full flex items-center w-14 h-14 z-40'>
                    <RxDashboard className="text-customWhite2 text-xl w-6 h-6 ml-4" />
                </button>
            </div>
            {(open || isAnimating) && (
                <div
                    onMouseLeave={handleMouseLeave}
                    className={`expanded-navbar fixed z-20 outline outline-black top-0 h-full w-full p-0 bg-blackDark font-CaeciliaSemi text-white bg-opacity-75 backdrop-blur-md ${
                        open && !isAnimating ? "navbar-open" : "navbar-close"
                    }`}
                >
                    <div className='flex justify-center items-center mt-48 gap-52'>
                        <div className='flex flex-col'>
                            <Link to='/'>
                                <IoHomeSharp className='w-52 h-52' />
                                <h1 className='text-4xl mt-6 hover:text-blue-300 text-center'>Home</h1>
                            </Link>
                        </div>
                        <div className='flex flex-col mt-4'>
                            <Link to='/weatherview1'>
                                <img src="/changeview.png" alt="view change" className='text-white'/>
                                <h1 className='text-4xl hover:text-blue-400 text-center mt-6'>View 1</h1>
                            </Link>
                        </div>
                        <div className='flex flex-col mt-4'>
                            <Link to='/weatherview2'>
                                <img src="/changeview.png" alt="view change" className="w-52 h-52 scale-x-[-1]" width="300"/>
                                <h1 className='text-4xl hover:text-blue-600 text-center mt-6'>View 2</h1>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default DashboardIcon;