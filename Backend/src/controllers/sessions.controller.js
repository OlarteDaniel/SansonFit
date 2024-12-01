import jwt from 'jsonwebtoken';

import config from '../config/config.js';
import UserDTOSession from '../dto/user/UserDTOSession.js';

const register = (req,res) =>{
    res.sendSuccess('Registered');  
}

const login = (req,res)=>{
    const sessionUserObject = new UserDTOSession(req.user);
    const sessionUser = {...sessionUserObject};

    const token = jwt.sign(sessionUser,config.auth.jwt.SECRET,{expiresIn:'1d'});

    return res.cookie('sid',token).sendSuccess('loggend in');
}

const logout = (req,res)=>{
    if(!req.cookies['sid']){
        return res.sendBadRequest('No active session found. Please log in first.')
    }

    res.clearCookie('sid').sendSuccess('logged out');
}

export default{
    login,
    logout,
    register
}
