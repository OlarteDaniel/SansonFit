import express from 'express';
import mongoose from 'mongoose';

import config from './config/config.js';

import CategoriesRouter from './routes/CategoriesRouter.js';
import ProductsRouter from './routes/ProductsRouter.js';


const app = express()
const PORT = config.app.PORT;

const connection = mongoose.connect(config.mongo.URL);

app.use('/api/categories',CategoriesRouter);
app.use('/api/products',ProductsRouter);

const serve = app.listen(PORT,()=> console.log(`Listening on PORT: ${PORT}`));