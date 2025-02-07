import BaseRouter from './BaseRouter.js';

import { passportCall } from '../middlewares/passportCall.js';
import sessionsController from '../controllers/sessions.controller.js';

class SessionsRouter extends BaseRouter{
    init(){

        this.post('/register',['PUBLIC'],passportCall('register'),sessionsController.register)

        this.post('/login',['PUBLIC'],passportCall('login'),sessionsController.login);

        this.get('/logout',['USER','ADMIN'],sessionsController.logout);

        this.get('/auth/google',['PUBLIC'],passportCall('google'),(req,res) => {});

        this.get('/auth/google/callback',['PUBLIC'],passportCall('google'),sessionsController.login);

        this.get('/current',['USER', 'ADMIN'],sessionsController.curren);
    }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();