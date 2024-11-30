import multer from 'multer';
import path from 'path';
import __dirname from '../utils.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        //El metodo path.join toma múltiples fragmentos de una 
        //ruta y los une en una sola ruta completa. Su magia  
        //radica en que lo hace de manera compatible con el sistema operativo,
        //ajustando los separadores (/ o \) según corresponda.
        cb(null, path.join(__dirname,'upload')); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {

        //Corroboramos que el archivo no sea un tipo de imagen jpeg, png, gif
        if (!file.mimetype.startsWith('image/')) {
            
            //En caso de que la condicion sea verdadera mandamos un error
            return cb(new Error('Solo se permiten imágenes'), false);
        }
        cb(null, true);
    }
});

export default upload;