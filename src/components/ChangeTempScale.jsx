import React, { useState, useEffect } from 'react';
import useWeather from '../hooks/useWeather';
import { RiFahrenheitLine, RiCelsiusLine } from "react-icons/ri";
import { RxDividerVertical } from "react-icons/rx";

const ChangeTempScale = ({ onScaleChange }) => {
    const [scaleChange, setScaleChange] = useState("temp_f");

    const handleScaleChange = (scale) => {
        setScaleChange(scale);
        onScaleChange(scale);
    }

    return (
        <div className='flex justify-center space-x-2'>
            <RiCelsiusLine className='w-7 h-7 cursor-pointer hover:text-blue-600' onClick={() => handleScaleChange("temp_c")} />
            <RxDividerVertical className='w-9 h-9' />
            <RiFahrenheitLine className='w-7 h-7 cursor-pointer hover:text-red-600' onClick={() => handleScaleChange("temp_f")} />
        </div>
    );
}

export default ChangeTempScale;