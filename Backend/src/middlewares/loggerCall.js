import logger from "../utils/loggers.js";

export const addLogger = (req,res,next) =>{
    req.logger = logger;
    next();
}