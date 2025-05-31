import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import UserDTOSession from '../dto/user/UserDTOSession.js';
import UserDTOCurrent from '../dto/user/UserDTOCurrent.js';

const register = (req,res) =>{
    res.sendSuccess('Registered');  
}

const login = (req,res)=>{
    try {
        const sessionUserObject = new UserDTOSession(req.user);
        const sessionUser = {...sessionUserObject};

        const token = jwt.sign(sessionUser,config.auth.jwt.SECRET,{expiresIn:'1d'});
        return res.cookie('sid',token,{httpOnly:true}).sendSuccess('loggend in');
    } catch (error) {
        req.logger.error('Error during login:', error);
        return res.sendServerError('An unexpected error occurred during login');
    }
}

const loginGoogleCallback = (req,res) =>{
    try {
        const sessionUserObject = new UserDTOSession(req.user);
        const sessionUser = {...sessionUserObject};

        const token = jwt.sign(sessionUser,config.auth.jwt.SECRET,{expiresIn:'1d'});
        return res.cookie('sid', token, { httpOnly: true }).redirect('http://localhost:5173/');
    } catch (error) {
        req.logger.error('Error during login:', error);
        return res.sendServerError('An unexpected error occurred during login');
    }
}

const logout = (req,res)=>{
    res.clearCookie('sid').sendSuccess('logged out');
}

const current = (req,res)=>{
    try {
        if(!req.user){
            return  res.sendUnauthorized('Not logged in') 
        }
    

        const currentUserObject = new UserDTOCurrent(req.user)
        const currentUser = {...currentUserObject};
    
        res.sendSuccessWithPayload(currentUser);
    } catch (error) {
        req.logger.error('Error fetching current user:', error);
        return res.sendServerError('An unexpected error occurred');
    }
}

export default{
    current,
    login,
    loginGoogleCallback,
    logout,
    register
}
