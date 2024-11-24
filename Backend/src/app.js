import express from 'express';

import config from './config/config.js';

const app = express()

const PORT = config.app.PORT;

const serve = app.listen(PORT,()=> console.log(`Listening on PORT: ${PORT}`));