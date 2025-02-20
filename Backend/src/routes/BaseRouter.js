import {Router} from 'express';

import {passportCall} from '../middlewares/passportCall.js';
import { executePolicies } from '../middlewares/policies.js';
import {addLogger} from '../middlewares/loggerCall.js';

export default class BaseRouter{

    constructor(){
        this.router = Router();
        this.init();
    }

    init(){}

    getRouter(){
        return this.router;
    }

    get(path,policies,...callbacks){
        if(!policies || !Array.isArray(policies))throw new Error('Policies required for endpoint' + path);
        this.router.get(path,addLogger,this.generateCustomResponses,passportCall('current'),executePolicies(policies),this.applyCallbacks(callbacks));
    }

    post(path,policies,...callbacks){
        if(!policies || !Array.isArray(policies))throw new Error('Policies required for endpoint' + path);
        this.router.post(path,addLogger,this.generateCustomResponses,passportCall('current'),executePolicies(policies),this.applyCallbacks(callbacks));
    }

    put(path,policies,...callbacks){
        if(!policies || !Array.isArray(policies))throw new Error('Policies required for endpoint' + path);
        this.router.put(path,addLogger,this.generateCustomResponses,passportCall('current'),executePolicies(policies),this.applyCallbacks(callbacks));
    }

    delete(path,policies,...callbacks){
        if(!policies || !Array.isArray(policies))throw new Error('Policies required for endpoint' + path);
        this.router.delete(path,addLogger,this.generateCustomResponses,passportCall('current'),executePolicies(policies),this.applyCallbacks(callbacks));
    }

    generateCustomResponses(req,res,next){

        res.sendSuccess = (message) => {
            
            req.logger.info(`[${req.method}] ${req.originalUrl} - Response: 200 - ${message}`);
            res.status(200).send({status:'success',message:message})
        }

        res.sendSuccessWithPayload = (payload) => {

            req.logger.info(`[${req.method}] ${req.originalUrl} - Response: 200 - Payload size: ${JSON.stringify(payload).length} bytes`);
            res.status(200).send({status:'success',payload:payload})
        }

        res.sendCreated = (message,payload) => {

            req.logger.info(`[${req.method}] ${req.originalUrl} - Response: 201 - Created resource with message: ${message}`);
            res.status(201).send({status:'success',message:message,payload:payload})
        }

        res.sendBadRequest = (reason) => {

            req.logger.warning(`[${req.method}] ${req.originalUrl} - Response: 400 - ${String(reason)}`);
            res.status(400).send({status:'error', error:reason})
        }

        res.sendUnauthorized = (reason) => {
            
            req.logger.warning(`[${req.method}] ${req.originalUrl} - Response: 401 - ${String(reason)}`);
            res.status(401).send({ status: 'error', error: reason });
        }

        res.sendForbidden = (reason) => {

            req.logger.warning(`[${req.method}] ${req.originalUrl} - Response: 403 - ${String(reason)}`);
            res.status(403).send({ status: 'error', error: reason });
        }

        res.sendNotFound = (reason) => {
            
            req.logger.warning(`[${req.method}] ${req.originalUrl} - Response: 404 - ${String(reason)}`);
            res.status(404).send({ status: 'error', error: reason });
        }

        res.sendServerError = (reason) => {
            
            req.logger.error(`[${req.method}] ${req.originalUrl} - Response: 500 - ${String(reason)}`);
            res.status(500).send({ status: 'error', error: reason });
        }

        next();
    }

    applyCallbacks(callbacks){
        return callbacks.map((callback) => async(...params) =>{
            try {
                await callback.apply(this,params);
            } catch (error) {
                params[0].logger.error(`Error in route ${params[0].method} ${params[0].originalUrl}: ${error.name} ${error.message}`);
                params[1].status(500).send({status:"errors",error:`${error.name} ${error.message}`});
            }
        })
    }
}