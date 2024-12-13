import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import __dirname from './utils.js';
import logger from './utils/loggers.js';
import initializePassportConfig from './config/passport.config.js';
import config from './config/config.js';

import CategoriesRouter from './routes/CategoriesRouter.js';
import ProductsRouter from './routes/ProductsRouter.js';
import SessionsRouter from './routes/SessionsRouter.js';
import SupplementsVariantsRouter from './routes/SupplementsVariantsRouter.js';


const app = express()
const PORT = config.app.PORT;

const connection = mongoose.connect(config.mongo.URL);

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

initializePassportConfig();
app.use(passport.initialize());

app.use('/api/sessions',SessionsRouter);
app.use('/api/categories',CategoriesRouter);
app.use('/api/products',ProductsRouter);
app.use('/api/supplements',SupplementsVariantsRouter)

const serve = app.listen(PORT,()=> {
    logger.info(`Server is listening on PORT: ${PORT}`);
})