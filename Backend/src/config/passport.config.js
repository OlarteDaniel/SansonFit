import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {ExtractJwt,Strategy as JWTStrategy} from 'passport-jwt';

import {userService} from '../service/service.js';

import AuthService from '../service/AuthService.js';
import config from './config.js';

const initializePassportConfig = () =>{
    passport.use('register', new LocalStrategy({usernameField: 'email', passReqToCallback:true}, async(req,email,password,done) =>{

        const {first_name,last_name,birthdate,roles} = req.body;

        if(!first_name || !last_name || !birthdate){
            return done(null,false,{message:'Incomplete values'});
        }

        const user = await userService.getUserByEmail(email);

        if(user){
            return done(null,false,{message:"User already exists"});
        }

        const authService = new AuthService();
        const hashedPassword = await authService.hashPassword(password);

        const newUser = {
            first_name,
            last_name,
            email,
            birthdate,
            password: hashedPassword,
            roles: roles || 'user'
        }

        const result = await userService.createUser(newUser);
        return done(null,result);

    }));

    passport.use('login', new LocalStrategy({usernameField:'email'}, async (email,password,done)=>{

        const user = await userService.getUserByEmail(email);
        if(!user){
            return done(null,false,{message:"Incorrect credentials"});
        }

        const authService = new AuthService();
        const isValidPassword = await authService.validatePassword(password,user.password);

        if(!isValidPassword){
            return done(null,false,{message:"Incorrect credentials"});
        }

        return done(null,user)
    }));

    passport.use('current', new JWTStrategy({
        secretOrKey:config.auth.jwt.SECRET,
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor])
    }, async(payload,done)=>{
        return done(null,payload);
    }))

}

function cookieExtractor(req){
    return req?.cookies?.['sid'];
}

export default initializePassportConfig;