import {config} from 'dotenv';
import options from './commander.config.js';


config({
    // Implementamos commander para que las variables de entorno
    // Se obtengan depediendo del modo en que ejecutemos la aplicacion
    path:options.mode==='dev'?'./.env.dev':'./.env.prod'
});

export default{
    app:{
        PORT: process.env.PORT || 8080
    },
    auth:{
        jwt:{
            SECRET: process.env.JWT_SECRET
        }
    },
    mongo:{
        URL: process.env.MONGO_URL
    },
    cloudinary:{
        NAME:process.env.CLOUDINARY_NAME,
        KEY: process.env.CLOUDINARY_KEY,
        SECRET: process.env.CLOUDINARY_SECRET
    },
    google:{
        ID:process.env.CLIENT_ID,
        SECRET:process.env.CLIENT_SECRET
    }
};