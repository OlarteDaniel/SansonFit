import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FaUser } from "react-icons/fa6";

import useScroll from '../../hooks/useScroll';

import '../../styles/components/widgets/User.css'

const User = ({ButtonClass,handleState}) => {

    const isScrolled = useScroll();


    return (
        <button className={ButtonClass} onClick={handleState}>
            <Link className='link-user' to='/login'>
                <FaUser className={`user-icon ${isScrolled ? 'light' : ''}`} />
            </Link>
        </button>
    )
}

export default User