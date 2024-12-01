import BaseRouter from './BaseRouter.js';

import { passportCall } from '../middlewares/passportCall.js';
import sessionsController from '../controllers/sessions.controller.js';

class SessionsRouter extends BaseRouter{
    init(){

        this.post('/register',passportCall('register'),sessionsController.register)

        this.post('/login',passportCall('login'),sessionsController.login);

        this.get('/logout',sessionsController.logout);
    }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();