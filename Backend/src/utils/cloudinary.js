import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config.js';

cloudinary.config({ 
    cloud_name: config.cloudinary.NAME, 
    api_key: config.cloudinary.KEY, 
    api_secret: config.cloudinary.SECRET 
});

export default cloudinary;