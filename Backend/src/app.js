import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import __dirname from './utils.js';
import logger from './utils/loggers.js';
import initializePassportConfig from './config/passport.config.js';
import config from './config/config.js';

import CategoriesRouter from './routes/CategoriesRouter.js';
import ProductsRouter from './routes/ProductsRouter.js';
import SessionsRouter from './routes/SessionsRouter.js';
import ImagesRouter from './routes/ImagesRouter.js'
import SupplementsVariantsRouter from './routes/SupplementsVariantsRouter.js';
import PaymentsRouter from './routes/PaymentsRouter.js';


const app = express()
const PORT = config.app.PORT;

const connection = mongoose.connect(config.mongo.URL);

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin:['http://localhost:5173']
}))

initializePassportConfig();
app.use(passport.initialize());

app.use('/api/sessions',SessionsRouter);
app.use('/api/categories',CategoriesRouter);
app.use('/api/products',ProductsRouter);
app.use('/api/images',ImagesRouter)
app.use('/api/supplements',SupplementsVariantsRouter)
app.use('/api/payments',PaymentsRouter);

const serve = app.listen(PORT,()=> {
    logger.info(`Server is listening on PORT: ${PORT}`);
})

export default serve;