import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FaUser } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";

import UserContext from '../../context/UserContext'

import useScroll from '../../hooks/useScroll';

import { sessionsService } from '../../services/services.js';

import '../../styles/components/widgets/User.css'

const User = ({ButtonClass,handleState}) => {

    const {session,updateSession} = useContext(UserContext)

    const isScrolled = useScroll();

    const onSubmit = async () =>{

        const result = await sessionsService.logoutSession();
        updateSession();
    }

    return (
        <button className={ButtonClass} onClick={handleState}>
            {session?
                <Link onClick={onSubmit} className='link-user' to='/'>
                    <RxExit className={`user-icon ${isScrolled ? 'light' : ''}`} />
                </Link>
            :
                <Link className='link-user' to='/login'>
                    <FaUser className={`user-icon ${isScrolled ? 'light' : ''}`} />
                </Link>
            }
        </button>
    )
}

export default User