import fs from 'fs';
import path from 'path';
import __dirname from './utils.js';
import serve from './app.js';
import { connect } from '@ngrok/ngrok';
import logger from './utils/loggers.js';
import config from './config/config.js';


const startNgrok = async () => {
    try {
        const PORT = config.app.PORT || 8080;

        // Esperamos a que el servidor esté listo
        await new Promise((resolve) => {
            serve.on('listening', () => {
                logger.info(`Servidor backend escuchando en puerto ${PORT}`);
                resolve();
            });
        });

        const listener = await connect({
            addr: PORT,
            authtoken: config.ngrok.AUTHTOKEN
        });

        const ngrokUrl = listener.url();
        logger.info(`Ngrok URL: ${ngrokUrl}`);

        process.env.PUBLIC_URL = ngrokUrl;

        // Actualiza la variable PUBLIC_URL en .env.dev
        const envPath = path.join(__dirname,'../.env.dev');
        let envContent = fs.readFileSync(envPath, 'utf-8');
        envContent = envContent.replace(/PUBLIC_URL=.*/g, `PUBLIC_URL=${ngrokUrl}`);
        fs.writeFileSync(envPath, envContent);

    } catch (error) {
        logger.error('Error al iniciar ngrok:', error);
    }
};

startNgrok();
