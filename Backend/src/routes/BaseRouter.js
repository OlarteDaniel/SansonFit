import {Router} from 'express';

import {passportCall} from '../middlewares/passportCall.js';

export default class BaseRouter{

    constructor(){
        this.router = Router();
        this.init();
    }

    init(){}

    getRouter(){
        return this.router;
    }

    get(path,...callbacks){
        this.router.get(path,this.generateCustomResponses,passportCall('current'),this.applyCallbacks(callbacks));
    }

    post(path,...callbacks){
        this.router.post(path,this.generateCustomResponses,passportCall('current'),this.applyCallbacks(callbacks));
    }

    put(path,...callbacks){
        this.router.put(path,this.generateCustomResponses,passportCall('current'),this.applyCallbacks(callbacks));
    }

    delete(path,...callbacks){
        this.router.delete(path,this.generateCustomResponses,passportCall('current'),this.applyCallbacks(callbacks));
    }

    generateCustomResponses(req,res,next){

        res.sendSuccess = (message) => res.status(200).send({status:'success',message:message})
        res.sendSuccessWithPayload = (payload) => res.status(200).send({status:'success',payload:payload})

        res.sendCreated = (payload,message) => res.status(201).send({status:'success',message:message,payload:payload})

        res.sendBadRequest = (reason) => res.status(400).send({status:'error', error:reason})
        res.sendUnauthorized = (reason) => res.status(401).send({ status: 'error', error: reason });
        res.sendForbidden = (reason) => res.status(403).send({ status: 'error', error: reason });
        res.sendNotFound = (reason) => res.status(404).send({ status: 'error', error: reason });

        res.sendServerError = (reason) => res.status(500).send({ status: 'error', error: reason });

        next();
    }

    applyCallbacks(callbacks){
        return callbacks.map((callback) => async(...params) =>{
            try {
                await callback.apply(this,params);
            } catch (error) {
                console.log(error);
                params[1].status(500).send({status:"error",error:`${error.name} ${error.message}`});
            }
        })
    }

}