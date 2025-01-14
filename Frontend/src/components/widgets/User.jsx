import React, { useState,useEffect } from 'react';
import { FaUser } from "react-icons/fa6";

import useScroll from '../../hooks/useScroll';

const User = ({ButtonClass}) => {

    const isScrolled = useScroll();

    return (
        <button className={ButtonClass}>
            <FaUser className={`user-icon ${isScrolled ? 'light' : ''}`} />
        </button>
    )
}

export default User