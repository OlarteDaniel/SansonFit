import BaseRouter from "./BaseRouter.js";
import paymentsController from '../controllers/payment.controller.js';

class PaymentsRouter extends BaseRouter{

    init(){
        this.post('/create-preference',['PUBLIC'],paymentsController.createPayment);

        this.get('/success',['PUBLIC'],paymentsController.success)

        this.get('/failure',['PUBLIC'],paymentsController.failure)

        this.get('/pending',['PUBLIC'],paymentsController.pending)

        this.post('/webhook',['PUBLIC'],paymentsController.receiveWebhook)

    }

}

const paymentsRouter = new PaymentsRouter();

export default paymentsRouter.getRouter();